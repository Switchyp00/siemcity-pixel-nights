// Core domain models for the SIEMCITY world. Shaped to map 1:1 onto future Cloud tables.

export type AvatarCategory =
  | "body" | "face" | "eyes" | "brows" | "nose" | "mouth" | "hair" | "top" | "bottom" | "shoes" | "accessory";

export interface AvatarConfig {
  body: string; face: string; eyes: string; brows: string; nose: string; mouth: string;
  hair: string; hairColor: string;
  top: string; topColor: string;
  bottom: string; bottomColor: string;
  shoes: string; shoeColor: string; accessory: string;
}

export interface Citizen {
  id: string;
  username: string;
  displayName?: string;
  networkAddress: string; // e.g. 192.SC.04.128
  district: number;       // subnet segment, meaningful later
  avatar: AvatarConfig;
  homebaseId: string;
  createdAt: string;
  tutorialDone: boolean;
  bio?: string;
}

export type Rotation = 0 | 1 | 2 | 3;

export interface FurnitureDef {
  id: string;
  name: string;
  w: number; // footprint in tiles at rotation 0
  h: number;
  starter: boolean;
  art?: string;        // base sprite id (defaults to id); lets styles share art
  hue?: number;        // style tint in degrees, applied to the base art
  category?: string;   // bed | desk | chair | computer | seating | lighting | decor | tech | floor
  style?: string;      // e.g. Classic, Neon, Teal, Midnight
  collection?: string; // "starter" now; later "shop", "halloween", "winter"…
  price?: number;      // reserved for the future furniture shop (0 = free)
}

export interface PlacedFurniture {
  uid: string;
  defId: string;
  x: number;
  y: number;
  rot: Rotation;
}

export interface Homebase {
  id: string;
  ownerId: string;
  name: string;
  width: number;
  height: number;
  floor: string;
  placed: PlacedFurniture[];
  inventory: string[]; // furniture defIds stored, not placed
}

export interface SimCitizen {
  id: string; username: string; networkAddress: string; avatar: AvatarConfig;
  status: string; location: string; online: boolean;
}
