/**
 * Detailed wireframe of a turbofan engine cutaway: spinning fan, compressor and
 * turbine stages, callouts and dimension lines that draw themselves in, plus a scanning beam.
 */
const FAN = { cx: 110, cy: 200 };

function Fan() {
  return (
    <g>
      <circle cx={FAN.cx} cy={FAN.cy} r={92} className="draw" />
      <circle cx={FAN.cx} cy={FAN.cy} r={84} className="draw" strokeDasharray="2 5" />
      <g className="fan-spin" style={{ transformOrigin: `${FAN.cx}px ${FAN.cy}px` }}>
        {Array.from({ length: 18 }, (_, i) => (
          <path
            key={i}
            d={`M${FAN.cx} ${FAN.cy - 18} C ${FAN.cx + 14} ${FAN.cy - 45}, ${FAN.cx + 4} ${FAN.cy - 70}, ${FAN.cx + 16} ${FAN.cy - 82}`}
            transform={`rotate(${i * 20} ${FAN.cx} ${FAN.cy})`}
          />
        ))}
      </g>
      <circle cx={FAN.cx} cy={FAN.cy} r={18} className="draw" />
      <circle cx={FAN.cx} cy={FAN.cy} r={6} className="draw" />
    </g>
  );
}

function Stage({ x, h, n, cls }: { x: number; h: number; n: number; cls?: string }) {
  return (
    <g>
      <line x1={x} y1={200 - h} x2={x} y2={200 + h} className="draw" />
      {Array.from({ length: n }, (_, i) => {
        const y = 200 - h + ((2 * h) / (n - 1)) * i;
        return <line key={i} x1={x - 5} y1={y} x2={x + 5} y2={y + 3} className={cls ?? "draw"} />;
      })}
    </g>
  );
}

function Callout({ x, y, tx, ty, label, sub, delay }: { x: number; y: number; tx: number; ty: number; label: string; sub: string; delay: string }) {
  return (
    <g className="callout" style={{ animationDelay: delay }}>
      <circle cx={x} cy={y} r={3} className="fill-primary" stroke="none" />
      <path d={`M${x} ${y} L${tx} ${ty} H${tx + 70}`} className="stroke-primary" />
      <text x={tx + 2} y={ty - 5} className="fill-foreground font-mono text-[8.5px] uppercase tracking-wider" stroke="none">{label}</text>
      <text x={tx + 2} y={ty + 10} className="fill-muted-foreground font-mono text-[7.5px]" stroke="none">{sub}</text>
    </g>
  );
}

export function HeroAnimation() {
  const comp = [190, 205, 220, 235, 250, 265, 280];
  const turb = [345, 360, 375, 390];
  return (
    <div className="pointer-events-none relative aspect-[5/4] w-full select-none overflow-hidden" aria-hidden>
      <svg viewBox="0 0 520 420" className="hero-float h-full w-full" fill="none">
        <g transform="translate(20 10) rotate(-8 260 200)" className="stroke-foreground/75" strokeWidth={1.1}>
          {/* nacelle */}
          <path d="M70 100 Q 110 92 170 104 L 430 150 Q 470 160 488 200 Q 470 240 430 250 L 170 296 Q 110 308 70 300" className="draw" />
          <path d="M80 112 Q 115 104 170 116 L 420 160 M80 288 Q 115 296 170 284 L 420 240" className="draw" strokeDasharray="3 4" />
          {/* core casing */}
          <path d="M170 150 L 300 162 L 410 172 L 470 190 L 470 210 L 410 228 L 300 238 L 170 250 Z" className="draw" />
          {/* shaft */}
          <line x1={110} y1={200} x2={480} y2={200} className="draw" strokeDasharray="10 3 2 3" />
          <Fan />
          {/* compressor */}
          {comp.map((x, i) => <Stage key={x} x={x} h={44 - i * 3} n={9} />)}
          {/* combustor */}
          <rect x={295} y={172} width={36} height={56} rx={10} className="draw" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${303 + i * 9} 214 q 4 -10 0 -18 q -4 -8 0 -14`} className="flame stroke-primary" strokeWidth={1.6} style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
          {/* turbine */}
          {turb.map((x, i) => <Stage key={x} x={x} h={24 + i * 3} n={7} />)}
          {/* exhaust cone */}
          <path d="M410 186 L 470 200 L 410 214" className="draw" />
          {/* airflow */}
          {[150, 175, 225, 250].map((y, i) => (
            <line key={y} x1={20} y1={y} x2={70} y2={y} className="flow stroke-accent" strokeWidth={1.6} style={{ animationDelay: `${i * 0.35}s` }} />
          ))}
          {[190, 210].map((y, i) => (
            <line key={y} x1={480} y1={y} x2={520} y2={y} className="flow stroke-primary" strokeWidth={1.6} style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
          {/* dimension line */}
          <g className="draw-late">
            <path d="M70 330 V 340 M488 330 V 340 M70 335 H 488" className="draw" />
            <text x={279} y={350} textAnchor="middle" className="fill-muted-foreground font-mono text-[8px]" stroke="none">L = 418 mm · BYPASS 5:1</text>
          </g>
        </g>
        <Callout x={128} y={130} tx={150} ty={46} label="Fan · 18 blades" sub="ω = 4 200 rpm" delay="2.6s" />
        <Callout x={258} y={176} tx={290} ty={70} label="HP compressor" sub="7 stages · PR 12" delay="3s" />
        <Callout x={336} y={234} tx={360} ty={360} label="Combustor" sub="T = 1 450 K" delay="3.4s" />
        <Callout x={400} y={196} tx={420} ty={108} label="Turbine" sub="4 stages" delay="3.8s" />
      </svg>
      <div className="scan-beam absolute inset-y-6 w-px bg-primary">
        <div className="absolute -left-3 top-0 h-full w-6 bg-primary/15 blur-md" />
      </div>
      <span className="absolute left-2 top-2 bg-leaf px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-leaf-foreground">
        FIG. 01 — Turbofan study
      </span>
      <span className="absolute bottom-2 right-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Scale 1:4 · Rev C
      </span>
    </div>
  );
}
