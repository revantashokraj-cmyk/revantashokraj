import { useState } from "react";
import { Check, Code2, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import code from "@/assets/rover_firmware.ino?raw";
export function RoverFirmware() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const download = () => {
    const url = URL.createObjectURL(new Blob([code], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "rover_firmware.ino";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 30000);
  };
  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setCopyError(false); setTimeout(() => setCopied(false), 2000); } catch { setCopyError(true); } };
  return <section id="code" className="detail-section">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-display text-2xl font-bold">Arduino code</h2><p className="mt-2 text-sm text-muted-foreground">Mecanum drive · six-servo arm · ultrasonic scan · Bluetooth</p></div>
      <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="rover-code"><Code2 />{open ? "Hide code" : "View code"}</Button><Button onClick={download}><Download />Download .ino</Button></div>
    </div>
    {open && <div id="rover-code" className="mt-6 border border-border"><div className="flex items-center justify-between border-b border-border bg-card px-4 py-2"><span className="font-mono text-xs text-muted-foreground">rover_firmware.ino · {code.split('\n').length} lines</span><Button variant="ghost" size="sm" onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy"}</Button></div><pre className="max-h-[520px] overflow-auto bg-background p-4 text-xs leading-relaxed text-foreground"><code>{code}</code></pre></div>}
    {copyError && <p role="status" className="mt-2 text-sm text-muted-foreground">Copy isn’t available; download the code instead.</p>}
  </section>;
}
