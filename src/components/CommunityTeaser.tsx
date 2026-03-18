import RetroWindow from "./RetroWindow";
import PixelButton from "./PixelButton";

const mockPosts = [
  { user: "h4ck3r_01", msg: "Just published new Sigma rules for Log4Shell variants", time: "2m ago" },
  { user: "soc_analyst", msg: "Anyone else seeing increased Cobalt Strike activity?", time: "14m ago" },
  { user: "det_engineer", msg: "New KQL query pack for Azure Sentinel dropped 🔥", time: "31m ago" },
  { user: "threat_hunt3r", msg: "YARA rule for latest ransomware strain in #tool-shed", time: "1h ago" },
];

const CommunityTeaser = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="font-pixel text-lg sm:text-xl purple-text text-center mb-4">
        // CITY_FEED
      </h2>
      <p className="text-center text-muted-foreground font-mono text-sm mb-12 max-w-lg mx-auto">
        Live chatter from SIEM City citizens. The community forum is launching soon.
      </p>

      <div className="max-w-2xl mx-auto">
        <RetroWindow title="CITY_FEED.log" accentColor="secondary">
          <div className="space-y-3">
            {mockPosts.map((post, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <span className="neon-text font-mono text-xs shrink-0">{`>`}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-pixel text-[8px] text-primary">{post.user}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{post.time}</span>
                  </div>
                  <p className="font-mono text-xs text-card-foreground">{post.msg}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <PixelButton variant="secondary">COMING SOON</PixelButton>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
};

export default CommunityTeaser;
