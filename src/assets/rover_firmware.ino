#include <Servo.h>

// ==================== CONFIG ====================

// Wheel servo pins (continuous rotation, MG995)

const int PIN_WHEEL_FL = A2;

const int PIN_WHEEL_FR = A3;

const int PIN_WHEEL_RL = A4;

const int PIN_WHEEL_RR = A5;

// Arm servo pins, s1-s6 (3x MG995 + 3x SG90)

const int ARM_PINS[6] = {A6, A7, A8, A9, A10, A11};

const int ARM_START_ANGLES[6] = {90, 150, 35, 140, 85, 80}; // safe home pose

// Ultrasonic radar servo (SG90)

const int PIN_RADAR_SERVO = A12;

// HC-SR04 ultrasonic sensor

const int PIN_TRIG = 22;

const int PIN_ECHO = 23;

const int OBSTACLE_LIMIT_CM = 25;

// Continuous rotation wheel speeds (0-180, 90 = stop)

const int STOP_SPEED = 90;

const int FWD_SPEED = 180; // if a wheel spins backward, swap with BWD_SPEED for that wheel only

const int BWD_SPEED = 0;

// Sequence recording (SAVE/RUN/PAUSE/RESET)

const int MAX_STEPS = 50;

const int DEFAULT_SPEED_DELAY = 20;

// Bluetooth (HC-06 on Mega hardware Serial1: pin 18 = TX1, pin 19 = RX1)

const long BT_BAUD = 9600;

// ==================================================

Servo wheelFL, wheelFR, wheelRL, wheelRR;

Servo armServos[6];

Servo radarServo;

int armAngle[6];

int savedSteps[6][MAX_STEPS];

int speedDelay = DEFAULT_SPEED_DELAY;

int stepCount = 0;

String message = "";

// ---------- ULTRASONIC ----------

long getDistanceCM() {

digitalWrite(PIN_TRIG, LOW);

delayMicroseconds(2);

digitalWrite(PIN_TRIG, HIGH);

delayMicroseconds(10);

digitalWrite(PIN_TRIG, LOW);

long duration = pulseIn(PIN_ECHO, HIGH, 30000); // 30ms timeout

if (duration == 0) return 999; // treat "no echo" as clear path

return duration * 0.034 / 2;

}

// ---------- WHEELS ----------

void stopRover() {

wheelFL.write(STOP_SPEED);

wheelFR.write(STOP_SPEED);

wheelRL.write(STOP_SPEED);

wheelRR.write(STOP_SPEED);

}

void moveForward() {

wheelFL.write(FWD_SPEED); wheelFR.write(BWD_SPEED);

wheelRL.write(FWD_SPEED); wheelRR.write(BWD_SPEED);

}

void moveBackward() {

wheelFL.write(BWD_SPEED); wheelFR.write(FWD_SPEED);

wheelRL.write(BWD_SPEED); wheelRR.write(FWD_SPEED);

}

void strafeLeft() {

wheelFL.write(BWD_SPEED); wheelFR.write(BWD_SPEED);

wheelRL.write(FWD_SPEED); wheelRR.write(FWD_SPEED);

}

void strafeRight() {

wheelFL.write(FWD_SPEED); wheelFR.write(FWD_SPEED);

wheelRL.write(BWD_SPEED); wheelRR.write(BWD_SPEED);

}

void rotateLeft() {

wheelFL.write(BWD_SPEED); wheelFR.write(BWD_SPEED);

wheelRL.write(BWD_SPEED); wheelRR.write(BWD_SPEED);

}

void rotateRight() {

wheelFL.write(FWD_SPEED); wheelFR.write(FWD_SPEED);

wheelRL.write(FWD_SPEED); wheelRR.write(FWD_SPEED);

}

// ---------- COLLISION AVOIDANCE ----------

