import { useState } from "react";
import type { AvatarConfig } from "../models";
import { DEFAULT_AVATAR, PALETTE, PARTS, SKIN_TONES, randomAvatar } from "../data/avatarParts";
import AvatarSprite from "./AvatarSprite";
import PixelButton from "@/components/PixelButton";

type Tab = "body" | keyof typeof PARTS;
const TABS: { id: Tab; label: string; color?: keyof AvatarConfig }[] = [
  { id: "body", label: "SKIN" }, { id: "eyes", label: "EYES" }, { id: "brows", label: "BROWS" }, { id: "mouth", label: "MOUTH" },
  { id: "hair", label: "HAIR", color: "hairColor" }, { id: "top", label: "TOP", color: "topColor" },
  { id: "bottom", label: "BOTTOM", color: "bottomColor" }, { id: "shoes", label: "SHOES" }, { id: "accessory", label: "EXTRA" },
];

export default function AvatarCreator({ initial, onSave, saveLabel = "SAVE" }: { initial?: AvatarConfig; onSave: (a: AvatarConfig) => void; saveLabel?: string }) {
  const [a, setA] = useState<AvatarConfig>(initial ?? DEFAULT_AVATAR);
  const [tab, setTab] = useState<Tab>("body");
  const t = TABS.find((x) => x.id === tab)!;
  const set = (patch: Partial<AvatarConfig>) => setA((p) => ({ ...p, ...patch }));
  const options = tab === "body" ? SKIN_TONES.map((s) => ({ id: s.id, name: s.name })) : PARTS[tab];

  return (
    <div className="flex flex-col gap-4">
      <div className="retro-window flex items-end justify-center h-56 relative" style={{ background: "radial-gradient(circle at 50% 70%, hsl(var(--secondary)/.25), hsl(var(--card)))" }}>
        <span className="absolute top-2 left-2 font-pixel text-[7px] text-muted-foreground">PREVIEW</span>
        <AvatarSprite avatar={a} size={112} className="mb-2" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((x) => (
          <button key={x.id} onClick={() => setTab(x.id)}
            className={`shrink-0 font-pixel text-[7px] px-3 h-10 border-2 ${tab === x.id ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground"}`}>{x.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {options.map((o) => {
          const active = a[tab] === o.id;
          return (
            <button key={o.id} onClick={() => set({ [tab]: o.id } as Partial<AvatarConfig>)}
              className={`h-20 border-2 flex flex-col items-center justify-center gap-1 ${active ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
              <AvatarSprite avatar={{ ...a, [tab]: o.id }} size={28} />
              <span className="font-mono text-[9px] text-card-foreground">{o.name}</span>
            </button>
          );
        })}
      </div>
      {t.color && (
        <div className="flex flex-wrap gap-2">
          {PALETTE.map((c) => (
            <button key={c} aria-label={`Color ${c}`} onClick={() => set({ [t.color!]: c } as Partial<AvatarConfig>)}
              className={`w-10 h-10 border-2 ${a[t.color!] === c ? "border-primary" : "border-border"}`} style={{ background: c }} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => setA(randomAvatar())} className="h-12 border-2 border-secondary font-pixel text-[8px] text-secondary">RANDOM</button>
        <button onClick={() => setA(initial ?? DEFAULT_AVATAR)} className="h-12 border-2 border-border font-pixel text-[8px] text-muted-foreground">RESET</button>
        <PixelButton className="!px-2" onClick={() => onSave(a)}>{saveLabel}</PixelButton>
      </div>
    </div>
  );
}
