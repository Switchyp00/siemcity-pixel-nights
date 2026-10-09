import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import cityBg from "@/assets/city/city-bg.jpg";
import { getDesktopLocations, type CityLocation } from "@/world/data/locations";
import { cloudCitizenRepo } from "@/world/services/repositories";
import type { Citizen } from "@/world/models";
import CityBuilding from "@/city/CityBuilding";
import Ambient from "@/city/Ambient";
import DestinationPreview from "@/city/DestinationPreview";
import AvatarSprite from "@/world/components/AvatarSprite";

export default function DesktopCity() {
  const [open, setOpen] = useState<CityLocation | null>(null);
  const [citizen, setCitizen] = useState<Citizen | null>(null);
  const close = useCallback(() => setOpen(null), []);
  useEffect(() => { cloudCitizenRepo.getCurrent().then(setCitizen).catch(() => setCitizen(null)); document.title = "SIEMCITY — The City"; }, []);
  const locations = getDesktopLocations();

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {/* 16:9 stage that always covers the viewport */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-video"
        style={{ width: "max(100vw, calc(100vh * 16 / 9))" }}>
        <img src={cityBg} alt="" width={1920} height={1088} className="absolute inset-0 w-full h-full object-cover select-none" draggable={false} />
        <Ambient />
        {locations.map((l) => <CityBuilding key={l.id} loc={l} onOpen={setOpen} />)}
      </div>

      {/* Minimal HUD */}
      <div className="absolute top-0 inset-x-0 z-50 flex items-start justify-between p-4 pointer-events-none">
        <Link to="/" className="pointer-events-auto retro-window px-4 py-2 font-pixel text-xs">
          <span className="neon-text">SIEM</span><span className="purple-text">CITY</span>
        </Link>
        <div className="pointer-events-auto flex gap-2">
          <Link to="/app" className="retro-window flex items-center gap-3 px-3 py-1">
            {citizen ? <AvatarSprite avatar={citizen.avatar} size={22} /> : <span className="font-pixel text-sm text-muted-foreground">☺</span>}
            <span className="text-left">
              <span className="block font-pixel text-[8px] text-card-foreground">{citizen?.username ?? "GUEST"}</span>
              <span className="block font-mono text-[10px] neon-text">{citizen?.networkAddress ?? "0.0.0.0 — not registered"}</span>
            </span>
          </Link>
          <button aria-label="Notifications" className="retro-window w-11 font-pixel text-xs text-muted-foreground hover:text-primary">✉</button>
          <button aria-label="Settings" className="retro-window w-11 font-pixel text-xs text-muted-foreground hover:text-primary">⚙</button>
        </div>
      </div>
      <p className="absolute bottom-3 left-4 z-50 font-pixel text-[7px] text-muted-foreground pointer-events-none">&gt; CLICK A BUILDING TO TRAVEL</p>

      <AnimatePresence>{open && <DestinationPreview loc={open} onClose={close} />}</AnimatePresence>
    </div>
  );
}
