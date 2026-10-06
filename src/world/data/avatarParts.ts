import type { AvatarConfig } from "../models";

// Pixel rect: [x, y, w, h, colorKey]. Avatar canvas is 16x24.
// colorKey: "skin" | "hair" | "top" | "bottom" | literal hex.
export type Px = [number, number, number, number, string];
export interface PartOption { id: string; name: string; px: Px[] }

export const SKIN_TONES = [
  { id: "s1", name: "Porcelain", color: "#f6d7c3" },
  { id: "s2", name: "Sand", color: "#e6b98f" },
  { id: "s3", name: "Amber", color: "#c98c5a" },
  { id: "s4", name: "Umber", color: "#8d5a3b" },
  { id: "s5", name: "Ebony", color: "#5a3826" },
  { id: "s6", name: "Synth", color: "#9fd8c8" },
];

export const PALETTE = ["#1b1b2f", "#e94560", "#00ff9c", "#7b5cff", "#ffd166", "#4cc9f0", "#f1f1f1", "#6b4226", "#ff8fab", "#3a3a5a"];

const body: Px[] = [
  [5, 2, 6, 7, "skin"], [7, 9, 2, 1, "skin"], // head + neck
  [3, 10, 2, 6, "skin"], [11, 10, 2, 6, "skin"], // arms
  [5, 18, 2, 4, "skin"], [9, 18, 2, 4, "skin"], // legs
];

export const PARTS: Record<"eyes" | "brows" | "mouth" | "hair" | "top" | "bottom" | "shoes" | "accessory", PartOption[]> = {
  eyes: [
    { id: "dot", name: "Dot", px: [[6, 5, 1, 1, "#111"], [9, 5, 1, 1, "#111"]] },
    { id: "wide", name: "Wide", px: [[6, 5, 1, 2, "#111"], [9, 5, 1, 2, "#111"]] },
    { id: "glow", name: "Glow", px: [[6, 5, 1, 1, "#00ff9c"], [9, 5, 1, 1, "#00ff9c"]] },
    { id: "sleepy", name: "Sleepy", px: [[6, 6, 2, 1, "#111"], [8, 6, 2, 1, "#111"]] },
  ],
  brows: [
    { id: "none", name: "None", px: [] },
    { id: "flat", name: "Flat", px: [[6, 4, 1, 1, "hair"], [9, 4, 1, 1, "hair"]] },
    { id: "bold", name: "Bold", px: [[5, 4, 2, 1, "hair"], [9, 4, 2, 1, "hair"]] },
  ],
  mouth: [
    { id: "smile", name: "Smile", px: [[7, 7, 2, 1, "#7a2e2e"]] },
    { id: "open", name: "Open", px: [[7, 7, 2, 1, "#3a1010"], [7, 8, 2, 0.5, "#3a1010"]] },
    { id: "smirk", name: "Smirk", px: [[8, 7, 2, 1, "#7a2e2e"]] },
  ],
  hair: [
    { id: "bald", name: "None", px: [] },
    { id: "short", name: "Short", px: [[5, 1, 6, 2, "hair"], [5, 3, 1, 1, "hair"], [10, 3, 1, 1, "hair"]] },
    { id: "long", name: "Long", px: [[5, 1, 6, 2, "hair"], [4, 2, 1, 7, "hair"], [11, 2, 1, 7, "hair"]] },
    { id: "spike", name: "Spike", px: [[5, 1, 6, 2, "hair"], [5, 0, 1, 1, "hair"], [7, 0, 1, 1, "hair"], [9, 0, 1, 1, "hair"]] },
    { id: "bun", name: "Bun", px: [[5, 1, 6, 2, "hair"], [7, -1, 2, 2, "hair"]] },
    { id: "mohawk", name: "Mohawk", px: [[7, -1, 2, 4, "hair"]] },
  ],
  top: [
    { id: "tee", name: "Tee", px: [[5, 10, 6, 6, "top"], [3, 10, 2, 2, "top"], [11, 10, 2, 2, "top"]] },
    { id: "hoodie", name: "Hoodie", px: [[4, 9, 8, 7, "top"], [3, 10, 2, 6, "top"], [11, 10, 2, 6, "top"], [7, 12, 2, 2, "#00000044"]] },
    { id: "jacket", name: "Jacket", px: [[5, 10, 6, 7, "top"], [3, 10, 2, 6, "top"], [11, 10, 2, 6, "top"], [7, 10, 2, 7, "#f1f1f1"]] },
  ],
  bottom: [
    { id: "pants", name: "Pants", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 4, "bottom"], [9, 18, 2, 4, "bottom"]] },
    { id: "shorts", name: "Shorts", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 1, "bottom"], [9, 18, 2, 1, "bottom"]] },
    { id: "cargo", name: "Cargo", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 4, "bottom"], [9, 18, 2, 4, "bottom"], [5, 19, 1, 1, "#00000055"], [10, 19, 1, 1, "#00000055"]] },
  ],
  shoes: [
    { id: "sneaker", name: "Sneakers", px: [[4, 22, 3, 1, "#f1f1f1"], [9, 22, 3, 1, "#f1f1f1"]] },
    { id: "boots", name: "Boots", px: [[4, 21, 3, 2, "#2a1d14"], [9, 21, 3, 2, "#2a1d14"]] },
    { id: "neon", name: "Neon Kicks", px: [[4, 22, 3, 1, "#00ff9c"], [9, 22, 3, 1, "#7b5cff"]] },
  ],
  accessory: [
    { id: "none", name: "None", px: [] },
    { id: "visor", name: "Visor", px: [[5, 5, 6, 1, "#4cc9f0"]] },
    { id: "headset", name: "Headset", px: [[4, 3, 1, 4, "#222"], [11, 3, 1, 4, "#222"], [5, 1, 6, 1, "#222"], [3, 6, 1, 2, "#00ff9c"]] },
    { id: "glasses", name: "Glasses", px: [[5, 5, 2, 1, "#111"], [9, 5, 2, 1, "#111"], [7, 5, 2, 1, "#555"]] },
    { id: "badge", name: "SOC Badge", px: [[9, 11, 2, 2, "#ffd166"]] },
  ],
};

export const BODY_PX = body;

export const DEFAULT_AVATAR: AvatarConfig = {
  body: "s2", eyes: "dot", brows: "flat", mouth: "smile",
  hair: "short", hairColor: "#1b1b2f",
  top: "hoodie", topColor: "#7b5cff",
  bottom: "pants", bottomColor: "#3a3a5a",
  shoes: "sneaker", accessory: "none",
};

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

export function randomAvatar(): AvatarConfig {
  return {
    body: pick(SKIN_TONES).id,
    eyes: pick(PARTS.eyes).id, brows: pick(PARTS.brows).id, mouth: pick(PARTS.mouth).id,
    hair: pick(PARTS.hair).id, hairColor: pick(PALETTE),
    top: pick(PARTS.top).id, topColor: pick(PALETTE),
    bottom: pick(PARTS.bottom).id, bottomColor: pick(PALETTE),
    shoes: pick(PARTS.shoes).id, accessory: pick(PARTS.accessory).id,
  };
}
