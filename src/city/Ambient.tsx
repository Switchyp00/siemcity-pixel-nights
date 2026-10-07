// Lightweight CSS-driven ambient life. Disabled under prefers-reduced-motion via index.css.
const CLOUDS = [{ top: 3, dur: 140, delay: -20, w: 14 }, { top: 9, dur: 190, delay: -110, w: 20 }, { top: 15, dur: 160, delay: -60, w: 11 }];
// Cars travel along the diagonal avenues (percent coordinates on the stage).
const CARS = [
  { cls: "car-a", color: "hsl(var(--primary))", delay: 0 },
  { cls: "car-a", color: "hsl(var(--secondary))", delay: -7 },
  { cls: "car-b", color: "hsl(45 100% 65%)", delay: -3 },
  { cls: "car-b", color: "hsl(190 90% 60%)", delay: -11 },
];
const BLINKS = [[51, 6], [46.5, 11], [53.6, 12], [70.3, 6], [86, 34], [12, 8], [88, 9], [6, 62]];

export default function Ambient() {
  return (
    <div className="absolute inset-0 pointer-events-none city-ambient" aria-hidden>
      {CLOUDS.map((c, i) => (
        <div key={i} className="absolute cloud" style={{ top: `${c.top}%`, width: `${c.w}%`, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}>
          <div className="h-[1.2vw] bg-card-foreground/15 w-full" />
          <div className="h-[1.2vw] bg-card-foreground/10 w-3/4 ml-[12%]" />
        </div>
      ))}
      {CARS.map((c, i) => (
        <span key={i} className={`absolute ${c.cls} block w-[0.9%] aspect-[2/1]`} style={{ background: c.color, boxShadow: `0 0 8px ${c.color}`, animationDelay: `${c.delay}s` }} />
      ))}
      {BLINKS.map(([x, y], i) => (
        <span key={i} className="absolute w-[0.35%] aspect-square bg-destructive blink-light" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.37}s`, zIndex: 35 }} />
      ))}
      <div className="absolute bird" style={{ top: "12%" }}>
        <svg viewBox="0 0 12 4" className="w-[1.4vw]"><path d="M0 1h2v1h2v1h4V2h2V1h2v1h-1v1H8v1H4V3H1V2H0z" fill="hsl(var(--background))" /></svg>
      </div>
      <div className="absolute inset-0 scanline" />
    </div>
  );
}
