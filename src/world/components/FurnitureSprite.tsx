// Data-keyed pixel art per furniture id (16x16 grid); replace with sprite sheets later.
export default function FurnitureSprite({ id }: { id: string }) {
  const p = "hsl(var(--primary))", s = "hsl(var(--secondary))", c = "hsl(var(--card))", m = "hsl(var(--muted))", b = "hsl(var(--background))";
  const o = "#0b0b18";
  const art: Record<string, JSX.Element> = {
    bed: <><rect x="1" y="1" width="14" height="14" fill={o} /><rect x="2" y="2" width="12" height="12" fill="#5a3a26" /><rect x="3" y="3" width="10" height="3" fill="#f1f1f1" /><rect x="3" y="5" width="10" height="1" fill="#c8c8d0" /><rect x="3" y="6" width="10" height="7" fill={s} /><rect x="3" y="8" width="10" height="1" fill="#00000040" /><rect x="3" y="11" width="10" height="1" fill="#00000040" /><rect x="4" y="7" width="2" height="1" fill="#ffffff40" /></>,
    desk: <><rect x="0" y="3" width="16" height="10" fill={o} /><rect x="1" y="4" width="14" height="8" fill="#8a5a36" /><rect x="1" y="4" width="14" height="1" fill="#a9744a" /><rect x="1" y="11" width="14" height="1" fill="#5a3a22" /><rect x="10" y="6" width="3" height="2" fill="#ffd166" /><rect x="3" y="8" width="4" height="1" fill="#222" /></>,
    crt: <><rect x="2" y="1" width="12" height="13" fill={o} /><rect x="3" y="2" width="10" height="9" fill="#cfc8b8" /><rect x="4" y="3" width="8" height="6" fill={b} /><rect x="5" y="4" width="4" height="1" fill={p} /><rect x="5" y="6" width="6" height="1" fill={p} opacity=".6" /><rect x="5" y="7" width="1" height="1" fill={p} /><rect x="4" y="3" width="8" height="6" fill={p} opacity=".08" /><rect x="11" y="9" width="1" height="1" fill={p} /><rect x="4" y="11" width="8" height="2" fill="#a8a090" /></>,
    rack: <><rect x="1" y="0" width="14" height="16" fill={o} /><rect x="2" y="0" width="12" height="16" fill="#222" />{[1, 4, 7, 10, 13].map((y, i) => <g key={y}><rect x="3" y={y} width="10" height="2" fill={m} /><rect x="4" y={y + 0.5} width="5" height="1" fill="#111" /><rect x="11" y={y + 0.5} width="1" height="1" fill={i % 2 ? s : p} /><rect x="10" y={y + 0.5} width="0.6" height="1" fill={p} opacity=".6" /></g>)}</>,
    chair: <><rect x="3" y="2" width="10" height="11" fill={o} /><rect x="4" y="3" width="8" height="3" fill={s} /><rect x="4" y="3" width="8" height="1" fill="#ffffff30" /><rect x="4" y="6" width="8" height="6" fill="#3a3a5a" /><rect x="7" y="12" width="2" height="2" fill="#222" /></>,
    plant: <><rect x="4" y="10" width="8" height="6" fill={o} /><rect x="5" y="10" width="6" height="5" fill="#b0603a" /><rect x="5" y="10" width="6" height="1" fill="#d07a4a" /><rect x="2" y="3" width="12" height="8" fill="#1d5e34" /><rect x="3" y="3" width="10" height="7" fill="#2d8a4e" /><rect x="5" y="1" width="6" height="4" fill="#3fbf6a" /><rect x="4" y="5" width="2" height="1" fill="#6fe39a" /><rect x="10" y="7" width="2" height="1" fill="#6fe39a" /></>,
    lamp: <><rect x="4" y="0" width="8" height="7" fill={s} opacity=".25" /><rect x="7" y="5" width="2" height="9" fill={m} /><rect x="4" y="1" width="8" height="5" fill={s} /><rect x="5" y="2" width="6" height="2" fill="#c9b8ff" /><rect x="5" y="14" width="6" height="1" fill={m} /></>,
    rug: <><rect x="0" y="0" width="16" height="16" fill={s} opacity=".55" /><rect x="2" y="2" width="12" height="12" fill="none" stroke={p} strokeWidth=".6" opacity=".7" /><rect x="6" y="6" width="4" height="4" fill={p} opacity=".35" /></>,
  };
  return (
    <svg viewBox="0 0 16 16" preserveAspectRatio="none" className="w-full h-full" shapeRendering="crispEdges">
      {art[id] ?? <rect width="16" height="16" fill={c} />}
    </svg>
  );
}
