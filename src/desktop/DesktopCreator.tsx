import { useState } from "react";
import type { AvatarConfig } from "@/world/models";
import { DEFAULT_AVATAR, PALETTE, PARTS, SKIN_TONES, CATEGORY_COUNT, randomAvatar, migrateAvatar } from "@/world/data/avatarParts";
import AvatarSprite from "@/world/components/AvatarSprite";
import { useCitizen } from "@/world/state/CitizenContext";
import { PageHeader } from "./DesktopShell";
import stage from "@/assets/desktop/creator-stage.jpg";
import { toast } from "sonner";

type Tab = "body" | keyof typeof PARTS;
const TABS: { id: Tab; label: string; color?: keyof AvatarConfig }[] = [
  { id: "hair", label: "HAIR", color: "hairColor" }, { id: "body", label: "SKIN" }, { id: "face", label: "FACE" }, { id: "eyes", label: "EYES" },
  { id: "brows", label: "BROWS" }, { id: "nose", label: "NOSE" }, { id: "mouth", label: "MOUTH" },
  { id: "top", label: "TOPS", color: "topColor" }, { id: "bottom", label: "BOTTOMS", color: "bottomColor" },
  { id: "shoes", label: "SHOES", color: "shoeColor" }, { id: "accessory", label: "ACCESSORIES" },
];

export default function DesktopCreator() {
  const { citizen, updateCitizen } = useCitizen();
  const [a, setA] = useState<AvatarConfig>(migrateAvatar(citizen?.avatar));
  const [tab, setTab] = useState<Tab>("hair");
  const t = TABS.find((x) => x.id === tab)!;
  const options = tab === "body" ? SKIN_TONES.map((s) => ({ id: s.id, name: s.name })) : PARTS[tab];
  const save = async () => { await updateCitizen({ avatar: a }); toast.success("Citizen saved"); };

  return (
    <>
      <PageHeader title="CITIZEN CREATOR" sub={`12 PART CATEGORIES. ${CATEGORY_COUNT} OPTIONS.`}
        right={<button onClick={save} className="h-12 px-6 border-2 border-primary text-primary font-pixel text-[10px] hover:bg-primary/10" style={{ boxShadow: "var(--neon-glow)" }}>▣ SAVE CITIZEN</button>} />
      <div className="p-6 grid xl:grid-cols-[minmax(320px,420px)_1fr] gap-6">
        <div className="flex flex-col gap-3">
          <div className="retro-window relative overflow-hidden aspect-[6/7] flex items-end justify-center">
            <img src={stage} alt="" width={768} height={896} className="absolute inset-0 w-full h-full object-cover" />
            <AvatarSprite avatar={a} size={190} className="relative mb-[9%]" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => setA(randomAvatar())} className="h-11 border-2 border-secondary font-pixel text-[8px] text-secondary">RANDOMIZE</button>
            <button onClick={() => setA(migrateAvatar(citizen?.avatar ?? DEFAULT_AVATAR))} className="h-11 border-2 border-border font-pixel text-[8px] text-muted-foreground">RESET</button>
            <button onClick={save} className="h-11 border-2 border-primary font-pixel text-[8px] text-primary">SAVE</button>
          </div>
        </div>
        <div className="flex flex-col gap-4 min-w-0">
          <div className="flex flex-wrap gap-1">
            {TABS.map((x) => (
              <button key={x.id} onClick={() => setTab(x.id)}
                className={`px-3 h-10 border-2 font-pixel text-[8px] ${tab === x.id ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-card-foreground"}`}>{x.label}</button>
            ))}
          </div>
          <div className="grid lg:grid-cols-[1fr_200px] gap-4">
            <div className="retro-window p-4">
              <p className="font-pixel text-[10px] neon-text mb-3">{t.label} <span className="text-muted-foreground">({options.length} OPTIONS)</span></p>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2 max-h-[520px] overflow-y-auto pr-1">
                {options.map((o) => {
                  const active = a[tab] === o.id;
                  return (
                    <button key={o.id} onClick={() => setA((p) => ({ ...p, [tab]: o.id }))}
                      className={`h-28 border-2 flex flex-col items-center justify-center gap-1 ${active ? "border-primary bg-primary/10" : "border-border bg-background hover:border-secondary"}`}>
                      <AvatarSprite avatar={{ ...a, [tab]: o.id }} size={52} />
                      <span className="font-mono text-[9px] text-card-foreground text-center leading-tight">{o.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {t.color && (
              <div className="retro-window p-4">
                <p className="font-pixel text-[9px] neon-text mb-3">{t.label} COLOR</p>
                <div className="grid grid-cols-4 gap-2">
                  {PALETTE.map((c) => (
                    <button key={c} aria-label={`Color ${c}`} onClick={() => setA((p) => ({ ...p, [t.color!]: c }))}
                      className={`aspect-square border-2 ${a[t.color!] === c ? "border-primary" : "border-border"}`} style={{ background: c }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
