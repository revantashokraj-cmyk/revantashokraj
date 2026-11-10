import { useState } from "react";
import { Download, Search } from "lucide-react";
import { StlViewer } from "@/components/StlViewer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { combinedPart, formatSize, roverParts, type StlPart } from "@/lib/rover-parts";

export function RoverDownloads() {
  const [active, setActive] = useState<StlPart>(combinedPart);
  const [search, setSearch] = useState("");
  const filtered = roverParts.filter(p => `${p.name} ${p.group}`.toLowerCase().includes(search.toLowerCase()));
  const row = (p: StlPart) => <li key={p.file} className={`part-row flex items-center gap-2 border px-3 py-2 ${active.file === p.file ? "border-accent bg-secondary/30" : "border-transparent"}`}>
    <Button variant="ghost" onClick={() => setActive(p)} aria-pressed={active.file === p.file} aria-label={`View ${p.name} in 3D`} className="h-auto min-h-11 min-w-0 flex-1 flex-col items-start gap-1 whitespace-normal px-1 text-left">
      <span className="font-medium text-foreground">{p.name}</span><span className="text-xs text-muted-foreground">{formatSize(p.size)}</span>
    </Button>
    <Button asChild variant="outline" size="icon"><a href={p.url} download={p.file} aria-label={`Download ${p.name} STL`} title={`Download ${p.name} STL`}><Download /></a></Button>
  </li>;
  return <section id="parts" className="detail-section">
    <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="font-display text-2xl font-bold">3D parts (STL)</h2><span className="font-mono text-xs text-muted-foreground">{roverParts.length} parts + combined plate</span></div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="order-2 lg:order-1">
        <div className="relative mb-4"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input aria-label="Search rover parts" placeholder="Search parts" value={search} onChange={e => setSearch(e.target.value)} className="h-11 pl-10" /></div>
        <div className="max-h-[520px] space-y-4 overflow-y-auto pr-1"><ul>{row(combinedPart)}</ul>
          {[...new Set(filtered.map(p => p.group))].map(g => <div key={g}><h3 className="mb-2 font-mono text-xs text-muted-foreground">{g}</h3><ul className="space-y-1">{filtered.filter(p => p.group === g).map(row)}</ul></div>)}
          {filtered.length === 0 && <p role="status" className="py-6 text-sm text-muted-foreground">No matching parts.</p>}
        </div>
      </div>
      <div className="order-1 self-start lg:sticky lg:top-24 lg:order-2">
        <div className="h-[320px] sm:h-[420px]"><StlViewer url={active.url} name={active.name} /></div>
        <div className="mt-3 flex items-center justify-between gap-2 text-sm"><span aria-live="polite">{active.name}</span><Button asChild variant="link" size="sm"><a href={active.url} download={active.file}><Download /> STL</a></Button></div>
      </div>
    </div>
  </section>;
}
