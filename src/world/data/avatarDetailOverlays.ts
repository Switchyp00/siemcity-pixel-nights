import type { AvatarConfig } from "../models";
import type { Px } from "./avatarParts";

// Pixel clusters authored for the existing 16 x 24 coordinate system.
// They are optional decorations layered immediately after their corresponding part.
// Keep IDs stable: saved Citizen configurations remain compatible.
type DetailCategory = "hair" | "top" | "bottom" | "shoes";
const DETAIL: Record<DetailCategory, Record<string, Px[]>> = {
  hair: {
    h5: [
      [5, 0, 1, 1, "#ffffff44"], [7, 1, 2, 0.5, "#ffffff55"],
      [10, 1, 1, 1, "#00000055"], [4, 2, 1, 1, "#00000055"],
      [6, 2, 1, 0.5, "#ffffff33"], [9, 0, 1, 0.5, "#ffffff55"],
    ],
  },
  top: {
    t7: [
      // Bomber: dark opening, lapels, zipper, collar, pockets and cuff ribbing.
      [7, 10, 2, 5, "#161522"], [6, 10, 1, 2, "#ffb5b533"],
      [9, 10, 1, 2, "#00000066"], [8, 11, 0.5, 4, "#c6cbd5"],
      [8, 12, 0.5, 0.5, "#f1f1f1"], [5, 11, 1, 1, "#ffffff33"],
      [10, 12, 1, 1, "#00000055"], [5, 13, 2, 0.5, "#10101c"],
      [9, 13, 2, 0.5, "#10101c"], [5, 14, 1, 0.5, "#d5d5e0"],
      [10, 14, 1, 0.5, "#d5d5e0"], [3, 15, 2, 1, "#00000055"],
      [11, 15, 2, 1, "#00000055"], [5, 15, 6, 0.5, "#ffffff33"],
    ],
  },
  bottom: {
    p2: [
      // Jeans: waistband, seams, knees, cuff shadows.
      [5, 17, 6, 0.5, "#00000066"], [8, 17, 0.5, 2, "#ffffff33"],
      [5, 18, 0.5, 3, "#ffffff33"], [10.5, 18, 0.5, 3, "#00000066"],
      [5, 20, 2, 0.5, "#ffffff22"], [9, 20, 2, 0.5, "#ffffff22"],
      [5, 21, 2, 0.5, "#00000066"], [9, 21, 2, 0.5, "#00000066"],
    ],
  },
  shoes: {
    sh2: [
      // High-tops: colored uppers, laces, toe caps and contrasting soles.
      [4, 21, 3, 1, "shoe"], [9, 21, 3, 1, "shoe"],
      [4, 22, 3, 0.5, "#dce8f2"], [9, 22, 3, 0.5, "#dce8f2"],
      [5, 21, 1, 0.5, "#2f2f45"], [10, 21, 1, 0.5, "#2f2f45"],
      [5, 21.5, 1, 0.3, "#f1f1f1"], [10, 21.5, 1, 0.3, "#f1f1f1"],
    ],
  },
};

export function avatarPartDetail(category: DetailCategory | string, id: string): Px[] {
  return DETAIL[category as DetailCategory]?.[id] ?? [];
}

export function hasDetailedClassicLook(avatar: AvatarConfig): boolean {
  return avatar.hair === "h5" && avatar.top === "t7" && avatar.bottom === "p2" && avatar.shoes === "sh2";
}
