import { useState } from "react";
import DistrictChat from "@/world/components/DistrictChat";
import type { Citizen } from "@/world/models";

interface DistrictSocialOverlayProps {
  locationId: string;
  name: string;
  me: Citizen | null;
}

// Text chat only for this release. Voice can be added as a separate feature.
export default function DistrictSocialOverlay({ locationId, name, me }: DistrictSocialOverlayProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      aria-label={`${name} text chat panel`}
      className={`absolute right-0 top-20 bottom-0 z-40 flex max-w-full transition-[width] duration-300 ease-out ${expanded ? "w-full sm:w-[min(33.333vw,520px)]" : "w-12"}`}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label={expanded ? "Collapse text chat" : "Expand text chat"}
        aria-expanded={expanded}
        aria-controls="district-chat-panel"
        onClick={() => setExpanded((value) => !value)}
        className="h-12 w-12 shrink-0 self-start border-2 border-primary bg-card text-primary font-pixel text-xs hover:bg-primary/10"
      >
        {expanded ? "»" : "«"}
      </button>
      <div
        id="district-chat-panel"
        aria-hidden={!expanded}
        className={`min-w-0 flex-1 flex-col overflow-hidden border-l-2 border-primary bg-background/95 shadow-2xl backdrop-blur-sm ${expanded ? "flex" : "hidden"}`}
      >
        <DistrictChat locationId={locationId} name={name} me={me} />
      </div>
    </aside>
  );
}
