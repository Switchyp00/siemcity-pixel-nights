import type { AvatarConfig } from "../models";

// Modular pixel-art avatar library. Every part is pure data: [x, y, w, h, colorKey].
// Canvas is 16 wide x 24 tall. colorKey: "skin" | "hair" | "top" | "bottom" | "shoe" | literal hex.
export type Px = [number, number, number, number, string];
export interface PartOption { id: string; name: string; px: Px[] }

export const SKIN_TONES = [
  { id: "s1", name: "Porcelain", color: "#fbe3d2" }, { id: "s2", name: "Ivory", color: "#f6d7c3" },
  { id: "s3", name: "Shell", color: "#f0c9ab" }, { id: "s4", name: "Sand", color: "#e6b98f" },
  { id: "s5", name: "Honey", color: "#dca877" }, { id: "s6", name: "Golden", color: "#d19a63" },
  { id: "s7", name: "Amber", color: "#c98c5a" }, { id: "s8", name: "Caramel", color: "#b87a4c" },
  { id: "s9", name: "Bronze", color: "#a96b41" }, { id: "s10", name: "Chestnut", color: "#99603c" },
  { id: "s11", name: "Umber", color: "#8d5a3b" }, { id: "s12", name: "Cocoa", color: "#7a4a30" },
  { id: "s13", name: "Mahogany", color: "#6b3f28" }, { id: "s14", name: "Ebony", color: "#5a3826" },
  { id: "s15", name: "Onyx", color: "#452a1d" }, { id: "s16", name: "Synth Mint", color: "#9fd8c8" },
  { id: "s17", name: "Synth Lilac", color: "#c3b0e8" }, { id: "s18", name: "Synth Rose", color: "#f2b6c6" },
  { id: "s19", name: "Chrome", color: "#c2cbd6" }, { id: "s20", name: "Circuit Green", color: "#8fbf7a" },
];

export const PALETTE = [
  "#1b1b2f", "#2f2f45", "#f1f1f1", "#9aa3b2", "#6b4226", "#a9744a", "#e8c37a", "#ffd166",
  "#e94560", "#ff8fab", "#c2185b", "#7b5cff", "#b48cff", "#4cc9f0", "#2f80ed", "#00ff9c",
  "#2d8a4e", "#ff7a2f", "#00e5d0", "#8d2fd1",
];

const body: Px[] = [
  [5, 2, 6, 7, "skin"], [7, 9, 2, 1, "skin"],
  [3, 10, 2, 6, "skin"], [11, 10, 2, 6, "skin"],
  [5, 18, 2, 4, "skin"], [9, 18, 2, 4, "skin"],
];

// Helper builders keep the library readable.
const eyes = (c: string, y = 5, h = 1, w = 1): Px[] => [[6, y, w, h, c], [10 - w, y, w, h, c]];
const brow = (y: number, x: number, w: number): Px[] => [[x, y, w, 1, "hair"], [16 - x - w, y, w, 1, "hair"]];

