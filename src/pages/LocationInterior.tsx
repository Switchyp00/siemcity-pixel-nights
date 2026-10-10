import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLocationBySlug } from "@/world/data/locations";
import { cloudCitizenRepo } from "@/world/services/repositories";
import type { Citizen } from "@/world/models";
import AvatarSprite from "@/world/components/AvatarSprite";
import { DEFAULT_AVATAR } from "@/world/data/avatarParts";

// Reusable interior renderer: every enterable location is driven by its InteriorConfig.
export default function LocationInterior() {
  const { slug = "" } = useParams();
  const loc = getLocationBySlug(slug);
  const [citizen, setCitizen] = useState<Citizen | null>(null);
  const [pos, setPos] = useState(loc?.interior?.spawn ?? { x: 50, y: 60 });
  useEffect(() => { cloudCitizenRepo.getCurrent().then(setCitizen).catch(() => setCitizen(null)); }, []);
  useEffect(() => { if (loc) { document.title = `SIEMCITY — ${loc.name}`; setPos(loc.interior!.spawn); } }, [loc]);
  if (!loc?.interior) return <Navigate to="/city" replace />;
  const it = loc.interior;

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-video"
        style={{ width: "max(100vw, calc(100vh * 16 / 9))" }}
        onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}>
        <img src={it.asset} alt={`${loc.name} interior`} width={1536} height={864} className="absolute inset-0 w-full h-full object-cover select-none" draggable={false} />
        {it.interactions.map((h) => (
          <Link key={h.id} to={h.route ?? "#"} onClick={(e) => e.stopPropagation()}
            className="absolute -translate-x-1/2 retro-window px-3 py-2 font-pixel text-[8px] neon-text hover:brightness-125 animate-pulse-subtle"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}>◆ {h.label}</Link>
        ))}
        <div className="absolute -translate-x-1/2 -translate-y-full transition-all duration-700 ease-out pointer-events-none"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
          <AvatarSprite avatar={citizen?.avatar ?? DEFAULT_AVATAR} size={64} />
          <p className="font-pixel text-[7px] text-center text-card-foreground mt-1 whitespace-nowrap">{citizen?.username ?? "GUEST"}</p>
        </div>
      </div>

      <div className="absolute top-0 inset-x-0 z-50 flex items-start justify-between p-4 pointer-events-none">
        <Link to="/city" className="pointer-events-auto retro-window px-4 py-2 font-pixel text-[9px] text-primary hover:bg-primary/10">← RETURN TO CITY</Link>
        <div className="retro-window px-4 py-2 text-right">
          <p className="font-pixel text-[10px] neon-text">{loc.icon} {loc.name}</p>
          <p className="font-mono text-[10px] text-muted-foreground">{it.ambience}</p>
        </div>
      </div>
      <p className="absolute bottom-3 left-4 z-50 font-pixel text-[7px] text-muted-foreground pointer-events-none">&gt; CLICK THE FLOOR TO WALK</p>
    </div>
  );
}
