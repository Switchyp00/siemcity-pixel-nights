import { useState } from "react";
import DistrictChat from "@/world/components/DistrictChat";
import type { Citizen } from "@/world/models";

type SocialTab = "text" | "voice";

interface DistrictSocialOverlayProps {
  locationId: string;
  name: string;
  me: Citizen | null;
}

// This is a UI-only first slice. Voice connections require a real provider and secure tokens.
export default function DistrictSocialOverlay({ locationId, name, me }: DistrictSocialOverlayProps) {
  const [expanded, setExpanded] = useState(true);
  const [tab, setTab] = useState<SocialTab>("text");

  return (
    <aside
      aria-label={`${name} social panel`}
      className={`absolute right-0 top-16 bottom-0 z-40 flex max-w-full transition-[width] duration-300 ease-out ${expanded ? "w-full sm:w-[min(33.333vw,520px)]" : "w-12"}`}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label={expanded ? "Collapse social panel" : "Expand social panel"}
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="h-12 w-12 shrink-0 self-start border-2 border-primary bg-card text-primary font-pixel text-xs hover:bg-primary/10"
      >
        {expanded ? "»" : "«"}
      </button>
      {expanded && (
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden border-l-2 border-primary bg-background/95 shadow-2xl backdrop-blur-sm">
          <div className="flex border-b-2 border-border" role="tablist" aria-label="District communications">
            <button type="button" role="tab" aria-selected={tab === "text"}
              onClick={() => setTab("text")}
              className={`flex-1 px-2 py-4 font-pixel text-[9px] ${tab === "text" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-primary"}`}>
              TEXT CHAT
            </button>
            <button type="button" role="tab" aria-selected={tab === "voice"}
              onClick={() => setTab("voice")}
              className={`flex-1 px-2 py-4 font-pixel text-[9px] ${tab === "voice" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-primary"}`}>
              VOICE ROOMS
            </button>
          </div>
          <div className={`min-h-0 flex-1 ${tab === "text" ? "flex flex-col" : "hidden"}`}>
            <DistrictChat locationId={locationId} name={name} me={me} />
          </div>
          {tab === "voice" && (
            <div role="tabpanel" className="min-h-0 flex-1 overflow-y-auto p-4">
              <p className="font-pixel text-[10px] text-primary">VOICE ROOMS — {name.toUpperCase()}</p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                Voice is not connected yet. Rooms are shown as a preview; joining will be enabled after a secure audio provider is configured.
              </p>
              <div className="mt-5 space-y-3">
                {[1, 2, 3, 4, 5].map((number) => (
                  <div key={number} className="retro-window flex items-center justify-between gap-3 p-3">
                    <div>
                      <p className="font-pixel text-[9px] text-card-foreground">VOICE {number}</p>
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground">Not connected</p>
                    </div>
                    <button type="button" disabled aria-label={`Join Voice ${number} (unavailable)`}
                      className="cursor-not-allowed border border-border px-3 py-2 font-pixel text-[8px] text-muted-foreground opacity-60">
                      JOIN
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
