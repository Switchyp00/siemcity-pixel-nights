import { useId } from "react";
import type { AvatarConfig } from "../models";
import { DEFAULT_AVATAR, PARTS, SKIN_TONES, migrateAvatar } from "../data/avatarParts";
import classicBody from "@/assets/avatars/v2/body-classic.svg";
import classicHair from "@/assets/avatars/v2/hair-h5.svg";
import classicFace from "@/assets/avatars/v2/face-classic.svg";
import classicTop from "@/assets/avatars/v2/top-t7.svg";
import classicBottom from "@/assets/avatars/v2/bottom-p2.svg";
import classicShoes from "@/assets/avatars/v2/shoes-sh2.svg";

/**
 * SIEMCITY v2 pixel avatar. Native art grid: 48 x 72.
 * Every feature is drawn on the same grid; existing saved part IDs are respected.
 * This replaces the 16x24 rectangle renderer (no legacy rendering fallback).
 * SVG rectangles are intentionally pixel-aligned and never interpolated.
 */
type Pixel = [number, number, number, number, string];
const r = (x: number, y: number, w: number, h: number, color: string): Pixel => [x, y, w, h, color];
const dark = "#151426";
const ink = "#0c1023";
const light = "#ffffff";
const shade = "#00000055";
const glint = "#ffffff66";
const partIndex = (category: keyof typeof PARTS, id: string) =>
  Math.max(0, PARTS[category].findIndex((part) => part.id === id));

