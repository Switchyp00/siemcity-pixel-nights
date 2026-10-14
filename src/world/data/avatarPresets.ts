import type { AvatarConfig } from "../models";
import { DEFAULT_AVATAR } from "./avatarParts";

// Starting looks only: every category remains freely editable after selection.
// No new persisted field is required, so existing Citizens remain compatible.
export const AVATAR_BASES: { id: string; name: string; tagline: string; avatar: AvatarConfig }[] = [
  { id: "classic", name: "CLASSIC", tagline: "Versatile style", avatar: {
    ...DEFAULT_AVATAR, body: "s4", hair: "h5", hairColor: "#6b4226",
    top: "t7", topColor: "#e94560", bottom: "p2", bottomColor: "#2f2f45", shoes: "sh2",
  } },
  { id: "techwear", name: "TECHWEAR", tagline: "Modern look", avatar: {
    ...DEFAULT_AVATAR, body: "s2", hair: "h18", hairColor: "#ff8fab",
    top: "t4", topColor: "#1b1b2f", bottom: "p4", bottomColor: "#2f2f45",
    shoes: "sh11", shoeColor: "#c2185b", accessory: "a6",
  } },
  { id: "cyber", name: "CYBER", tagline: "Bold aesthetic", avatar: {
    ...DEFAULT_AVATAR, body: "s11", hair: "h15", hairColor: "#2f80ed",
    top: "t5", topColor: "#ffd166", bottom: "p4", bottomColor: "#1b1b2f",
    shoes: "sh4", accessory: "a15",
  } },
  { id: "rogue", name: "ROGUE", tagline: "Edgy style", avatar: {
    ...DEFAULT_AVATAR, body: "s19", hair: "h1", eyes: "e6",
    top: "t6", topColor: "#2f2f45", bottom: "p4", bottomColor: "#2f2f45",
    shoes: "sh6", accessory: "a11",
  } },
];