export const PARTS: Record<"face" | "eyes" | "brows" | "nose" | "mouth" | "hair" | "top" | "bottom" | "shoes" | "accessory", PartOption[]> = {
  face: [
    { id: "f1", name: "Oval", px: [] },
    { id: "f2", name: "Round", px: [[4, 4, 1, 4, "skin"], [11, 4, 1, 4, "skin"]] },
    { id: "f3", name: "Square", px: [[4, 3, 1, 6, "skin"], [11, 3, 1, 6, "skin"], [5, 9, 6, 1, "skin"]] },
    { id: "f4", name: "Heart", px: [[4, 3, 1, 3, "skin"], [11, 3, 1, 3, "skin"], [6, 9, 4, 1, "skin"]] },
    { id: "f5", name: "Long", px: [[5, 9, 6, 1, "skin"]] },
    { id: "f6", name: "Narrow", px: [[6, 2, 4, 1, "#00000022"]] },
    { id: "f7", name: "Soft Jaw", px: [[5, 9, 6, 1, "skin"], [6, 10, 4, 1, "skin"]] },
    { id: "f8", name: "Angular", px: [[4, 5, 1, 3, "skin"], [11, 5, 1, 3, "skin"]] },
    { id: "f9", name: "Freckled", px: [[6, 7, 1, 1, "#00000022"], [9, 7, 1, 1, "#00000022"]] },
    { id: "f10", name: "Scarred", px: [[10, 4, 1, 3, "#b86a5a"]] },
    { id: "f11", name: "Cheeky", px: [[5, 6, 1, 2, "#ff8fab"], [10, 6, 1, 2, "#ff8fab"]] },
    { id: "f12", name: "Chiseled", px: [[5, 8, 1, 1, "#00000033"], [10, 8, 1, 1, "#00000033"]] },
    { id: "f13", name: "Visor Line", px: [[5, 3, 6, 1, "#00000022"]] },
    { id: "f14", name: "Tattooed", px: [[11, 5, 1, 2, "#7b5cff"]] },
    { id: "f15", name: "Cyber Plate", px: [[4, 4, 1, 4, "#9aa3b2"], [4, 5, 1, 1, "#4cc9f0"]] },
  ],
  eyes: [
    { id: "e1", name: "Dot", px: eyes("#111") },
    { id: "e2", name: "Wide", px: eyes("#111", 5, 2) },
    { id: "e3", name: "Tall", px: eyes("#111", 4, 3) },
    { id: "e4", name: "Sleepy", px: [[6, 6, 2, 1, "#111"], [8, 6, 2, 1, "#111"]] },
    { id: "e5", name: "Neon Green", px: eyes("#00ff9c") },
    { id: "e6", name: "Neon Cyan", px: eyes("#4cc9f0", 5, 2) },
    { id: "e7", name: "Violet", px: eyes("#b48cff", 5, 2) },
    { id: "e8", name: "Amber", px: eyes("#ffd166", 5, 2) },
    { id: "e9", name: "Ocean", px: eyes("#2f80ed", 5, 2) },
    { id: "e10", name: "Emerald", px: eyes("#2d8a4e", 5, 2) },
    { id: "e11", name: "Winking", px: [[6, 5, 1, 2, "#111"], [9, 6, 2, 1, "#111"]] },
    { id: "e12", name: "Glitch", px: [[6, 5, 1, 1, "#00ff9c"], [9, 5, 1, 1, "#e94560"]] },
    { id: "e13", name: "Wide Shine", px: [...eyes("#111", 5, 2), [6, 5, 1, 1, "#f1f1f1"] as Px] },
    { id: "e14", name: "Narrow", px: [[6, 5, 2, 1, "#111"], [8, 5, 2, 1, "#111"]] },
    { id: "e15", name: "Determined", px: [[6, 5, 1, 2, "#111"], [9, 5, 1, 2, "#111"], [5, 4, 2, 1, "#00000055"], [9, 4, 2, 1, "#00000055"]] },
    { id: "e16", name: "Scanner", px: [[5, 5, 6, 1, "#e94560"]] },
    { id: "e17", name: "Starry", px: [...eyes("#b48cff", 5, 2), [6, 6, 1, 1, "#f1f1f1"] as Px, [9, 6, 1, 1, "#f1f1f1"] as Px] },
    { id: "e18", name: "Heterochrome", px: [[6, 5, 1, 2, "#4cc9f0"], [9, 5, 1, 2, "#ffd166"]] },
    { id: "e19", name: "Closed", px: [[6, 6, 1, 1, "#111"], [9, 6, 1, 1, "#111"], [5, 5, 1, 1, "#111"], [10, 5, 1, 1, "#111"]] },
    { id: "e20", name: "Optic Implant", px: [[6, 5, 1, 2, "#111"], [9, 4, 2, 3, "#9aa3b2"], [9, 5, 1, 1, "#e94560"]] },
  ],
  brows: [
    { id: "b1", name: "None", px: [] },
    { id: "b2", name: "Flat", px: brow(4, 6, 1) },
    { id: "b3", name: "Bold", px: brow(4, 5, 2) },
    { id: "b4", name: "Thick", px: [...brow(3, 5, 2), ...brow(4, 5, 2)] },
    { id: "b5", name: "Arched", px: [[5, 4, 1, 1, "hair"], [6, 3, 1, 1, "hair"], [9, 3, 1, 1, "hair"], [10, 4, 1, 1, "hair"]] },
    { id: "b6", name: "Angry", px: [[5, 3, 1, 1, "hair"], [6, 4, 1, 1, "hair"], [9, 4, 1, 1, "hair"], [10, 3, 1, 1, "hair"]] },
    { id: "b7", name: "Worried", px: [[5, 4, 1, 1, "hair"], [6, 3, 1, 1, "hair"], [9, 4, 1, 1, "hair"], [10, 3, 1, 1, "hair"]] },
    { id: "b8", name: "Thin", px: [[6, 4, 1, 0.5, "hair"], [9, 4, 1, 0.5, "hair"]] },
    { id: "b9", name: "Slit", px: [...brow(4, 5, 2), [6, 4, 0.5, 1, "skin"] as Px] },
    { id: "b10", name: "Unibrow", px: [[5, 4, 6, 1, "hair"]] },
    { id: "b11", name: "Pierced", px: [...brow(4, 5, 2), [5, 3, 1, 1, "#ffd166"] as Px] },
    { id: "b12", name: "Short", px: brow(4, 6, 1) },
    { id: "b13", name: "Feathered", px: [[5, 4, 1, 1, "hair"], [7, 4, 1, 1, "hair"], [8, 4, 1, 1, "hair"], [10, 4, 1, 1, "hair"]] },
    { id: "b14", name: "Neon", px: [[5, 4, 2, 1, "#00ff9c"], [9, 4, 2, 1, "#00ff9c"]] },
    { id: "b15", name: "High", px: brow(3, 5, 2) },
  ],
  nose: [
    { id: "n1", name: "None", px: [] },
    { id: "n2", name: "Dot", px: [[8, 6, 1, 1, "#00000033"]] },
    { id: "n3", name: "Small", px: [[8, 6, 1, 1, "#00000044"]] },
    { id: "n4", name: "Long", px: [[8, 5, 1, 2, "#00000033"]] },
    { id: "n5", name: "Wide", px: [[7, 6, 2, 1, "#00000033"]] },
    { id: "n6", name: "Button", px: [[8, 6, 1, 1, "#ff8fab"]] },
    { id: "n7", name: "Hooked", px: [[8, 5, 1, 1, "#00000033"], [7, 6, 1, 1, "#00000033"]] },
    { id: "n8", name: "Flat", px: [[7, 6, 3, 0.5, "#00000033"]] },
    { id: "n9", name: "Upturned", px: [[8, 6, 1, 1, "#00000022"], [8, 5, 1, 1, "#00000011"]] },
    { id: "n10", name: "Pointed", px: [[8, 6, 0.5, 1, "#00000044"]] },
    { id: "n11", name: "Pierced", px: [[8, 6, 1, 1, "#00000033"], [9, 6, 1, 1, "#ffd166"]] },
    { id: "n12", name: "Freckled", px: [[8, 6, 1, 1, "#00000033"], [7, 6, 1, 1, "#c98c5a"], [9, 6, 1, 1, "#c98c5a"]] },
    { id: "n13", name: "Shadowed", px: [[8, 5, 1, 2, "#00000055"]] },
    { id: "n14", name: "Chrome Stud", px: [[8, 6, 1, 1, "#9aa3b2"]] },
    { id: "n15", name: "Soft", px: [[8, 6, 1, 0.5, "#00000022"]] },
  ],
  mouth: [
    { id: "m1", name: "Smile", px: [[7, 7, 2, 1, "#7a2e2e"]] },
    { id: "m2", name: "Wide Smile", px: [[6, 7, 4, 1, "#7a2e2e"]] },
    { id: "m3", name: "Grin", px: [[6, 7, 4, 1, "#3a1010"], [6, 7, 4, 0.5, "#f1f1f1"]] },
    { id: "m4", name: "Open", px: [[7, 7, 2, 2, "#3a1010"]] },
    { id: "m5", name: "Smirk", px: [[8, 7, 2, 1, "#7a2e2e"]] },
    { id: "m6", name: "Frown", px: [[7, 8, 2, 1, "#7a2e2e"], [6, 7, 1, 1, "#7a2e2e"], [9, 7, 1, 1, "#7a2e2e"]] },
    { id: "m7", name: "Neutral", px: [[7, 7, 2, 0.5, "#7a2e2e"]] },
    { id: "m8", name: "Pout", px: [[7, 7, 2, 1, "#e94560"]] },
    { id: "m9", name: "Lipstick", px: [[6, 7, 4, 1, "#c2185b"]] },
    { id: "m10", name: "Tongue Out", px: [[7, 7, 2, 1, "#3a1010"], [8, 8, 1, 1, "#ff8fab"]] },
    { id: "m11", name: "Fanged", px: [[6, 7, 4, 1, "#3a1010"], [7, 8, 1, 1, "#f1f1f1"]] },
    { id: "m12", name: "Whistle", px: [[8, 7, 1, 1, "#3a1010"]] },
    { id: "m13", name: "Mustache", px: [[6, 6, 4, 1, "hair"], [7, 7, 2, 1, "#7a2e2e"]] },
    { id: "m14", name: "Goatee", px: [[7, 7, 2, 1, "#7a2e2e"], [7, 8, 2, 2, "hair"]] },
    { id: "m15", name: "Full Beard", px: [[5, 6, 6, 4, "hair"], [7, 7, 2, 1, "#7a2e2e"]] },
    { id: "m16", name: "Stubble", px: [[5, 7, 6, 2, "#00000033"], [7, 7, 2, 1, "#7a2e2e"]] },
    { id: "m17", name: "Face Mask", px: [[5, 6, 6, 4, "#2f2f45"], [5, 6, 6, 1, "#4cc9f0"]] },
    { id: "m18", name: "Respirator", px: [[5, 6, 6, 3, "#9aa3b2"], [7, 7, 2, 1, "#2f2f45"]] },
    { id: "m19", name: "Gritted", px: [[6, 7, 4, 1, "#f1f1f1"], [7, 7, 0.5, 1, "#9aa3b2"]] },
    { id: "m20", name: "Neon Lips", px: [[6, 7, 4, 1, "#00e5d0"]] },
  ],
  hair: [
    { id: "h1", name: "Bald", px: [] },
    { id: "h2", name: "Buzz", px: [[5, 1, 6, 1, "hair"], [4, 2, 1, 2, "hair"], [11, 2, 1, 2, "hair"]] },
    { id: "h3", name: "Short", px: [[5, 1, 6, 2, "hair"], [4, 2, 1, 2, "hair"], [11, 2, 1, 2, "hair"]] },
    { id: "h4", name: "Side Part", px: [[5, 1, 6, 2, "hair"], [4, 2, 1, 3, "hair"], [9, 1, 3, 1, "hair"]] },
    { id: "h5", name: "Spiky", px: [[5, 1, 6, 2, "hair"], [5, 0, 1, 1, "hair"], [7, 0, 1, 1, "hair"], [9, 0, 1, 1, "hair"]] },
    { id: "h6", name: "Tall Spikes", px: [[5, 1, 6, 2, "hair"], [5, -1, 1, 2, "hair"], [7, -2, 1, 3, "hair"], [9, -1, 1, 2, "hair"]] },
    { id: "h7", name: "Mohawk", px: [[7, -2, 2, 5, "hair"]] },
    { id: "h8", name: "Long", px: [[5, 1, 6, 2, "hair"], [4, 2, 1, 8, "hair"], [11, 2, 1, 8, "hair"]] },
    { id: "h9", name: "Very Long", px: [[5, 1, 6, 2, "hair"], [4, 2, 1, 12, "hair"], [11, 2, 1, 12, "hair"]] },
    { id: "h10", name: "Ponytail", px: [[5, 1, 6, 2, "hair"], [4, 2, 1, 2, "hair"], [11, 2, 1, 2, "hair"], [12, 3, 1, 6, "hair"]] },
    { id: "h11", name: "Twin Buns", px: [[5, 1, 6, 2, "hair"], [3, 0, 2, 2, "hair"], [11, 0, 2, 2, "hair"]] },
    { id: "h12", name: "Top Bun", px: [[5, 1, 6, 2, "hair"], [7, -1, 2, 2, "hair"]] },
    { id: "h13", name: "Bob", px: [[5, 1, 6, 2, "hair"], [4, 2, 1, 5, "hair"], [11, 2, 1, 5, "hair"]] },
    { id: "h14", name: "Curly Afro", px: [[4, 0, 8, 3, "hair"], [3, 1, 1, 3, "hair"], [12, 1, 1, 3, "hair"]] },
    { id: "h15", name: "Dreads", px: [[5, 1, 6, 2, "hair"], [4, 2, 1, 9, "hair"], [11, 2, 1, 9, "hair"], [3, 3, 1, 6, "hair"], [12, 3, 1, 6, "hair"]] },
    { id: "h16", name: "Undercut", px: [[5, 1, 6, 2, "hair"], [6, 3, 4, 1, "hair"]] },
    { id: "h17", name: "Swoop", px: [[5, 1, 6, 2, "hair"], [10, 2, 2, 2, "hair"], [4, 2, 1, 1, "hair"]] },
    { id: "h18", name: "Pigtails", px: [[5, 1, 6, 2, "hair"], [3, 3, 1, 5, "hair"], [12, 3, 1, 5, "hair"]] },
    { id: "h19", name: "Wild", px: [[4, 0, 8, 3, "hair"], [3, 1, 1, 2, "hair"], [12, 1, 1, 2, "hair"], [5, -1, 1, 1, "hair"], [10, -1, 1, 1, "hair"]] },
    { id: "h20", name: "Fringe", px: [[5, 1, 6, 2, "hair"], [5, 3, 6, 1, "hair"], [4, 2, 1, 3, "hair"], [11, 2, 1, 3, "hair"]] },
  ],
  top: [
    { id: "t1", name: "Tee", px: [[5, 10, 6, 6, "top"], [3, 10, 2, 2, "top"], [11, 10, 2, 2, "top"]] },
    { id: "t2", name: "Long Tee", px: [[5, 10, 6, 7, "top"], [3, 10, 2, 3, "top"], [11, 10, 2, 3, "top"]] },
    { id: "t3", name: "Tank Top", px: [[6, 10, 4, 6, "top"]] },
    { id: "t4", name: "Crop Top", px: [[5, 10, 6, 3, "top"], [3, 10, 2, 2, "top"], [11, 10, 2, 2, "top"]] },
    { id: "t5", name: "Hoodie", px: [[4, 9, 8, 7, "top"], [3, 10, 2, 6, "top"], [11, 10, 2, 6, "top"], [7, 12, 2, 2, "#00000044"]] },
    { id: "t6", name: "Zip Hoodie", px: [[4, 9, 8, 7, "top"], [3, 10, 2, 6, "top"], [11, 10, 2, 6, "top"], [7, 10, 1, 6, "#00000055"]] },
    { id: "t7", name: "Bomber", px: [[5, 10, 6, 6, "top"], [3, 10, 2, 6, "top"], [11, 10, 2, 6, "top"], [5, 15, 6, 1, "#00000055"]] },
    { id: "t8", name: "Leather Jacket", px: [[5, 10, 6, 7, "top"], [3, 10, 2, 6, "top"], [11, 10, 2, 6, "top"], [6, 10, 1, 7, "#00000066"], [9, 10, 1, 7, "#00000066"]] },
    { id: "t9", name: "Denim Jacket", px: [[5, 10, 6, 7, "top"], [3, 10, 2, 6, "top"], [11, 10, 2, 6, "top"], [7, 10, 2, 7, "#00000033"], [5, 12, 6, 0.5, "#ffffff22"]] },
    { id: "t10", name: "Trench Coat", px: [[5, 10, 6, 10, "top"], [3, 10, 2, 8, "top"], [11, 10, 2, 8, "top"], [8, 10, 1, 10, "#00000044"]] },
    { id: "t11", name: "Puffer", px: [[4, 10, 8, 7, "top"], [3, 10, 2, 6, "top"], [11, 10, 2, 6, "top"], [4, 12, 8, 0.5, "#00000033"], [4, 14, 8, 0.5, "#00000033"]] },
    { id: "t12", name: "Blazer", px: [[5, 10, 6, 7, "top"], [3, 10, 2, 6, "top"], [11, 10, 2, 6, "top"], [7, 10, 2, 7, "#f1f1f1"]] },
    { id: "t13", name: "Lab Coat", px: [[5, 10, 6, 9, "#f1f1f1"], [3, 10, 2, 7, "#f1f1f1"], [11, 10, 2, 7, "#f1f1f1"], [8, 10, 0.5, 9, "#9aa3b2"]] },
    { id: "t14", name: "Tactical Vest", px: [[5, 10, 6, 6, "top"], [3, 10, 2, 6, "skin"], [11, 10, 2, 6, "skin"], [5, 12, 6, 1, "#2f2f45"], [6, 11, 1, 1, "#00ff9c"]] },
    { id: "t15", name: "Striped Tee", px: [[5, 10, 6, 6, "top"], [3, 10, 2, 2, "top"], [11, 10, 2, 2, "top"], [5, 11, 6, 1, "#f1f1f1"], [5, 13, 6, 1, "#f1f1f1"]] },
    { id: "t16", name: "Logo Tee", px: [[5, 10, 6, 6, "top"], [3, 10, 2, 2, "top"], [11, 10, 2, 2, "top"], [7, 12, 2, 2, "#00ff9c"]] },
    { id: "t17", name: "Turtleneck", px: [[5, 9, 6, 7, "top"], [3, 10, 2, 6, "top"], [11, 10, 2, 6, "top"], [6, 8, 4, 1, "top"]] },
    { id: "t18", name: "Mesh Top", px: [[5, 10, 6, 6, "top"], [6, 11, 1, 1, "skin"], [8, 12, 1, 1, "skin"], [7, 14, 1, 1, "skin"]] },
    { id: "t19", name: "Neon Jacket", px: [[5, 10, 6, 7, "top"], [3, 10, 2, 6, "top"], [11, 10, 2, 6, "top"], [5, 10, 6, 0.5, "#00e5d0"], [5, 16, 6, 0.5, "#00e5d0"]] },
    { id: "t20", name: "Overalls", px: [[5, 10, 6, 8, "top"], [6, 9, 1, 2, "top"], [9, 9, 1, 2, "top"], [7, 12, 2, 2, "#00000033"]] },
  ],
  bottom: [
    { id: "p1", name: "Pants", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 4, "bottom"], [9, 18, 2, 4, "bottom"]] },
    { id: "p2", name: "Slim Jeans", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 4, "bottom"], [9, 18, 2, 4, "bottom"], [6, 19, 0.5, 3, "#ffffff22"]] },
    { id: "p3", name: "Baggy Pants", px: [[4, 16, 8, 3, "bottom"], [4, 19, 3, 3, "bottom"], [9, 19, 3, 3, "bottom"]] },
    { id: "p4", name: "Cargo", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 4, "bottom"], [9, 18, 2, 4, "bottom"], [5, 19, 1, 1, "#00000055"], [10, 19, 1, 1, "#00000055"]] },
    { id: "p5", name: "Shorts", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 1, "bottom"], [9, 18, 2, 1, "bottom"]] },
    { id: "p6", name: "Long Shorts", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 2, "bottom"], [9, 18, 2, 2, "bottom"]] },
    { id: "p7", name: "Skirt", px: [[4, 16, 8, 3, "bottom"]] },
    { id: "p8", name: "Long Skirt", px: [[4, 16, 8, 5, "bottom"]] },
    { id: "p9", name: "Ripped Jeans", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 4, "bottom"], [9, 18, 2, 4, "bottom"], [5, 19, 1, 1, "skin"], [10, 20, 1, 1, "skin"]] },
    { id: "p10", name: "Joggers", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 3, "bottom"], [9, 18, 2, 3, "bottom"], [5, 21, 2, 1, "#00000055"], [9, 21, 2, 1, "#00000055"]] },
    { id: "p11", name: "Leggings", px: [[5, 16, 6, 2, "bottom"], [5.5, 18, 1.5, 4, "bottom"], [9, 18, 1.5, 4, "bottom"]] },
    { id: "p12", name: "Utility Pants", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 4, "bottom"], [9, 18, 2, 4, "bottom"], [5, 17, 6, 0.5, "#ffd166"]] },
    { id: "p13", name: "Neon Trim", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 4, "bottom"], [9, 18, 2, 4, "bottom"], [5, 18, 0.5, 4, "#00e5d0"], [10.5, 18, 0.5, 4, "#00e5d0"]] },
    { id: "p14", name: "Pleated", px: [[4, 16, 8, 3, "bottom"], [6, 16, 0.5, 3, "#00000033"], [9, 16, 0.5, 3, "#00000033"]] },
    { id: "p15", name: "Armored", px: [[5, 16, 6, 2, "bottom"], [5, 18, 2, 4, "bottom"], [9, 18, 2, 4, "bottom"], [5, 19, 2, 1, "#9aa3b2"], [9, 19, 2, 1, "#9aa3b2"]] },
  ],
  shoes: [
    { id: "sh1", name: "Sneakers", px: [[4, 22, 3, 1, "#f1f1f1"], [9, 22, 3, 1, "#f1f1f1"]] },
    { id: "sh2", name: "High Tops", px: [[4, 21, 3, 2, "#f1f1f1"], [9, 21, 3, 2, "#f1f1f1"]] },
    { id: "sh3", name: "Runners", px: [[4, 22, 3, 1, "#e94560"], [9, 22, 3, 1, "#e94560"]] },
    { id: "sh4", name: "Neon Kicks", px: [[4, 22, 3, 1, "#00ff9c"], [9, 22, 3, 1, "#7b5cff"]] },
    { id: "sh5", name: "Boots", px: [[4, 21, 3, 2, "#2a1d14"], [9, 21, 3, 2, "#2a1d14"]] },
    { id: "sh6", name: "Combat Boots", px: [[4, 20, 3, 3, "#1b1b2f"], [9, 20, 3, 3, "#1b1b2f"]] },
    { id: "sh7", name: "Chunky Boots", px: [[3, 20, 4, 3, "#2f2f45"], [9, 20, 4, 3, "#2f2f45"]] },
    { id: "sh8", name: "Loafers", px: [[4, 22, 3, 1, "#6b4226"], [9, 22, 3, 1, "#6b4226"]] },
    { id: "sh9", name: "Sandals", px: [[4, 22, 3, 0.5, "#a9744a"], [9, 22, 3, 0.5, "#a9744a"]] },
    { id: "sh10", name: "Barefoot", px: [] },
    { id: "sh11", name: "Platform", px: [[4, 21, 3, 2, "#2f2f45"], [9, 21, 3, 2, "#2f2f45"], [4, 22, 3, 1, "#b48cff"], [9, 22, 3, 1, "#b48cff"]] },
    { id: "sh12", name: "Cyber Greaves", px: [[4, 20, 3, 3, "#9aa3b2"], [9, 20, 3, 3, "#9aa3b2"], [4, 21, 3, 0.5, "#4cc9f0"], [9, 21, 3, 0.5, "#4cc9f0"]] },
    { id: "sh13", name: "Slippers", px: [[4, 22, 3, 1, "#ff8fab"], [9, 22, 3, 1, "#ff8fab"]] },
    { id: "sh14", name: "Skate Shoes", px: [[4, 22, 3, 1, "#1b1b2f"], [9, 22, 3, 1, "#1b1b2f"], [4, 22, 3, 0.4, "#f1f1f1"], [9, 22, 3, 0.4, "#f1f1f1"]] },
    { id: "sh15", name: "Gold Kicks", px: [[4, 22, 3, 1, "#ffd166"], [9, 22, 3, 1, "#ffd166"]] },
  ],
  accessory: [
    { id: "a1", name: "None", px: [] },
    { id: "a2", name: "Visor", px: [[5, 5, 6, 1, "#4cc9f0"]] },
    { id: "a3", name: "Red Visor", px: [[4, 4, 8, 2, "#2f2f45"], [5, 5, 6, 1, "#e94560"]] },
    { id: "a4", name: "Glasses", px: [[5, 5, 2, 1, "#111"], [9, 5, 2, 1, "#111"], [7, 5, 2, 1, "#555"]] },
    { id: "a5", name: "Sunglasses", px: [[4, 4, 8, 2, "#111"]] },
    { id: "a6", name: "Headset", px: [[4, 3, 1, 4, "#222"], [11, 3, 1, 4, "#222"], [5, 1, 6, 1, "#222"], [3, 6, 1, 2, "#00ff9c"]] },
    { id: "a7", name: "Headphones", px: [[3, 3, 2, 4, "#7b5cff"], [11, 3, 2, 4, "#7b5cff"], [5, 0, 6, 1, "#7b5cff"]] },
    { id: "a8", name: "Cap", px: [[4, 0, 8, 2, "#2f80ed"], [3, 2, 6, 1, "#2f80ed"]] },
    { id: "a9", name: "Backwards Cap", px: [[4, 0, 8, 2, "#e94560"], [10, 2, 4, 1, "#e94560"]] },
    { id: "a10", name: "Beanie", px: [[4, 0, 8, 3, "#2d8a4e"], [4, 2, 8, 1, "#1f6d3a"]] },
    { id: "a11", name: "Hood Up", px: [[3, 0, 10, 5, "#1b1b2f"], [5, 2, 6, 5, "skin"]] },
    { id: "a12", name: "Bandana", px: [[4, 2, 8, 1, "#e94560"], [12, 2, 1, 4, "#e94560"]] },
    { id: "a13", name: "Face Scarf", px: [[5, 6, 6, 3, "#2f2f45"]] },
    { id: "a14", name: "Earrings", px: [[4, 6, 1, 1, "#ffd166"], [11, 6, 1, 1, "#ffd166"]] },
    { id: "a15", name: "Hoop Earrings", px: [[3, 6, 1, 2, "#ffd166"], [12, 6, 1, 2, "#ffd166"]] },
    { id: "a16", name: "SOC Badge", px: [[9, 11, 2, 2, "#ffd166"]] },
    { id: "a17", name: "Lanyard", px: [[7, 10, 0.5, 3, "#4cc9f0"], [9, 10, 0.5, 3, "#4cc9f0"], [7, 13, 2, 2, "#f1f1f1"]] },
    { id: "a18", name: "Backpack", px: [[2, 11, 1, 5, "#2f2f45"], [13, 11, 1, 5, "#2f2f45"]] },
    { id: "a19", name: "Scarf", px: [[5, 9, 6, 1, "#e94560"], [10, 10, 1, 4, "#e94560"]] },
    { id: "a20", name: "Cyber Halo", px: [[4, -2, 8, 0.6, "#00e5d0"]] },
  ],
};

