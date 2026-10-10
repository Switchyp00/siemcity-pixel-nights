import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { CityLocation } from "@/world/data/locations";
import { getChildLocations } from "@/world/data/locations";
import PixelButton from "@/components/PixelButton";

export default function DestinationPreview({ loc, onClose }: { loc: CityLocation; onClose: () => void }) {
  const [lines, setLines] = useState(0);
  useEffect(() => {
    setLines(0);
    const t = setInterval(() => setLines((l) => (l >= 3 ? l : l + 1)), 280);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => { clearInterval(t); window.removeEventListener("keydown", esc); };
  }, [loc.id, onClose]);
  const children = getChildLocations(loc.id);
  const enterTo = loc.interior ? `/city/${loc.slug}` : loc.route;

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-[2px] p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-label={loc.name} onClick={(e) => e.stopPropagation()}
        className="retro-window w-full max-w-lg shadow-[8px_8px_0_0_hsl(var(--muted))]"
        initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
        <div className="bg-secondary px-3 py-2 flex items-center justify-between">
          <span className="font-pixel text-[8px] text-secondary-foreground">{loc.slug}.sc</span>
          <button onClick={onClose} aria-label="Close" className="font-pixel text-[10px] text-secondary-foreground px-1">×</button>
        </div>
        <div className="p-6 font-mono text-sm space-y-2">
          {lines > 0 && <p className="text-muted-foreground">&gt; CONNECTING...</p>}
          {lines > 1 && <p className="font-pixel text-base neon-text py-2">{loc.icon} {loc.name}</p>}
          {lines > 2 && (
            <div className="pixel-fade-in space-y-4">
              <p className="text-card-foreground">{loc.description}</p>
              {children.length > 0 && (
                <p className="text-muted-foreground text-xs">Connected: {children.map((c) => c.name).join(" · ")}</p>
              )}
              <div className="flex flex-wrap gap-3 pt-2">
                {enterTo ? (
                  <Link to={enterTo}><PixelButton>ENTER</PixelButton></Link>
                ) : (
                  <span className="font-pixel text-xs px-6 py-3 border-2 border-border text-muted-foreground cursor-not-allowed">ENTER — COMING SOON</span>
                )}
                <PixelButton variant="secondary" onClick={onClose}>RETURN TO CITY</PixelButton>
              </div>
            </div>
          )}
          <span className="neon-text cursor-blink">█</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
