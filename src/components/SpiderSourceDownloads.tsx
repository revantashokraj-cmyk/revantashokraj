import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const project = "Quadruped_Spider_Robot_3D_Printed_Parts_SG90_Servo_Motor_Arduino_Nano_10107fe3";
const sourceFiles = [
  { id: 79838, file: "body_d.stl", name: "Lower body" },
  { id: 79839, file: "body_u.stl", name: "Upper body" },
  { id: 79840, file: "coxa_l.stl", name: "Left hip joint" },
  { id: 79841, file: "coxa_r.stl", name: "Right hip joint" },
  { id: 79842, file: "femur_1.stl", name: "Upper leg" },
  { id: 79843, file: "s_hold.stl", name: "Servo holder" },
  { id: 79844, file: "tibia_l.stl", name: "Left lower leg" },
  { id: 79845, file: "tibia_r.stl", name: "Right lower leg" },
];

export function SpiderSourceDownloads() {
  return <section id="downloads" className="detail-section">
    <h2 className="font-display text-2xl font-bold">Source parts & downloads</h2>
    <p className="mt-3 max-w-2xl text-sm text-muted-foreground">Original files by Mert Kilic, hosted on PCBWay. These links open PCBWay’s download service and require a PCBWay sign-in.</p>
    <ul className="mt-6 divide-y divide-border">
      {sourceFiles.map(p => <li key={p.file} className="part-row flex flex-wrap items-center justify-between gap-3 py-3">
        <div><p className="font-medium">{p.name}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{p.file}</p></div>
        <Button asChild variant="outline" size="sm"><a href={`https://member.pcbway.com/Project/DownGerBerFile?filename=${project}&act=downattachments&attachments=${p.id}`} target="_blank" rel="noreferrer" aria-label={`Get ${p.file} from PCBWay`}>Get STL on PCBWay<ArrowUpRight /></a></Button>
      </li>)}
    </ul>
    <div className="mt-6 border-l-2 border-accent pl-4 text-sm text-muted-foreground"><p className="font-medium text-foreground">3D assembly & combined STL pending source files</p><p className="mt-2">The original part meshes aren’t accessible without PCBWay sign-in. A complete assembled view and local part previews require those files; no substitute robot geometry is shown.</p></div>
  </section>;
}