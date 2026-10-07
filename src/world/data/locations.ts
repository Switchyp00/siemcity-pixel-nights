// Shared, client-agnostic Location model. Desktop and mobile render the same records differently.
// Later this list will be served by the backend; components must only consume it via getLocations().
import tower from "@/assets/city/siem-tower.png";
import cafe from "@/assets/city/terminal-cafe.png";
import loft from "@/assets/city/log-loft.png";
import signals from "@/assets/city/signals-district.png";
import cyber from "@/assets/city/cyber-district.png";
import plaza from "@/assets/city/the-plaza.png";

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
}

const LOCATIONS: CityLocation[] = [
  { id: "siem_tower", name: "SIEM TOWER", slug: "siem-tower", icon: "▲", locationType: "landmark", parentLocationId: null,
    tagline: "The heart of SIEMCITY.", description: "Central operations. Labs, detections and the full SIEMCITY v2 build log live here.",
    desktopVisible: true, mobileVisible: true, status: "online", featureFlags: ["lab_archive"], route: "/projects/siemcity-v2",
    desktopAsset: tower, desktopPosition: { x: 50, bottom: 57, width: 16.5, z: 30 } },
  { id: "terminal_cafe", name: "TERMINAL CAFÉ", slug: "terminal-cafe", icon: "☕", locationType: "social", parentLocationId: null,
    tagline: "Coffee, CRTs and conversation.", description: "Social systems initializing. Soon: hang out, chat and meet other citizens.",
    desktopVisible: true, mobileVisible: true, status: "coming_soon", featureFlags: ["chat", "presence"],
    desktopAsset: cafe, desktopPosition: { x: 17, bottom: 70, width: 19, z: 20 } },
  { id: "log_loft", name: "LOG LOFT", slug: "log-loft", icon: "✎", locationType: "community", parentLocationId: null,
    tagline: "Where citizens gather.", description: "The SIEMCITY community hub. Early access is opening soon.",
    desktopVisible: true, mobileVisible: true, status: "online", featureFlags: ["community"], route: "/community",
    desktopAsset: loft, desktopPosition: { x: 31, bottom: 36, width: 15, z: 10 } },
  { id: "signals_district", name: "SIGNALS DISTRICT", slug: "signals-district", icon: "📡", locationType: "district", parentLocationId: null,
    tagline: "Projects, creators and broadcasts.", description: "Transmitters warming up. Citizen projects and write-ups will broadcast from here.",
    desktopVisible: true, mobileVisible: true, status: "coming_soon", featureFlags: ["projects"],
    desktopAsset: signals, desktopPosition: { x: 70, bottom: 38, width: 15, z: 10 } },
  { id: "cyber_district", name: "CYBER DISTRICT", slug: "cyber-district", icon: "⛨", locationType: "district", parentLocationId: null,
    tagline: "Labs, servers and live fire.", description: "Secure facility. Hands-on labs and attack simulations are being provisioned.",
    desktopVisible: true, mobileVisible: true, status: "coming_soon", featureFlags: ["labs"],
    desktopAsset: cyber, desktopPosition: { x: 84, bottom: 70, width: 19, z: 20 } },
  { id: "the_plaza", name: "THE PLAZA", slug: "the-plaza", icon: "⛲", locationType: "community", parentLocationId: null,
    tagline: "The city's crossroads.", description: "Events, career services and shops will branch off from here.",
    desktopVisible: true, mobileVisible: true, status: "coming_soon", featureFlags: ["events"],
    desktopAsset: plaza, desktopPosition: { x: 50, bottom: 99, width: 21, z: 40 } },
  // Sub-destination: desktop may later render as a building; mobile reaches it via THE PLAZA.
  { id: "career", name: "CAREER CENTER", slug: "career", icon: "▣", locationType: "service", parentLocationId: "the_plaza",
    tagline: "Your path to the SOC.", description: "Career paths and certifications.", desktopVisible: false, mobileVisible: true,
    status: "coming_soon", featureFlags: [] },
];

export const getLocations = () => LOCATIONS;
export const getDesktopLocations = () => LOCATIONS.filter((l) => l.desktopVisible && l.desktopPosition && l.desktopAsset);
export const getChildLocations = (parentId: string) => LOCATIONS.filter((l) => l.parentLocationId === parentId);
