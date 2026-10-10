import { useId } from "react";
import type { AvatarConfig } from "../models";
import { BODY_PX, PARTS, Px, SKIN_TONES, migrateAvatar } from "../data/avatarParts";

const ORDER = ["face", "bottom", "shoes", "top", "eyes", "brows", "nose", "mouth", "hair", "accessory"] as const;
const SHADED = new Set(["skin", "hair", "top", "bottom"]);

export default function AvatarSprite({ avatar: raw, size = 96, className = "" }: { avatar: AvatarConfig; size?: number; className?: string }) {
  const avatar = migrateAvatar(raw);
  const fid = `ol${useId().replace(/:/g, "")}`;
  const colors: Record<string, string> = {
    skin: SKIN_TONES.find((s) => s.id === avatar.body)?.color ?? SKIN_TONES[0].color,
    hair: avatar.hairColor, top: avatar.topColor, bottom: avatar.bottomColor, shoe: avatar.shoeColor,
  };
  const layers: Px[] = [...BODY_PX];
  for (const cat of ORDER) {
    const opt = PARTS[cat].find((o) => o.id === avatar[cat]);
    if (opt) layers.push(...opt.px);
  }
  return (
    <svg viewBox="-1 -3 18 28" width={size} height={(size * 28) / 18} className={className} shapeRendering="crispEdges" aria-label="Citizen avatar">
      <defs>
        {/* 1px dark pixel outline around the whole silhouette */}
        <filter id={fid} x="-20%" y="-20%" width="140%" height="140%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="0.5" result="d" />
          <feFlood floodColor="#0b0b18" />
          <feComposite in2="d" operator="in" result="o" />
          <feMerge><feMergeNode in="o" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <ellipse cx="8" cy="23.4" rx="5.5" ry="0.9" fill="#000" opacity="0.45" />
      <g filter={`url(#${fid})`}>
        {layers.map(([x, y, w, h, c], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill={colors[c] ?? c} />
            {SHADED.has(c) && h >= 2 && <rect x={x} y={y + h - 0.6} width={w} height={0.6} fill="#000" opacity="0.28" />}
            {SHADED.has(c) && w >= 2 && h >= 2 && <rect x={x} y={y} width={0.6} height={h} fill="#fff" opacity="0.14" />}
          </g>
        ))}
        {/* cheeks + eye shine for more personality */}
        <rect x="5.6" y="7" width="0.8" height="0.6" fill="#ff8fab" opacity="0.45" />
        <rect x="9.6" y="7" width="0.8" height="0.6" fill="#ff8fab" opacity="0.45" />
      </g>
    </svg>
  );
}
