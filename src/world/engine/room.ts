// Pure room/grid logic, independent of UI. Future Room Engine builds on this.
import type { Homebase, PlacedFurniture, Rotation } from "../models";
import { furnitureById, artOf } from "../data/furniture";

export const footprint = (p: Pick<PlacedFurniture, "defId" | "rot">) => {
  const d = furnitureById(p.defId);
  return p.rot % 2 === 0 ? { w: d.w, h: d.h } : { w: d.h, h: d.w };
};

// Floor items (rugs) can be overlapped; everything else blocks.
const isFloor = (defId: string) => artOf(defId) === "rug";
const stackable = (a: string, b: string) => { const x = artOf(a), y = artOf(b); return isFloor(a) || isFloor(b) || (x === "crt" && y === "desk") || (x === "desk" && y === "crt"); };

export function canPlace(room: Homebase, item: PlacedFurniture): boolean {
  const { w, h } = footprint(item);
  if (item.x < 0 || item.y < 0 || item.x + w > room.width || item.y + h > room.height) return false;
  return room.placed.every((o) => {
    if (o.uid === item.uid || stackable(o.defId, item.defId)) return true;
    const f = footprint(o);
    return item.x >= o.x + f.w || o.x >= item.x + w || item.y >= o.y + f.h || o.y >= item.y + h;
  });
}

export const nextRot = (r: Rotation): Rotation => ((r + 1) % 4) as Rotation;

export function findFreeSpot(room: Homebase, item: PlacedFurniture): PlacedFurniture | null {
  for (let y = 0; y < room.height; y++)
    for (let x = 0; x < room.width; x++) {
      const t = { ...item, x, y };
      if (canPlace(room, t)) return t;
    }
  return null;
}

export const zOrder = (p: PlacedFurniture) => (isFloor(p.defId) ? 0 : artOf(p.defId) === "crt" ? 50 + p.y : 10 + p.y);