export const BODY_PX = body;
export const CATEGORY_COUNT = Object.values(PARTS).reduce((n, v) => n + v.length, 0) + SKIN_TONES.length;

export const DEFAULT_AVATAR: AvatarConfig = {
  body: "s4", face: "f1", eyes: "e1", brows: "b2", nose: "n2", mouth: "m1",
  hair: "h3", hairColor: "#1b1b2f",
  top: "t5", topColor: "#7b5cff",
  bottom: "p1", bottomColor: "#2f2f45",
  shoes: "sh1", shoeColor: "#f1f1f1", accessory: "a1",
};

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

export function randomAvatar(): AvatarConfig {
  return {
    body: pick(SKIN_TONES).id, face: pick(PARTS.face).id,
    eyes: pick(PARTS.eyes).id, brows: pick(PARTS.brows).id, nose: pick(PARTS.nose).id, mouth: pick(PARTS.mouth).id,
    hair: pick(PARTS.hair).id, hairColor: pick(PALETTE),
    top: pick(PARTS.top).id, topColor: pick(PALETTE),
    bottom: pick(PARTS.bottom).id, bottomColor: pick(PALETTE),
    shoes: pick(PARTS.shoes).id, shoeColor: pick(PALETTE), accessory: pick(PARTS.accessory).id,
  };
}

