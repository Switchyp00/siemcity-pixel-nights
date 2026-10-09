// Core domain models for the SIEMCITY world. Shaped to map 1:1 onto future Cloud tables.

export type AvatarCategory =
  | "body" | "eyes" | "brows" | "mouth" | "hair" | "top" | "bottom" | "shoes" | "accessory";

export interface AvatarConfig {
  body: string; eyes: string; brows: string; mouth: string;
  hair: string; hairColor: string;
  top: string; topColor: string;
  bottom: string; bottomColor: string;
  shoes: string; accessory: string;
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
