import board from "@/assets/spider-control-board.png.asset.json";

export function HeroAnimation() {
  return (
    <figure className="pcb-graphic relative m-0 flex h-full w-full flex-col items-center justify-center">
      <div className="pcb-stage relative flex min-h-0 flex-1 items-center justify-center">
        <a href="https://www.pcbway.com/project/shareproject/Quadruped_Spider_Robot_3D_Printed_Parts_SG90_Servo_Motor_Arduino_Nano_10107fe3.html" target="_blank" rel="noreferrer" aria-label="Open original spider PCB design on PCBWay" className="pcb-source flex h-full w-full items-center justify-center">
        <img
          src={board.url}
          alt="Original PCBWay 2D layout of Mert Kilic’s spider robot control board, with servo headers and Arduino Nano connections"
          className="pcb-art h-full max-h-[420px] w-auto object-contain"
        />
        </a>
        <div className="pcb-scan pointer-events-none absolute inset-x-0 h-px bg-primary" aria-hidden="true" />
      </div>
      <figcaption className="mt-5 w-full border-t border-border pt-3 font-mono text-[10px] uppercase text-muted-foreground">
        <div className="flex justify-between gap-4"><span>01 / Spider control PCB</span><span>12 × SG90</span></div>
        <a className="mt-2 inline-block text-accent underline underline-offset-4" href="https://www.pcbway.com/project/shareproject/Quadruped_Spider_Robot_3D_Printed_Parts_SG90_Servo_Motor_Arduino_Nano_10107fe3.html" target="_blank" rel="noreferrer">Board preview / Mert Kilic · PCBWay ↗</a>
      </figcaption>
    </figure>
  );
}