import { motion } from "framer-motion";
import type { CityLocation } from "@/world/data/locations";

export default function CityBuilding({ loc, onOpen }: { loc: CityLocation; onOpen: (l: CityLocation) => void }) {
  const p = loc.desktopPosition!;
  return (
    <motion.button
      aria-label={`Open ${loc.name}`}
      onClick={() => onOpen(loc)}
      className="group absolute -translate-x-1/2 -translate-y-full cursor-pointer outline-none"
      style={{ left: `${p.x}%`, top: `${p.bottom}%`, width: `${p.width}%`, zIndex: p.z, transformOrigin: "50% 100%" }}
      whileHover={{ y: -6 }}
      whileTap={{ scaleY: 0.9, scaleX: 1.05 }}
      transition={{ type: "spring", stiffness: 500, damping: 14 }}
    >
      <img src={loc.desktopAsset} alt={loc.name} draggable={false}
        className="w-full h-auto city-building transition-[filter] duration-150" />
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity whitespace-nowrap retro-window px-3 py-2 text-left">
        <span className="block font-pixel text-[9px] neon-text">{loc.icon} {loc.name}</span>
        <span className="block font-mono text-[10px] text-muted-foreground mt-1">{loc.tagline}</span>
        <span className={`block font-pixel text-[6px] mt-1 ${loc.status === "online" ? "text-primary" : "text-secondary"}`}>
          ● {loc.status === "online" ? "ONLINE" : "COMING ONLINE"}
        </span>
      </span>
    </motion.button>
  );
}
