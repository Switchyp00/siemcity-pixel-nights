const stats = [
  { label: "CITIZENS", value: "1,247", icon: "👤" },
  { label: "RULES SHARED", value: "3,891", icon: "📋" },
  { label: "THREATS TRACKED", value: "12,044", icon: "🔍" },
  { label: "UPTIME", value: "99.9%", icon: "⚡" },
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