// Older saved avatars used a smaller library; map them onto the new ids so nothing resets.
const LEGACY: Record<string, string> = {
  dot: "e1", wide: "e2", glow: "e5", sleepy: "e4",
  none: "b1", flat: "b2", bold: "b3",
  smile: "m1", open: "m4", smirk: "m5",
  bald: "h1", short: "h3", long: "h8", spike: "h5", bun: "h12", mohawk: "h7",
  tee: "t1", hoodie: "t5", jacket: "t8",
  pants: "p1", shorts: "p5", cargo: "p4",
  sneaker: "sh1", boots: "sh5", neon: "sh4",
  visor: "a2", headset: "a6", glasses: "a4", badge: "a16",
};
const has = (cat: keyof typeof PARTS, id?: string) => !!id && PARTS[cat].some((o) => o.id === id);

export function migrateAvatar(a: Partial<AvatarConfig> | null | undefined): AvatarConfig {
  if (!a) return DEFAULT_AVATAR;
  const fix = (cat: keyof typeof PARTS, v?: string) =>
    has(cat, v) ? v! : has(cat, LEGACY[v ?? ""]) ? LEGACY[v!] : DEFAULT_AVATAR[cat as keyof AvatarConfig] as string;
  return {
    body: SKIN_TONES.some((s) => s.id === a.body) ? a.body! : DEFAULT_AVATAR.body,
    face: fix("face", a.face), eyes: fix("eyes", a.eyes), brows: fix("brows", a.brows),
    nose: fix("nose", a.nose), mouth: fix("mouth", a.mouth), hair: fix("hair", a.hair),
    hairColor: a.hairColor ?? DEFAULT_AVATAR.hairColor,
    top: fix("top", a.top), topColor: a.topColor ?? DEFAULT_AVATAR.topColor,
    bottom: fix("bottom", a.bottom), bottomColor: a.bottomColor ?? DEFAULT_AVATAR.bottomColor,
    shoes: fix("shoes", a.shoes), shoeColor: a.shoeColor ?? DEFAULT_AVATAR.shoeColor,
    accessory: fix("accessory", a.accessory),
  };
}
