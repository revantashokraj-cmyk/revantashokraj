/**
 * Wireframe line drawing of the rover that draws itself in, floats, and gets
 * scanned by a vertical beam — thin technical linework in the style of a spec sheet.
 */
export function HeroAnimation() {
  const wheel = (cx: number, cy: number) => (
    <g key={`${cx}-${cy}`}>
      <ellipse cx={cx} cy={cy} rx={34} ry={34} className="draw" />
      <ellipse cx={cx} cy={cy} rx={22} ry={22} className="draw" />
      <g>
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={i}
            x1={cx - 20} y1={cy - 4} x2={cx + 20} y2={cy + 4}
            transform={`rotate(${i * 30} ${cx} ${cy})`}
            className="draw"
          />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={5} className="draw" />
    </g>
  );

  return (
    <div className="pointer-events-none relative aspect-[5/4] w-full select-none" aria-hidden>
      <svg viewBox="0 0 520 420" className="hero-float h-full w-full overflow-visible" fill="none">
        <g transform="rotate(-12 260 220) skewX(-6)" className="stroke-foreground/70" strokeWidth={1.4}>
          {/* bed */}
          <rect x={90} y={170} width={340} height={130} rx={8} className="draw" />
          <rect x={98} y={178} width={324} height={114} rx={5} className="draw" strokeDasharray="4 6" />
          {Array.from({ length: 14 }, (_, i) => (
            <line key={i} x1={112 + i * 22} y1={292} x2={112 + i * 22} y2={300} className="draw" />
          ))}
          {/* enclosure */}
          <rect x={190} y={190} width={150} height={84} rx={6} className="draw" />
          <rect x={205} y={204} width={52} height={34} className="draw" />
          <rect x={270} y={204} width={56} height={56} className="draw" />
          {Array.from({ length: 6 }, (_, i) => (
            <circle key={i} cx={282 + (i % 3) * 16} cy={220 + Math.floor(i / 3) * 22} r={3} className="draw" />
          ))}
          {/* mecanum wheels */}
          {wheel(110, 160)}
          {wheel(410, 160)}
          {wheel(110, 312)}
          {wheel(410, 312)}
          {/* 6-DOF arm */}
          <g className="arm-wave" style={{ transformOrigin: "300px 196px" }}>
            <circle cx={300} cy={196} r={16} className="draw" />
            <path d="M300 196 L330 110 L400 70" className="draw" strokeWidth={2.2} />
            <circle cx={330} cy={110} r={8} className="draw" />
            <circle cx={400} cy={70} r={6} className="draw" />
            <path d="M400 70 l22 -10 M400 70 l20 12" className="draw" />
          </g>
          {/* ultrasonic sensor */}
          <rect x={410} y={222} width={26} height={24} rx={3} className="draw" />
          <circle cx={418} cy={234} r={4} className="draw" />
          <circle cx={429} cy={234} r={4} className="draw" />
          <text x={100} y={330} className="fill-foreground/60 font-mono text-[9px]" stroke="none">MECANUM ROVER · 6-DOF ARM</text>
        </g>
        {/* ping waves from the sensor */}
        {[0, 1, 2].map((i) => (
          <path key={i} d="M470 190 q16 22 0 44" className="ping stroke-accent" strokeWidth={2} style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
      </svg>
      {/* scanning beam */}
      <div className="scan-beam absolute inset-y-0 w-px bg-primary">
        <div className="absolute -left-3 top-0 h-full w-6 bg-primary/15 blur-md" />
      </div>
      <span className="absolute left-2 top-2 bg-leaf px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-leaf-foreground">
        Judges' favorite
      </span>
    </div>
  );
}
