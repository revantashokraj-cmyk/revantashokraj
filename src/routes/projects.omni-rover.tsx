import { createFileRoute, Link } from "@tanstack/react-router";
import rover from "@/assets/omni-rover.jpg";
import { RoverDownloads } from "@/components/RoverDownloads";
import { RoverFirmware } from "@/components/RoverFirmware";
import { RoverAssembly } from "@/components/RoverAssembly";
import { BlueprintPreview } from "@/components/BlueprintPreview";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/projects/omni-rover")({
  head: () => ({
    meta: [
      { title: "Omnidirectional Rover + 6-DOF Arm — Revant Ashokraj" },
      {
        name: "description",
        content:
          "Judges' Favorite at SCU Young Scholars: a $20 mecanum-wheel rover with ultrasonic obstacle avoidance and a 3D-printed 6-DOF arm.",
      },
      { property: "og:title", content: "Omnidirectional Rover + 6-DOF Arm" },
      {
        property: "og:description",
        content: "Judges' Favorite Award, SCU YSP ENGR1 & ENGR1-L robot showcase.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Rover,
});

const results = [
  { label: "Mecanum maneuvering", value: 80, color: "bg-primary" },
  { label: "2.5–3 g pick-and-place", value: 70, color: "bg-leaf" },
  { label: "Ultrasonic obstacle detection", value: 65, color: "bg-accent" },
];

const specs = [
  ["Controller", "Arduino Mega 2560"],
  ["Wireless", "HC-06 Bluetooth + MIT App Inventor app"],
  ["Drive", "4 independent mecanum wheels (3-DOF holonomic)"],
  ["Arm", "6-DOF: 3× MG995 + 3× MG90 servos"],
  ["Sensing", "Ultrasonic sensor on a scanning servo"],
  ["Avoidance threshold", "25 cm"],
  ["Chassis", "Laser-cut acrylic + 3D-printed PLA"],
  ["Power", "Single 9 V battery"],
  ["Budget / time", "$20 · about one week, SCU Maker Lab"],
];

const drive = [
  ["Forward", "Fwd", "Fwd", "Fwd", "Fwd"],
  ["Backward", "Rev", "Rev", "Rev", "Rev"],
  ["Strafe right", "Rev", "Fwd", "Fwd", "Rev"],
  ["Strafe left", "Fwd", "Rev", "Rev", "Fwd"],
  ["Rotate", "Rev", "Fwd", "Rev", "Fwd"],
];

const arch = [
  ["Phone app", "MIT App Inventor buttons → text commands"],
  ["HC-06 Bluetooth", "UART link to the Arduino"],
  ["Arduino Mega", "Polling loop → handleMessage()"],
  ["Outputs", "Mecanum drive · arm servos · scanning ultrasonic"],
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="detail-section">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-4 text-muted-foreground">{children}</div>
    </section>
  );
}

function Rover() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main id="main-content" className="detail-page mx-auto max-w-5xl space-y-8 px-6 pb-24 pt-6">
        <Link to="/" hash="projects" className="text-sm text-muted-foreground">← All projects</Link>
        <div className="blueprint py-8">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              <Trophy className="h-3 w-3" />Judges' Favorite Award
            </span>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              SCU YSP ENGR1 &amp; ENGR1-L
            </span>
            <span className="rounded-full bg-leaf px-3 py-1 text-xs font-semibold text-leaf-foreground">
              Research paper pending publication
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
            Omnidirectional Rover<br /><span className="text-accent">+ 6-DOF Arm</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">A collision-avoiding, mecanum-wheel rover with an onboard robotic arm.</p>
          <p className="mt-4 text-muted-foreground">
            Revant Ashokraj, Ethan Li, Cameron VanHaren · Santa Clara University Young Scholars Program
          </p>
        </div>

        <nav aria-label="Rover sections" className="section-navigation flex flex-wrap gap-5 border-y border-border py-4 text-sm"><a href="#research">Research</a><a href="#assembly">Assembly</a><a href="#parts">Parts & downloads</a><a href="#code">Code</a></nav>
        <BlueprintPreview src={rover} title="Omnidirectional Rover + 6-DOF Arm" />
        <p className="text-xs text-muted-foreground">Illustrative drawing · refer to the supplied CAD models for part geometry.</p>

        <div id="research">
        <Card title="Abstract">
          <p>
            A low-cost mobile rover combining four independently driven mecanum wheels for
            omnidirectional movement, an ultrasonic obstacle detection and avoidance system, and a
            6-degree-of-freedom robotic arm for on-board manipulation. Built in about a week on a $20
            budget, it was designed with search-and-rescue style tasks in mind, where a robot has to
            move through tight spaces and handle objects. Tested over 10–20 trials per metric, it
            received the <strong className="text-foreground">Judges' Favorite Award</strong> at the
            program's final showcase.
          </p>
        </Card>
        </div>

        <section>
          <h2 className="font-display text-2xl font-bold">Results</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {results.map((r) => (
              <div key={r.label} className="feedback-item border border-border bg-card p-5">
                <div className="font-display text-4xl font-bold">{r.value}%</div>
                <div className="text-sm text-muted-foreground">{r.label}</div>
                <div className="mt-3 h-2 rounded-full bg-muted">
                  <div className={`h-2 rounded-full ${r.color}`} style={{ width: `${r.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          <Card title="Technical specs">
            <dl className="divide-y divide-border">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2 text-sm">
                  <dt className="font-medium text-foreground">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card title="System architecture">
            <ol className="space-y-3">
              {arch.map(([k, v], i) => (
                <li key={k} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-sm font-bold text-secondary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-medium text-foreground">{k}</div>
                    <div className="text-sm">{v}</div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm">
              Arm commands look like <code className="rounded bg-muted px-1 text-foreground">s3155</code>{" "}
              (servo 3 → 155°).
            </p>
          </Card>
        </div>

        <Card title="Mecanum drive kinematics">
          <p>
            Each wheel's speed comes from the desired motion: ω<sub>FL</sub> = (V<sub>x</sub> − V
            <sub>y</sub> − (L + W)ω) / r. That lets the rover strafe sideways without turning.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-foreground">
                  {["Motion", "FL", "FR", "BL", "BR"].map((h) => (
                    <th key={h} className="border-b-2 border-foreground py-2 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {drive.map((row) => (
                  <tr key={row[0]} className="border-b border-border">
                    {row.map((c, i) => (
                      <td key={i} className={`py-2 pr-4 ${c === "Fwd" ? "text-leaf" : c === "Rev" ? "text-primary" : "text-foreground"}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Obstacle avoidance">
          <p>
            Driving forward, the ultrasonic sensor looks straight ahead. If anything is closer than
            25 cm, the rover stops and scans left and right. It turns toward the clearer side for 600
            ms, or backs up for 800 ms if neither side is open.
          </p>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          <Card title="What I learned">
            <ul className="list-disc space-y-2 pl-5">
              <li>One shared 9 V battery couldn't power drive motors and arm servos at the same time.</li>
              <li>Ultrasonic sensors miss objects at sharp angles.</li>
              <li>3D-printed parts need clearance for shrinkage or they crack.</li>
            </ul>
          </Card>
          <Card title="Next steps">
            <ul className="list-disc space-y-2 pl-5">
              <li>Separate battery packs for motors and electronics (Li-ion)</li>
              <li>Low-cost 2D LiDAR or depth camera for detection</li>
              <li>Gripper camera for better arm control</li>
            </ul>
          </Card>
        </div>

        <RoverAssembly />
        <Card title="Current work · Engineering Design Club rebuild">
          <p>I'm now redesigning and rebuilding this rover with the Engineering Design Club. The original SCU prototype was dismantled because some components belonged to the university. The results and award above document that original build; the club iteration is still in progress.</p>
        </Card>

        <RoverDownloads />

        <RoverFirmware />

        <p className="text-sm text-muted-foreground">
          Thanks to Professor Zand and Mr. Yamao and the SCU Young Scholars Program staff.
          {" "}<Link to="/about" className="text-accent underline underline-offset-4">Meet the team →</Link>
        </p>
        <nav aria-label="More from the portfolio" className="flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-sm">
          <Link to="/" hash="projects" className="text-accent">← All projects</Link>
          <Link to="/projects/spider-robot" className="text-accent">Next project · Spider robot ↗</Link>
        </nav>
      </main>
    </div>
  );
}
