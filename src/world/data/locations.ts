// Shared, client-agnostic Location model. Desktop and mobile render the same records differently.
// Later this list will be served by the backend; components must only consume it via getLocations().
import tower from "@/assets/city/siem-tower.png";
import cafe from "@/assets/city/terminal-cafe.png";
import loft from "@/assets/city/log-loft.png";
import signals from "@/assets/city/signals-district.png";
import cyber from "@/assets/city/cyber-district.png";
import plaza from "@/assets/city/the-plaza.png";
import iTower from "@/assets/interiors/siem-tower.jpg";
import iCafe from "@/assets/interiors/terminal-cafe.jpg";
import iLoft from "@/assets/interiors/log-loft.jpg";
import iSignals from "@/assets/interiors/signals-district.jpg";
import iCyber from "@/assets/interiors/cyber-district.jpg";
import iPlaza from "@/assets/interiors/the-plaza.jpg";

export type LocationType = "landmark" | "social" | "community" | "district" | "service";
export type LocationStatus = "online" | "coming_soon" | "maintenance";

export interface DesktopPosition {
  x: number;      // horizontal center, % of stage width
  bottom: number; // sprite base line, % of stage height
  width: number;  // % of stage width
  z: number;
}

export interface CityLocation {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  locationType: LocationType;
  parentLocationId: string | null;
  desktopVisible: boolean;
  mobileVisible: boolean;
  desktopPosition?: DesktopPosition;
  desktopAsset?: string;
  mobileAsset?: string;
  icon: string;
  status: LocationStatus;
  featureFlags: string[];
  route?: string; // existing content this location opens, when available
  interior?: InteriorConfig;
}

// Interior: background art + spawn point (% of stage) + exit. `interactions` reserved for future hotspots.
export interface InteriorConfig {
  asset: string;
  spawn: { x: number; y: number };
  exitTo: string;
  ambience: string;
  interactions: { id: string; label: string; x: number; y: number; route?: string }[];
}

const LOCATIONS: CityLocation[] = [
  { id: "siem_tower", name: "SIEM TOWER", slug: "siem-tower", icon: "▲", locationType: "landmark", parentLocationId: null,
    tagline: "The heart of SIEMCITY.", description: "Central operations. Labs, detections and the full SIEMCITY v2 build log live here.",
    desktopVisible: true, mobileVisible: true, status: "online", featureFlags: ["lab_archive"], route: "/projects/siemcity-v2",
    desktopAsset: tower, desktopPosition: { x: 50, bottom: 57, width: 16.5, z: 30 },
    interior: { asset: iTower, spawn: { x: 50, y: 62 }, exitTo: "/city", ambience: "Alert wall online. Analysts on shift.", interactions: [{ id: "lab", label: "SIEMCITY v2 LAB LOGS", x: 34, y: 18, route: "/projects/siemcity-v2" }] } },
  { id: "terminal_cafe", name: "TERMINAL CAFÉ", slug: "terminal-cafe", icon: "☕", locationType: "social", parentLocationId: null,
    tagline: "Coffee, CRTs and conversation.", description: "Social systems initializing. Soon: hang out, chat and meet other citizens.",
    desktopVisible: true, mobileVisible: true, status: "coming_soon", featureFlags: ["chat", "presence"],
    desktopAsset: cafe, desktopPosition: { x: 17, bottom: 70, width: 19, z: 20 },
    interior: { asset: iCafe, spawn: { x: 50, y: 62 }, exitTo: "/city", ambience: "Fresh coffee. Warm CRTs. Quiet chatter.", interactions: [] } },
  { id: "log_loft", name: "LOG LOFT", slug: "log-loft", icon: "✎", locationType: "community", parentLocationId: null,
    tagline: "Where citizens gather.", description: "The SIEMCITY community hub. Early access is opening soon.",
    desktopVisible: true, mobileVisible: true, status: "online", featureFlags: ["community"], route: "/community",
    desktopAsset: loft, desktopPosition: { x: 31, bottom: 36, width: 15, z: 10 },
    interior: { asset: iLoft, spawn: { x: 48, y: 55 }, exitTo: "/city", ambience: "Notes pinned. Couches open. Stage lights warm.", interactions: [{ id: "forum", label: "COMMUNITY BOARD", x: 72, y: 26, route: "/community" }] } },
  { id: "signals_district", name: "SIGNALS DISTRICT", slug: "signals-district", icon: "📡", locationType: "district", parentLocationId: null,
    tagline: "Projects, creators and broadcasts.", description: "Transmitters warming up. Citizen projects and write-ups will broadcast from here.",
    desktopVisible: true, mobileVisible: true, status: "coming_soon", featureFlags: ["projects"],
    desktopAsset: signals, desktopPosition: { x: 70, bottom: 38, width: 15, z: 10 },
    interior: { asset: iSignals, spawn: { x: 50, y: 62 }, exitTo: "/city", ambience: "Dish aligned. Signal strength 98%.", interactions: [] } },
  { id: "cyber_district", name: "CYBER DISTRICT", slug: "cyber-district", icon: "⛨", locationType: "district", parentLocationId: null,
    tagline: "Labs, servers and live fire.", description: "Secure facility. Hands-on labs and attack simulations are being provisioned.",
    desktopVisible: true, mobileVisible: true, status: "coming_soon", featureFlags: ["labs"],
    desktopAsset: cyber, desktopPosition: { x: 84, bottom: 70, width: 19, z: 20 },
    interior: { asset: iCyber, spawn: { x: 50, y: 58 }, exitTo: "/city", ambience: "Blue team vs red team. Range is live.", interactions: [] } },
  { id: "the_plaza", name: "THE PLAZA", slug: "the-plaza", icon: "⛲", locationType: "community", parentLocationId: null,
    tagline: "The city's crossroads.", description: "Events, career services and shops will branch off from here.",
    desktopVisible: true, mobileVisible: true, status: "coming_soon", featureFlags: ["events"],
    desktopAsset: plaza, desktopPosition: { x: 50, bottom: 99, width: 21, z: 40 },
    interior: { asset: iPlaza, spawn: { x: 50, y: 78 }, exitTo: "/city", ambience: "Fountain humming. Stalls opening soon.", interactions: [] } },
  // Sub-destination: desktop may later render as a building; mobile reaches it via THE PLAZA.
  { id: "career", name: "CAREER CENTER", slug: "career", icon: "▣", locationType: "service", parentLocationId: "the_plaza",
    tagline: "Your path to the SOC.", description: "Career paths and certifications.", desktopVisible: false, mobileVisible: true,
    status: "coming_soon", featureFlags: [] },
];

export const getLocations = () => LOCATIONS;
export const getDesktopLocations = () => LOCATIONS.filter((l) => l.desktopVisible && l.desktopPosition && l.desktopAsset);
export const getChildLocations = (parentId: string) => LOCATIONS.filter((l) => l.parentLocationId === parentId);

export const getLocationBySlug = (slug: string) => LOCATIONS.find((l) => l.slug === slug);
