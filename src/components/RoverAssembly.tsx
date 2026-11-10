import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StlViewer } from "@/components/StlViewer";
import assembled from "@/assets/rover-views/Rover_Assembled_Forearm.stl.asset.json";
import exploded from "@/assets/rover-views/Rover_Exploded_Forearm.stl.asset.json";
import { formatSize } from "@/lib/rover-parts";
const views = {
  assembled: { label: "Fully assembled", file: "Rover_Assembled_Forearm.stl", ...assembled },
  exploded: { label: "Exploded view", file: "Rover_Exploded_Forearm.stl", ...exploded },
};
export function RoverAssembly() {
  const [view, setView] = useState<keyof typeof views>("assembled");
  const v = views[view];
  return <section id="assembly" className="detail-section">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="font-display text-2xl font-bold">The finished rover in 3D</h2><p className="mt-2 text-sm text-muted-foreground">Original OpenSCAD assembly · bed, wheels, enclosure and six-axis arm.</p></div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Assembly view">{(Object.keys(views) as (keyof typeof views)[]).map(k => <Button key={k} onClick={() => setView(k)} aria-pressed={view === k} variant={view === k ? "secondary" : "outline"}>{views[k].label}</Button>)}</div>
    </div>
    <div className="mt-6 h-[350px] sm:h-[480px]"><StlViewer url={v.url} name={v.label} /></div>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="max-w-xl text-xs text-muted-foreground">Forearm restored from the supplied CAD mesh in both views. Hardware geometry follows the source assembly.</p><Button asChild size="sm"><a href={v.url} download={v.file}><Download />Download {v.label.toLowerCase()} · {formatSize(v.size)}</a></Button></div>
  </section>;
}
