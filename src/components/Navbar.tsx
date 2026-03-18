const navItems = [
  { label: "HOME", icon: "⌂" },
  { label: "LAB", icon: "🖥" },
  { label: "WRITE-UPS", icon: "📋", comingSoon: true },
  { label: "COMMUNITY", icon: "💬", comingSoon: true },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 border-b-2 border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-sm neon-text">SIEM</span>
          <span className="font-pixel text-sm purple-text">CITY</span>
        </div>
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-2 font-pixel text-[8px] text-muted-foreground hover:text-primary transition-colors relative group"
            >
              <span className="text-sm">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
              {item.comingSoon && (
                <span className="absolute -top-3 -right-4 font-pixel text-[5px] text-secondary">SOON</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