export default function AvatarSprite({ avatar: raw, size = 96, className = "" }: { avatar: AvatarConfig; size?: number; className?: string }) {
  const a = migrateAvatar(raw);
  const uid = useId().replace(/:/g, "");
  // First production art milestone: a fully aligned Classic sprite stack.
  // Other combinations continue using the new 48x72 procedural renderer
  // until their matching layered artwork has been authored.
  const classicArt = a.body === "s4" && a.hair === "h5" &&
    a.hairColor.toLowerCase() === "#6b4226" &&
    a.top === "t7" && a.topColor.toLowerCase() === "#e94560" &&
    a.bottom === "p2" && a.bottomColor.toLowerCase() === "#2f2f45" &&
    a.shoes === "sh2" && a.accessory === DEFAULT_AVATAR.accessory &&
    a.face === DEFAULT_AVATAR.face && a.eyes === DEFAULT_AVATAR.eyes &&
    a.brows === DEFAULT_AVATAR.brows && a.nose === DEFAULT_AVATAR.nose &&
    a.mouth === DEFAULT_AVATAR.mouth;
  if (classicArt) {
    const sprites = [classicBody, classicBottom, classicShoes, classicTop, classicFace, classicHair];
    return (
      <div className={className} role="img" aria-label="SIEMCITY Classic Citizen"
        style={{ width: size, height: size * 1.5, position: "relative", flexShrink: 0 }}>
        {sprites.map((src) => (
          <img key={src} src={src} alt="" draggable={false}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", imageRendering: "pixelated" }} />
        ))}
      </div>
    );
  }
  const skin = SKIN_TONES.find((s) => s.id === a.body)?.color ?? SKIN_TONES[0].color;
  const hair = a.hairColor, top = a.topColor, pants = a.bottomColor, shoes = a.shoeColor;
  const hairStyle = partIndex("hair", a.hair);
  const topStyle = partIndex("top", a.top);
  const bottomStyle = partIndex("bottom", a.bottom);
  const shoeStyle = partIndex("shoes", a.shoes);
  const accessory = partIndex("accessory", a.accessory);
  const eyeStyle = partIndex("eyes", a.eyes);
  const mouthStyle = partIndex("mouth", a.mouth);
  const faceStyle = partIndex("face", a.face);
  const layers: Pixel[] = [];
  const add = (...pixels: Pixel[]) => layers.push(...pixels);

  // Back hair and long locks are behind the shoulders.
  if ([7, 8, 9, 12, 14, 17, 19].includes(hairStyle)) {
    add(r(10, 10, 7, 29, dark), r(31, 10, 7, 29, dark),
      r(11, 12, 5, 25, hair), r(32, 12, 5, 25, hair),
      r(12, 14, 2, 18, glint), r(34, 16, 2, 18, shade));
  }

  // Chibi body: broad head, compact torso, substantial shoes.
  add(
    r(17, 23, 14, 6, ink), r(19, 24, 10, 7, skin),
    r(13, 27, 22, 24, ink), r(15, 28, 18, 23, skin),
    r(8, 29, 7, 21, ink), r(9, 30, 5, 18, skin),
    r(33, 29, 7, 21, ink), r(34, 30, 5, 18, skin),
    r(15, 48, 18, 5, ink), r(16, 49, 16, 3, skin),
    r(15, 51, 9, 13, ink), r(16, 52, 7, 11, skin),
    r(25, 51, 9, 13, ink), r(26, 52, 7, 11, skin),
    r(9, 46, 5, 5, ink), r(10, 47, 3, 3, skin),
    r(34, 46, 5, 5, ink), r(35, 47, 3, 3, skin),
  );

  // Bottoms: every saved ID remains selectable and has a visible variation.
  const shorts = [4, 5].includes(bottomStyle);
  const skirt = [6, 7, 13].includes(bottomStyle);
  const baggy = [2, 3, 11, 14].includes(bottomStyle);
  if (skirt) {
    add(r(12, 48, 24, bottomStyle === 7 ? 14 : 9, ink),
      r(14, 49, 20, bottomStyle === 7 ? 12 : 7, pants),
      r(19, 50, 2, 6, shade), r(28, 50, 2, 6, shade));
  } else {
    add(r(14, 48, 20, 8, ink), r(15, 49, 18, 6, pants),
      r(baggy ? 12 : 15, 54, baggy ? 12 : 9, shorts ? 5 : 10, ink),
      r(baggy ? 13 : 16, 54, baggy ? 10 : 7, shorts ? 4 : 9, pants),
      r(25, 54, baggy ? 12 : 9, shorts ? 5 : 10, ink),
      r(26, 54, baggy ? 10 : 7, shorts ? 4 : 9, pants),
      r(18, 55, 1, shorts ? 2 : 7, glint), r(29, 56, 2, shorts ? 2 : 6, shade),
      r(23, 50, 2, 5, shade));
    if ([3, 11, 14].includes(bottomStyle)) add(r(13, 56, 5, 5, dark), r(31, 56, 5, 5, dark), r(14, 57, 3, 1, glint));
    if (bottomStyle === 8) add(r(18, 58, 3, 2, skin), r(29, 59, 3, 2, skin));
  }

  // Shoes: dark outlines, distinct colored uppers, toe caps, lace clusters.
  if (shoeStyle !== 9) {
    add(r(10, 62, 15, 8, ink), r(24, 62, 15, 8, ink),
      r(11, 63, 13, 5, shoes), r(25, 63, 13, 5, shoes),
      r(10, 68, 15, 3, light), r(24, 68, 15, 3, light),
      r(12, 67, 12, 1, dark), r(26, 67, 12, 1, dark),
      r(17, 64, 4, 1, light), r(17, 66, 4, 1, light),
      r(31, 64, 4, 1, light), r(31, 66, 4, 1, light),
      r(11, 63, 3, 3, glint), r(25, 63, 3, 3, glint));
    if ([4, 5, 6, 11].includes(shoeStyle)) add(r(14, 59, 9, 5, ink), r(15, 60, 7, 4, shoes), r(28, 59, 9, 5, ink), r(29, 60, 7, 4, shoes));
  }

  // Clothing: shared silhouette plus per-style construction details.
  const jacket = [4, 5, 6, 7, 8, 9, 10, 11, 12, 18].includes(topStyle);
  const sleeveless = [2, 13, 17].includes(topStyle);
  add(r(13, 28, 22, 24, ink), r(14, 29, 20, 21, top),
    ...(sleeveless ? [] : [r(7, 29, 8, 18, ink), r(8, 30, 6, 16, top), r(33, 29, 8, 18, ink), r(34, 30, 6, 16, top)]),
    r(14, 47, 20, 4, dark), r(15, 47, 18, 2, top),
    r(15, 31, 2, 13, glint), r(31, 32, 2, 13, shade),
    r(8, 44, 6, 3, dark), r(34, 44, 6, 3, dark));
  if (jacket) {
    add(r(20, 29, 9, 19, ink), r(21, 30, 7, 17, dark),
      r(18, 29, 3, 8, light), r(28, 29, 3, 8, shade),
      r(24, 33, 1, 14, "#bcc8d4"),
      r(17, 41, 6, 2, dark), r(27, 41, 6, 2, dark),
      r(18, 42, 3, 1, "#c5d4e1"), r(28, 42, 3, 1, "#c5d4e1"),
      r(10, 32, 2, 9, glint), r(37, 33, 2, 9, shade));
  } else {
    add(r(21, 30, 7, 2, dark));
    if (topStyle === 15) add(r(22, 35, 5, 5, "#00e5d0"));
    if (topStyle === 14) add(r(14, 36, 20, 2, light), r(14, 42, 20, 2, light));
  }
  if (topStyle === 9 || topStyle === 12) add(r(14, 49, 20, 8, top), r(23, 33, 1, 23, dark));
  if (topStyle === 10) add(r(14, 35, 20, 2, shade), r(14, 41, 20, 2, shade));
  if (topStyle === 13) add(r(16, 36, 16, 5, dark), r(18, 37, 4, 3, "#00e5d0"));

  // Oversized head silhouette, ears, cheek and jaw shading.
  add(r(9, 9, 30, 20, ink), r(11, 8, 26, 22, skin),
    r(8, 17, 5, 10, ink), r(9, 18, 4, 8, skin),
    r(35, 17, 5, 10, ink), r(36, 18, 3, 8, skin),
    r(14, 27, 20, 4, ink), r(15, 27, 18, 2, skin),
    r(12, 23, 4, 4, shade), r(33, 20, 3, 7, shade),
    r(14, 11, 20, 2, glint), r(11, 18, 2, 5, glint));
  if (faceStyle === 9) add(r(32, 17, 2, 6, "#9b4d4d"));
  if (faceStyle === 8) add(r(15, 23, 2, 1, "#a66d54"), r(32, 23, 2, 1, "#a66d54"));

  // Expressive eyes and brows, with customizable cybernetic colors.
  const eyeColor = [4, 5, 6, 7, 8, 9, 11, 15, 16, 17, 19].includes(eyeStyle)
    ? ["#00ff9c", "#4cc9f0", "#b48cff", "#ffd166"][eyeStyle % 4] : ink;
  add(r(16, 18, 6, 2, dark), r(27, 18, 6, 2, dark),
    r(17, 20, 4, 5, light), r(28, 20, 4, 5, light),
    r(18, 20, 3, 5, eyeColor), r(29, 20, 3, 5, eyeColor),
    r(18, 20, 1, 2, light), r(29, 20, 1, 2, light),
    r(15, 26, 4, 1, "#e9838a"), r(32, 26, 4, 1, "#e9838a"));
  if (a.brows === "b1") add(r(16, 18, 6, 2, skin), r(27, 18, 6, 2, skin));
  if (a.nose !== "n1") add(r(24, 25, 2, 1, "#a46d5b"));
  if (mouthStyle !== 6) add(r(23, 27, mouthStyle === 1 ? 5 : 3, mouthStyle === 3 ? 2 : 1, "#843c53"));
  if (mouthStyle === 16 || mouthStyle === 17) add(r(19, 25, 11, 5, dark), r(20, 25, 9, 1, "#4cc9f0"));

  // Front hair uses common anchors; silhouette varies with saved hairstyle.
  if (hairStyle !== 0) {
    add(r(10, 6, 28, 8, ink), r(12, 5, 24, 8, hair),
      r(8, 10, 6, 11, ink), r(9, 10, 5, 10, hair),
      r(35, 10, 6, 10, ink), r(35, 10, 5, 9, hair),
      r(12, 8, 24, 5, hair), r(14, 6, 8, 2, glint),
      r(29, 7, 6, 2, shade), r(10, 13, 4, 4, shade));
    if ([4, 5, 6, 18].includes(hairStyle)) {
      add(r(12, 1, 6, 8, ink), r(13, 2, 4, 7, hair),
        r(20, 0, 7, 9, ink), r(21, 1, 5, 8, hair),
        r(31, 2, 5, 7, ink), r(32, 3, 3, 6, hair));
    }
    if ([7, 8, 12, 19].includes(hairStyle)) add(r(12, 11, 6, 11, hair), r(32, 12, 5, 10, hair));
    if ([10, 11, 17].includes(hairStyle)) add(r(5, 6, 8, 9, ink), r(6, 7, 6, 7, hair), r(36, 6, 8, 9, ink), r(37, 7, 6, 7, hair));
    if (hairStyle === 13 || hairStyle === 14) add(r(7, 4, 34, 9, ink), r(8, 5, 32, 7, hair), r(5, 10, 6, 8, hair), r(37, 10, 6, 8, hair));
    if (hairStyle === 15) add(r(11, 13, 26, 3, skin));
    if (hairStyle === 16) add(r(24, 12, 13, 7, hair));
    add(r(16, 7, 7, 2, glint), r(33, 12, 3, 5, shade));
  }

  // Accessory overlay. All 20 existing choices have visible representations.
  if ([1, 2, 3, 4].includes(accessory)) {
    add(r(14, 18, 9, 5, dark), r(26, 18, 9, 5, dark),
      r(16, 19, 6, 3, accessory === 2 ? "#e94560" : "#4cc9f0"),
      r(27, 19, 6, 3, accessory === 2 ? "#e94560" : "#4cc9f0"),
      r(23, 19, 3, 1, light));
  } else if ([5, 6].includes(accessory)) {
    add(r(7, 11, 5, 14, dark), r(36, 11, 5, 14, dark),
      r(8, 15, 3, 8, "#7b5cff"), r(37, 15, 3, 8, "#7b5cff"));
  } else if ([7, 8, 9].includes(accessory)) {
    add(r(10, 3, 28, 7, dark), r(12, 4, 24, 5, "#2f80ed"), r(8, 9, 19, 3, dark));
  } else if (accessory === 10) {
    add(r(7, 4, 34, 20, dark), r(9, 6, 30, 17, "#343248"), r(14, 15, 20, 10, skin));
  } else if ([12, 13, 14].includes(accessory)) {
    add(r(8, 24, 4, 6, "#ffd166"), r(37, 24, 4, 6, "#ffd166"));
  } else if ([15, 16, 17, 18, 19].includes(accessory)) {
    add(r(20, 31, 8, 2, "#ffd166"), r(23, 33, 3, 4, "#ffd166"));
  }

  return (
    <svg
      viewBox="0 0 48 72"
      width={size}
      height={size * 1.5}
      className={className}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Customizable SIEMCITY citizen pixel avatar"
      style={{ imageRendering: "pixelated", overflow: "visible" }}
    >
      <title>SIEMCITY Citizen</title>
      <ellipse cx="24" cy="70" rx="17" ry="2" fill="#00000055" />
      <g id={`citizen-${uid}`}>
        {layers.map(([x, y, w, h, color], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill={color} />
        ))}
      </g>
    </svg>
  );
}
