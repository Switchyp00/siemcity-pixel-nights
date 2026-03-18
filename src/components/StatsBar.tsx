const stats = [
  { label: "LAB MACHINES", value: "4+", icon: "🖥" },
  { label: "ATTACK PHASES", value: "3", icon: "⚔" },
  { label: "WAZUH AGENTS", value: "LIVE", icon: "🛡" },
  { label: "STATUS", value: "v2", icon: "⚡" },
];

const StatsBar = () => {
  return (
    <section className="border-y-2 border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <span className="text-xl mb-1 block">{stat.icon}</span>
            <p className="font-pixel text-lg neon-text">{stat.value}</p>
            <p className="font-pixel text-[7px] text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
