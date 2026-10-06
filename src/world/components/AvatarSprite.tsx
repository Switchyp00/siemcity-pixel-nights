import type { AvatarConfig } from "../models";
import { BODY_PX, PARTS, Px, SKIN_TONES } from "../data/avatarParts";

const ORDER = ["bottom", "shoes", "top", "eyes", "brows", "mouth", "hair", "accessory"] as const;

export default function AvatarSprite({ avatar, size = 96, className = "" }: { avatar: AvatarConfig; size?: number; className?: string }) {
  const colors: Record<string, string> = {
    skin: SKIN_TONES.find((s) => s.id === avatar.body)?.color ?? SKIN_TONES[0].color,
    hair: avatar.hairColor, top: avatar.topColor, bottom: avatar.bottomColor,
  };
  const layers: Px[] = [...BODY_PX];
  for (const cat of ORDER) {
    const opt = PARTS[cat].find((o) => o.id === avatar[cat]);
    if (opt) layers.push(...opt.px);
  }
  return (
    <svg viewBox="0 -1 16 25" width={size} height={(size * 25) / 16} className={className} shapeRendering="crispEdges" aria-label="Citizen avatar">
      <ellipse cx="8" cy="23.3" rx="5" ry="0.8" fill="hsl(var(--background))" opacity="0.6" />
      {layers.map(([x, y, w, h, c], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={colors[c] ?? c} />
      ))}
    </svg>
  );
}
