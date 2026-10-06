import { useState } from "react";
import { useCitizen } from "../state/CitizenContext";
import RoomGrid from "../components/RoomGrid";
import FurnitureSprite from "../components/FurnitureSprite";
import { furnitureById } from "../data/furniture";
import { canPlace, findFreeSpot, nextRot } from "../engine/room";
import { newId } from "../services/repositories";
import { toast } from "sonner";

export default function HomeScreen() {
  const { homebase, citizen, saveHomebase, updateCitizen } = useCitizen();
  const [editing, setEditing] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  if (!homebase || !citizen) return <p className="p-6 font-mono text-xs text-muted-foreground">Loading homebase…</p>;

  const item = homebase.placed.find((p) => p.uid === sel);
  const update = (placed = homebase.placed, inventory = homebase.inventory) => saveHomebase({ ...homebase, placed, inventory });
  const tryPut = (next: typeof item) => {
    if (!next) return;
    if (!canPlace(homebase, next)) return toast.error("Doesn't fit there");
    update(homebase.placed.map((p) => (p.uid === next.uid ? next : p)));
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {!citizen.tutorialDone && (
        <div className="retro-window p-3 font-mono text-[11px] flex gap-3 items-start">
          <span className="neon-text">&gt;</span>
          <p className="flex-1 text-card-foreground">Welcome home. Tap <b>EDIT</b> to rearrange, then open <b>CITY</b> to explore.</p>
          <button className="font-pixel text-[7px] text-muted-foreground" onClick={() => updateCitizen({ tutorialDone: true })}>OK</button>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-[10px] neon-text">{homebase.name.toUpperCase()}</h2>
        <button onClick={() => { setEditing(!editing); setSel(null); }}
          className={`h-10 px-4 border-2 font-pixel text-[8px] ${editing ? "border-primary text-primary bg-primary/10" : "border-secondary text-secondary"}`}>{editing ? "DONE" : "EDIT"}</button>
      </div>
      <RoomGrid room={homebase} editing={editing} selected={sel} onSelect={setSel} occupant={citizen.avatar}
        onTile={(x, y) => item ? tryPut({ ...item, x, y }) : setSel(null)} />
      {editing && (
        <>
          <div className="grid grid-cols-3 gap-2">
            <button disabled={!item} onClick={() => item && tryPut({ ...item, rot: nextRot(item.rot) })} className="h-12 border-2 border-border font-pixel text-[8px] disabled:opacity-40">ROTATE</button>
            <button disabled={!item} onClick={() => { if (!item) return; update(homebase.placed.filter((p) => p.uid !== item.uid), [...homebase.inventory, item.defId]); setSel(null); }}
              className="h-12 border-2 border-border font-pixel text-[8px] disabled:opacity-40">STORE</button>
            <p className="font-mono text-[9px] text-muted-foreground self-center text-center">{item ? `${furnitureById(item.defId).name}: tap a tile` : "Tap an item"}</p>
          </div>
          <div>
            <p className="font-pixel text-[8px] text-muted-foreground mb-2">INVENTORY ({homebase.inventory.length})</p>
            {homebase.inventory.length === 0 ? <p className="font-mono text-[10px] text-muted-foreground">Empty — stored items appear here.</p> : (
              <div className="flex gap-2 overflow-x-auto">
                {homebase.inventory.map((d, i) => (
                  <button key={i} className="shrink-0 w-16 h-20 border-2 border-border bg-card p-1 flex flex-col items-center"
                    onClick={() => {
                      const spot = findFreeSpot(homebase, { uid: newId(), defId: d, x: 0, y: 0, rot: 0 });
                      if (!spot) return toast.error("No room left");
                      const inv = [...homebase.inventory]; inv.splice(i, 1);
                      update([...homebase.placed, spot], inv); setSel(spot.uid);
                    }}>
                    <div className="w-10 h-10"><FurnitureSprite id={d} /></div>
                    <span className="font-mono text-[8px]">{furnitureById(d).name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
