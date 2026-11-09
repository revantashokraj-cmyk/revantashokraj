import { useState } from "react";
import { StlViewer } from "@/components/StlViewer";
import { combinedPart, formatSize, roverParts, type StlPart } from "@/lib/rover-parts";

export function RoverDownloads() {
  const [active, setActive] = useState<StlPart>(combinedPart);
  const row = (p: StlPart, big = false) => (
    <li
      key={p.file}
      className={`flex items-center justify-between gap-3 rounded-lg border-2 px-3 py-2 ${
        active.file === p.file ? "border-foreground bg-secondary" : "border-transparent hover:bg-muted"
      } ${big ? "bg-primary/10" : ""}`}
    >
      <button onClick={() => setActive(p)} className="flex-1 text-left">
        <span className="font-medium text-foreground">{p.name}</span>
        <span className="ml-2 text-xs text-muted-foreground">{formatSize(p.size)}</span>
      </button>
      <button onClick={() => setActive(p)} className="rounded-full border-2 border-foreground px-3 py-1 text-xs font-semibold">
        3D view
      </button>
      <a href={p.url} download={p.file} className="rounded-full border-2 border-foreground bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
        Download
      </a>
    </li>
  );
  const groups = [...new Set(roverParts.map((p) => p.group))];

  return (
    <section className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-hard">
      <h2 className="font-display text-2xl font-bold">3D parts (STL)</h2>
      <p className="mt-2 text-muted-foreground">
        Click any part to spin it in 3D, or download it to print. The combined file has every part laid out on one plate.
      </p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="max-h-[560px] space-y-4 overflow-y-auto pr-1">
          <ul>{row(combinedPart, true)}</ul>
          {groups.map((g) => (
            <div key={g}>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{g}</h3>
              <ul className="space-y-1">{roverParts.filter((p) => p.group === g).map((p) => row(p))}</ul>
            </div>
          ))}
        </div>
        <div className="lg:sticky lg:top-6">
          <div className="h-[420px]">
            <StlViewer url={active.url} />
          </div>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {active.name} · drag to rotate, scroll to zoom
          </p>
        </div>
      </div>
    </section>
  );
}
