/** Animated blueprint drawing: a walking spider robot, spinning gears and a scanning sensor sweep. */
export function HeroAnimation() {
  const legs = [
    { x: 150, y: 150, dir: -1, delay: "0s" },
    { x: 250, y: 150, dir: 1, delay: "0.4s" },
    { x: 150, y: 210, dir: -1, delay: "0.4s" },
    { x: 250, y: 210, dir: 1, delay: "0s" },
  ];
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl border-2 border-foreground bg-secondary/50 shadow-hard">
      <div className="blueprint absolute inset-0" />
      <svg viewBox="0 0 400 400" className="relative h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* sensor sweep */}
        <g className="origin-[200px_120px] animate-[sweep_4s_ease-in-out_infinite_alternate]">
          <path d="M200 120 L120 20 A130 130 0 0 1 280 20 Z" className="fill-accent/25" />
        </g>

        {/* walking robot */}
        <g className="animate-[bob_0.8s_ease-in-out_infinite]">
          {legs.map((l, i) => (
            <g key={i} style={{ transformOrigin: `${l.x}px ${l.y}px`, animationDelay: l.delay }} className="animate-[step_0.8s_ease-in-out_infinite]">
              <path
                d={`M${l.x} ${l.y} l${55 * l.dir} -30 l${35 * l.dir} 70`}
                className="stroke-foreground"
                strokeWidth={5}
              />
              <circle cx={l.x + 55 * l.dir} cy={l.y - 30} r={6} className="fill-primary stroke-foreground" strokeWidth={2} />
              <circle cx={l.x + 90 * l.dir} cy={l.y + 40} r={4} className="fill-foreground" />
            </g>
          ))}
          <rect x={135} y={125} width={130} height={110} rx={22} className="fill-card stroke-foreground" strokeWidth={4} />
          <rect x={165} y={150} width={70} height={36} rx={6} className="fill-leaf/30 stroke-foreground" strokeWidth={2} />
          <circle cx={182} cy={208} r={6} className="fill-primary" />
          <circle cx={218} cy={208} r={6} className="fill-primary" />
          <rect x={185} y={108} width={30} height={18} rx={4} className="fill-accent stroke-foreground" strokeWidth={3} />
        </g>

        {/* gears */}
        <Gear cx={70} cy={330} r={34} cls="animate-[spin_6s_linear_infinite] fill-primary/80" />
        <Gear cx={124} cy={350} r={22} cls="animate-[spin_4s_linear_infinite_reverse] fill-leaf/80" />
        <Gear cx={340} cy={70} r={26} cls="animate-[spin_5s_linear_infinite] fill-accent" />

        {/* dimension line drawing itself */}
        <path d="M160 360 H360" className="stroke-foreground animate-[draw_3s_ease-in-out_infinite]" strokeWidth={2} strokeDasharray="200" />
        <text x={260} y={385} textAnchor="middle" className="fill-foreground font-display text-[13px]">12 SERVOS · 4 LEGS</text>
      </svg>
    </div>
  );
}

function Gear({ cx, cy, r, cls }: { cx: number; cy: number; r: number; cls: string }) {
  const teeth = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <g style={{ transformOrigin: `${cx}px ${cy}px` }} className={cls}>
      {teeth.map((a) => (
        <rect key={a} x={cx - 5} y={cy - r - 8} width={10} height={14} rx={2} transform={`rotate(${a} ${cx} ${cy})`} className="stroke-foreground" strokeWidth={2} />
      ))}
      <circle cx={cx} cy={cy} r={r} className="stroke-foreground" strokeWidth={3} />
      <circle cx={cx} cy={cy} r={r / 3} className="fill-card stroke-foreground" strokeWidth={2} />
    </g>
  );
}
