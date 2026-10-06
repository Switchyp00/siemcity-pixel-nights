import type { Homebase } from "../models";
import { footprint, zOrder } from "../engine/room";
import FurnitureSprite from "./FurnitureSprite";
import AvatarSprite from "./AvatarSprite";
import type { AvatarConfig } from "../models";

interface Props {
  room: Homebase;
  editing?: boolean;
  selected?: string | null;
  onSelect?: (uid: string | null) => void;
  onTile?: (x: number, y: number) => void;
  occupant?: AvatarConfig;
}

export default function RoomGrid({ room, editing, selected, onSelect, onTile, occupant }: Props) {
  const pct = (n: number, of: number) => `${(n / of) * 100}%`;
  return (
    <div className="relative w-full aspect-square border-2 border-border bg-card overflow-hidden select-none"
      style={{ backgroundImage: "linear-gradient(hsl(var(--border)/.5) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--border)/.5) 1px,transparent 1px)", backgroundSize: `${100 / room.width}% ${100 / room.height}%` }}>
      {editing && (
        <div className="absolute inset-0 grid z-0" style={{ gridTemplateColumns: `repeat(${room.width},1fr)` }}>
          {Array.from({ length: room.width * room.height }).map((_, i) => (
            <button key={i} aria-label={`Tile ${i % room.width},${Math.floor(i / room.width)}`} className="active:bg-primary/20"
              onClick={() => onTile?.(i % room.width, Math.floor(i / room.width))} />
          ))}
        </div>
      )}
      {room.placed.map((p) => {
        const { w, h } = footprint(p);
        const sel = selected === p.uid;
        return (
          <button key={p.uid}
            onClick={(e) => { e.stopPropagation(); if (editing) onSelect?.(sel ? null : p.uid); }}
            className={`absolute p-[2px] transition-all ${editing ? "" : "pointer-events-none"} ${sel ? "outline outline-2 outline-primary animate-pulse-subtle" : ""}`}
            style={{ left: pct(p.x, room.width), top: pct(p.y, room.height), width: pct(w, room.width), height: pct(h, room.height), zIndex: zOrder(p) + 1 }}>
            <div className="w-full h-full" style={{ transform: p.rot % 2 && w !== h ? undefined : `rotate(${p.rot * 90}deg)` }}>
              <FurnitureSprite id={p.defId} />
            </div>
          </button>
        );
      })}
      {occupant && !editing && (
        <div className="absolute pointer-events-none" style={{ left: "40%", top: "48%", zIndex: 40 }}>
          <AvatarSprite avatar={occupant} size={44} />
        </div>
      )}
    </div>
  );
}
