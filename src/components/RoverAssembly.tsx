import { useState } from "react";
import { StlViewer } from "@/components/StlViewer";
import assembled from "@/assets/rover-views/Rover_Assembled.stl.asset.json";
import exploded from "@/assets/rover-views/Rover_Exploded.stl.asset.json";
import { formatSize } from "@/lib/rover-parts";

const views = {
  assembled: { label: "Fully assembled", file: "Rover_Assembled.stl", ...assembled },
  exploded: { label: "Exploded view", file: "Rover_Exploded.stl", ...exploded },
};

export function RoverAssembly() {
  const [view, setView] = useState<keyof typeof views>("assembled");
  const v = views[view];
  return (
    <section className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-hard">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold">The finished rover in 3D</h2>
          <p className="mt-1 max-w-xl text-muted-foreground">
            Rendered from the full OpenSCAD assembly: bed, servo mounts, wheels, enclosure, lid, electronics and the
            6-DOF arm. Switch to the exploded view to see where each part goes.
          </p>
        </div>
        <div className="flex gap-2">
          {(Object.keys(views) as (keyof typeof views)[]).map((k) => (
            <button
              key={k}
              onClick={() => setView(k)}
              className={`rounded-full border-2 border-foreground px-4 py-1.5 text-sm font-semibold ${
                view === k ? "bg-foreground text-background" : "bg-card hover:bg-secondary"
              }`}
            >
              {views[k].label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 h-[480px]">
        <StlViewer url={v.url} />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>Drag to rotate · scroll to zoom · large file, may take a few seconds</span>
        <a href={v.url} download={v.file} className="rounded-full border-2 border-foreground bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
          Download {v.label.toLowerCase()} ({formatSize(v.size)})
        </a>
      </div>
    </section>
  );
}
