import RetroWindow from "./RetroWindow";
import PixelButton from "./PixelButton";

const roadmapItems = [
  { phase: "PHASE 1", label: "Lab setup — AD, Kali, Metasploitable", status: "✔ DONE" },
  { phase: "PHASE 2", label: "Wazuh deployment + agent enrollment", status: "✔ DONE" },
  { phase: "PHASE 3", label: "Attack chain execution + detection rules", status: "▶ IN PROGRESS" },
  { phase: "PHASE 4", label: "Write-ups, guides & MITRE mapping", status: "◻ UPCOMING" },
  { phase: "PHASE 5", label: "Community platform — share labs & learn together", status: "◻ UPCOMING" },
];

const CommunityTeaser = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="font-pixel text-lg sm:text-xl purple-text text-center mb-4">
        // ROADMAP
      </h2>
      <p className="text-center text-muted-foreground font-mono text-sm mb-12 max-w-lg mx-auto">
        From solo lab to community resource. Here's where SIEM City is headed.
      </p>

      <div className="max-w-2xl mx-auto">
        <RetroWindow title="ROADMAP.log" accentColor="secondary">
          <div className="space-y-3">
            {roadmapItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <span className="neon-text font-mono text-xs shrink-0">{`>`}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-pixel text-[8px] text-primary">{item.phase}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{item.status}</span>
                  </div>
                  <p className="font-mono text-xs text-card-foreground">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <PixelButton variant="secondary">WRITE-UPS DROPPING SOON</PixelButton>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
};

export default CommunityTeaser;
