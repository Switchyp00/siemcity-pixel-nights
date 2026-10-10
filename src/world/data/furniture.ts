import type { FurnitureDef, PlacedFurniture } from "../models";

// Furniture catalog. Add items here; art lives in FurnitureSprite keyed by id.
const BASE: FurnitureDef[] = [
  { id: "bed", name: "Bunk Bed", w: 2, h: 3, starter: true },
  { id: "desk", name: "Desk", w: 2, h: 1, starter: true },
  { id: "crt", name: "CRT Terminal", w: 1, h: 1, starter: true },
  { id: "rack", name: "Server Rack", w: 1, h: 1, starter: true },
  { id: "chair", name: "Chair", w: 1, h: 1, starter: true },
  { id: "plant", name: "Plant", w: 1, h: 1, starter: true },
  { id: "lamp", name: "Neon Lamp", w: 1, h: 1, starter: true },
  { id: "rug", name: "Rug", w: 3, h: 2, starter: true },
  { id: "couch", name: "Neon Couch", w: 2, h: 1, starter: true },
  { id: "monitors", name: "Triple Monitors", w: 2, h: 1, starter: true },
  { id: "shelf", name: "Shelf", w: 2, h: 1, starter: true },
  { id: "poster", name: "Poster", w: 1, h: 1, starter: true },
];

// Style variants share base art with a tint. Add a row here to add a new style.
const STYLES: [string, string, number][] = [["neon", "Neon", 0], ["teal", "Teal", 210], ["ember", "Ember", 140], ["midnight", "Midnight", 60]];
const CATS: Record<string, string> = { bed: "bed", desk: "desk", chair: "chair", crt: "computer", monitors: "computer", couch: "seating",
  lamp: "lighting", plant: "decor", poster: "decor", shelf: "decor", rack: "tech", rug: "floor" };
export const FURNITURE: FurnitureDef[] = [
  ...BASE.map((b) => ({ ...b, category: CATS[b.id], style: "Classic", collection: "starter", price: 0 })),
  ...BASE.filter((b) => ["bed", "chair", "lamp", "couch", "rug", "desk"].includes(b.id)).flatMap((b) =>
    STYLES.slice(1).map(([k, label, hue]) => ({ ...b, id: `${b.id}_${k}`, name: `${label} ${b.name}`, art: b.id, hue,
      category: CATS[b.id], style: label, collection: "starter", price: 0, starter: false }))),
];
export const artOf = (id: string) => FURNITURE.find((f) => f.id === id)?.art ?? id;

export const furnitureById = (id: string) => FURNITURE.find((f) => f.id === id)!;

// Spacious default room: only the essentials placed; extras wait in inventory.
export const STARTER_LAYOUT: Omit<PlacedFurniture, "uid">[] = [
  { defId: "bed", x: 0, y: 0, rot: 0 },
  { defId: "desk", x: 4, y: 0, rot: 0 },
  { defId: "crt", x: 4, y: 0, rot: 0 },
  { defId: "chair", x: 4, y: 1, rot: 0 },
  { defId: "lamp", x: 2, y: 0, rot: 0 },
  { defId: "plant", x: 7, y: 7, rot: 0 },
];
export const STARTER_INVENTORY = ["rug", "rack", "poster"];
