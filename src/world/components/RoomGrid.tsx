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
    <div className="relative w-full aspect-square border-[6px] border-[#3a3556] shadow-[inset_0_0_0_2px_#15121f] bg-card overflow-hidden select-none"
      style={{
        backgroundColor: "#262238",
        backgroundImage: [
          "radial-gradient(ellipse at 30% 20%, hsl(var(--secondary)/.28), transparent 55%)",
          "radial-gradient(ellipse at 85% 10%, hsl(var(--primary)/.18), transparent 45%)",
          "linear-gradient(90deg,#00000033 1px,transparent 1px)",
          "linear-gradient(#00000055 1px,transparent 1px)",
          "repeating-linear-gradient(90deg,#2c2842 0 12.5%,#302b48 12.5% 25%)",
        ].join(","),
        backgroundSize: `100% 100%,100% 100%,${100 / room.width}% ${100 / room.height}%,${100 / room.width}% ${50 / room.height}%,100% 100%`,
        imageRendering: "pixelated",
      }}>
      <div className="absolute inset-x-0 top-0 h-[3%] pointer-events-none" style={{ background: "linear-gradient(90deg, hsl(var(--primary)/.7), hsl(var(--secondary)/.7))", boxShadow: "var(--neon-glow)" }} />
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
