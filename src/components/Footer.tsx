const Footer = () => {
  return (
    <footer className="border-t-2 border-border bg-card/30 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[10px] neon-text">SIEM</span>
          <span className="font-pixel text-[10px] purple-text">CITY</span>
          <span className="font-mono text-[10px] text-muted-foreground ml-2">© 2026</span>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground">
          siemcity.com — built for defenders, by defenders
        </p>
      </div>
    </footer>
  );
};

export default Footer;
