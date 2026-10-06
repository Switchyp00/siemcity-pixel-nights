// Placeholder pixel art per furniture id; replace with sprite sheets later.
export default function FurnitureSprite({ id }: { id: string }) {
  const p = "hsl(var(--primary))", s = "hsl(var(--secondary))", c = "hsl(var(--card))", m = "hsl(var(--muted))", b = "hsl(var(--background))";
  const art: Record<string, JSX.Element> = {
    bed: <><rect x="1" y="1" width="14" height="14" fill={m} /><rect x="2" y="2" width="12" height="4" fill="#f1f1f1" /><rect x="2" y="6" width="12" height="8" fill={s} /></>,
    desk: <><rect x="0" y="3" width="16" height="10" fill="#6b4226" /><rect x="1" y="4" width="14" height="8" fill="#8a5a36" /></>,
    crt: <><rect x="3" y="2" width="10" height="9" fill="#cfc8b8" /><rect x="4" y="3" width="8" height="6" fill={b} /><rect x="5" y="4" width="4" height="1" fill={p} /><rect x="5" y="6" width="6" height="1" fill={p} opacity=".6" /><rect x="5" y="11" width="6" height="2" fill="#a8a090" /></>,
    rack: <><rect x="2" y="0" width="12" height="16" fill="#222" />{[2, 6, 10].map((y) => <g key={y}><rect x="3" y={y} width="10" height="3" fill={m} /><rect x="11" y={y + 1} width="1" height="1" fill={p} /><rect x="9" y={y + 1} width="1" height="1" fill={s} /></g>)}</>,
    chair: <><rect x="4" y="3" width="8" height="3" fill={s} /><rect x="4" y="6" width="8" height="6" fill="#3a3a5a" /></>,
    plant: <><rect x="5" y="10" width="6" height="5" fill="#8a5a36" /><rect x="3" y="3" width="10" height="7" fill="#2d8a4e" /><rect x="6" y="1" width="4" height="3" fill="#3fbf6a" /></>,
    lamp: <><rect x="7" y="5" width="2" height="9" fill={m} /><rect x="4" y="1" width="8" height="5" fill={s} /><rect x="5" y="14" width="6" height="1" fill={m} /></>,
    rug: <><rect x="0" y="0" width="16" height="16" fill={s} opacity=".55" /><rect x="2" y="2" width="12" height="12" fill="none" stroke={p} strokeWidth=".6" opacity=".7" /></>,
  };
  return (
    <svg viewBox="0 0 16 16" preserveAspectRatio="none" className="w-full h-full" shapeRendering="crispEdges">
      {art[id] ?? <rect width="16" height="16" fill={c} />}
    </svg>
  );
}
