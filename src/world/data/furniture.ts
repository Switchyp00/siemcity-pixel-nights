import type { FurnitureDef, PlacedFurniture } from "../models";

// Furniture catalog. Add items here; art lives in FurnitureSprite keyed by id.
export const FURNITURE: FurnitureDef[] = [
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

export const furnitureById = (id: string) => FURNITURE.find((f) => f.id === id)!;

export const STARTER_LAYOUT: Omit<PlacedFurniture, "uid">[] = [
  { defId: "rug", x: 3, y: 4, rot: 0 },
  { defId: "bed", x: 0, y: 0, rot: 0 },
  { defId: "desk", x: 4, y: 0, rot: 0 },
  { defId: "chair", x: 4, y: 1, rot: 0 },
  { defId: "rack", x: 7, y: 0, rot: 0 },
  { defId: "plant", x: 7, y: 7, rot: 0 },
  { defId: "couch", x: 3, y: 7, rot: 0 },
  { defId: "monitors", x: 4, y: 0, rot: 0 },
  { defId: "rack", x: 7, y: 1, rot: 0 },
  { defId: "shelf", x: 2, y: 0, rot: 0 },
];
export const STARTER_INVENTORY = ["lamp", "poster", "crt"];