void autoScanAndAvoid() {

stopRover();

delay(200);

radarServo.write(150); // look left

delay(400);

long distLeft = getDistanceCM();

radarServo.write(30); // look right

delay(400);

long distRight = getDistanceCM();

radarServo.write(90); // back to center

delay(200);

if (distLeft > distRight && distLeft > OBSTACLE_LIMIT_CM) {

rotateLeft();

delay(600);

} else if (distRight > OBSTACLE_LIMIT_CM) {

rotateRight();

delay(600);

} else {

moveBackward();

delay(800);

}

stopRover();

}

void safeMoveForward() {

radarServo.write(90);

long frontDist = getDistanceCM();

if (frontDist <= OBSTACLE_LIMIT_CM) {

autoScanAndAvoid();

} else {

moveForward();

}

}

// ---------- ARM ----------

void moveArmSmooth(int armIndex, int targetAngle, int delayMs) {

int start = armAngle[armIndex];

int step = (targetAngle > start) ? 1 : -1;

for (int angle = start; angle != targetAngle + step; angle += step) {

armServos[armIndex].write(angle);

delay(delayMs);

}

armAngle[armIndex] = targetAngle;

}

void runSavedSequence() {

for (int step = 0; step < stepCount - 1; step++) {

if (Serial1.available() > 0) {

String checkMsg = Serial1.readString();

if (checkMsg == "PAUSE" || checkMsg == "RESET") return;

}

for (int i = 0; i < 6; i++) {

moveArmSmooth(i, savedSteps[i][step + 1], speedDelay);

}

}

}

// ---------- MESSAGE PARSER ----------

void handleMessage() {

if (message == "MOVE_FWD") safeMoveForward();

else if (message == "MOVE_BWD") moveBackward();

else if (message == "MOVE_LFT") strafeLeft();

else if (message == "MOVE_RGT") strafeRight();

else if (message == "MOVE_RTL") rotateLeft();

else if (message == "MOVE_RTR") rotateRight();

else if (message == "MOVE_STOP") stopRover();

else {

for (int i = 1; i <= 6; i++) {

String tag = "s" + String(i);

if (message.startsWith(tag)) {

int angle = message.substring(tag.length()).toInt();

moveArmSmooth(i - 1, angle, speedDelay);

return;

}

}

if (message.startsWith("ss")) {

speedDelay = message.substring(2).toInt();

}

else if (message == "SAVE") {

if (stepCount < MAX_STEPS) {

for (int i = 0; i < 6; i++) savedSteps[i][stepCount] = armAngle[i];

stepCount++;

}

}

else if (message == "RUN") {

runSavedSequence();

}

else if (message == "RESET") {

stepCount = 0;

}

}

}

// ---------- SETUP & LOOP ----------

void setup() {

Serial1.begin(BT_BAUD); // HC-06: pin 18 = TX1 (to HC-06 RXD via divider), pin 19 = RX1 (from HC-06 TXD)

Serial.begin(9600); // USB Serial Monitor, for testing without Bluetooth

pinMode(PIN_TRIG, OUTPUT);

pinMode(PIN_ECHO, INPUT);

wheelFL.attach(PIN_WHEEL_FL);

wheelFR.attach(PIN_WHEEL_FR);

wheelRL.attach(PIN_WHEEL_RL);

wheelRR.attach(PIN_WHEEL_RR);

stopRover();

for (int i = 0; i < 6; i++) {

armServos[i].attach(ARM_PINS[i]);

armAngle[i] = ARM_START_ANGLES[i];

armServos[i].write(ARM_START_ANGLES[i]);

}

radarServo.attach(PIN_RADAR_SERVO);

radarServo.write(90);

}

void loop() {

if (Serial1.available() > 0) {

message = Serial1.readString();

message.trim();

handleMessage();

}

if (Serial.available() > 0) {

message = Serial.readString();

message.trim();

Serial.print("Received: [");

Serial.print(message);

Serial.println("]");

handleMessage();

}

}
