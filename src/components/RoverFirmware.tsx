import { useState } from "react";
import code from "@/assets/rover_firmware.ino?raw";

export function RoverFirmware() {
  const [open, setOpen] = useState(false);
  const download = () => {
    const url = URL.createObjectURL(new Blob([code], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = "rover_firmware.ino";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };
  return (
    <section className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-hard">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Arduino code</h2>
          <p className="mt-1 text-muted-foreground">
            Mecanum drive, 6-servo arm, scanning ultrasonic and Bluetooth commands — {code.split("\n").length} lines.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setOpen(!open)} className="rounded-full border-2 border-foreground px-4 py-2 text-sm font-semibold">
            {open ? "Hide code" : "View code"}
          </button>
          <button onClick={download} className="rounded-full border-2 border-foreground bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
            Download .ino
          </button>
        </div>
      </div>
      {open && (
        <pre className="mt-5 max-h-[520px] overflow-auto rounded-xl bg-foreground p-4 text-xs leading-relaxed text-background">
          <code>{code}</code>
        </pre>
      )}
    </section>
  );
}
