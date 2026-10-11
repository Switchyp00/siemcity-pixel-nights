import { useState } from "react";
import { useCitizen } from "@/world/state/CitizenContext";
import RoomGrid from "@/world/components/RoomGrid";
import FurnitureSprite from "@/world/components/FurnitureSprite";
import { furnitureById, FURNITURE } from "@/world/data/furniture";
import { canPlace, findFreeSpot, nextRot } from "@/world/engine/room";
import { newId } from "@/world/services/repositories";
import { PageHeader } from "./DesktopShell";
import { toast } from "sonner";

export default function DesktopHome() {
  const { homebase, citizen, saveHomebase } = useCitizen();
  const [editing, setEditing] = useState(true);
  const [sel, setSel] = useState<string | null>(null);
  const cats = [...new Set(FURNITURE.map((f) => f.category!))];
  const [cat, setCat] = useState(cats[0]);
  if (!homebase || !citizen) return <p className="p-8 font-mono text-xs text-muted-foreground">Loading homebase…</p>;

  const item = homebase.placed.find((p) => p.uid === sel);
  const update = (placed = homebase.placed, inventory = homebase.inventory) => saveHomebase({ ...homebase, placed, inventory });
  const tryPut = (next: typeof item) => {
    if (!next) return;
    if (!canPlace(homebase, next)) return toast.error("Doesn't fit there");
    update(homebase.placed.map((p) => (p.uid === next.uid ? next : p)));
  };
  const place = (defId: string, fromInv?: number) => {
    const spot = findFreeSpot(homebase, { uid: newId(), defId, x: 0, y: 0, rot: 0 });
    if (!spot) return toast.error("No room left");
    const inv = [...homebase.inventory]; if (fromInv !== undefined) inv.splice(fromInv, 1);
    update([...homebase.placed, spot], inv); setSel(spot.uid);
  };
  const btn = "h-10 px-4 border-2 font-pixel text-[8px] disabled:opacity-40";

  return (
    <>
      <PageHeader title="HOMEBASE" sub="YOUR SPACE. YOUR RULES. CHANGES SAVE AUTOMATICALLY."
        right={<button onClick={() => { setEditing(!editing); setSel(null); }} className={`${btn} h-12 ${editing ? "border-primary text-primary bg-primary/10" : "border-secondary text-secondary"}`}>EDIT MODE: {editing ? "ON" : "OFF"}</button>} />
      <div className="p-6 grid xl:grid-cols-[1fr_440px] gap-6">
        <div className="flex flex-col gap-3">
          <div className="max-w-[min(100%,78vh)] w-full mx-auto">
            <RoomGrid room={homebase} editing={editing} selected={sel} onSelect={setSel} occupant={citizen.avatar}
              onTile={(x, y) => item ? tryPut({ ...item, x, y }) : setSel(null)} />
          </div>
          {editing && (
            <div className="flex gap-2 items-center justify-center flex-wrap">
              <span className="font-mono text-xs text-muted-foreground">{item ? `${furnitureById(item.defId).name} selected — click a tile to move` : "Click furniture to select it"}</span>
              <button disabled={!item} onClick={() => item && tryPut({ ...item, rot: nextRot(item.rot) })} className={`${btn} border-border`}>ROTATE</button>
              <button disabled={!item} onClick={() => { if (!item) return; update(homebase.placed.filter((p) => p.uid !== item.uid), [...homebase.inventory, item.defId]); setSel(null); }} className={`${btn} border-border`}>STORE</button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="retro-window p-4">
            <div className="flex flex-wrap gap-1 mb-3">
              {cats.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`h-8 px-2 border-2 font-pixel text-[7px] ${cat === c ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground"}`}>{c.toUpperCase()}</button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {FURNITURE.filter((f) => f.category === cat).map((f) => (
                <button key={f.id} disabled={!editing} onClick={() => place(f.id)} title="Place in room"
                  className="h-24 border-2 border-border bg-background hover:border-secondary p-2 flex flex-col items-center gap-1 disabled:opacity-50">
                  <div className="w-12 h-12"><FurnitureSprite id={f.id} /></div>
                  <span className="font-mono text-[9px] leading-tight text-center">{f.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="retro-window p-4">
            <p className="font-pixel text-[9px] neon-text mb-3">INVENTORY ({homebase.inventory.length})</p>
            {homebase.inventory.length === 0 ? <p className="font-mono text-[11px] text-muted-foreground">Stored items appear here.</p> : (
              <div className="grid grid-cols-5 gap-2">
                {homebase.inventory.map((d, i) => (
                  <button key={i} disabled={!editing} onClick={() => place(d, i)} className="h-20 border-2 border-border bg-background p-1 flex flex-col items-center disabled:opacity-50">
                    <div className="w-10 h-10"><FurnitureSprite id={d} /></div>
                    <span className="font-mono text-[8px] text-center">{furnitureById(d).name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
