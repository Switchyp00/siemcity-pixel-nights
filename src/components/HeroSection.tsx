import { Link } from "react-router-dom";
import heroImage from "@/assets/siemcity-hero.png";
import PixelButton from "./PixelButton";
import TerminalText from "./TerminalText";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Hero image background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="SIEM City pixel art cityscape"
          className="w-full h-full object-cover"
          style={{ imageRendering: "auto" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Bottom CTA area */}
      <div className="relative z-10 mt-auto mb-16 flex flex-col items-center gap-4">
        <Link to="/city">
          <PixelButton variant="primary" className="text-sm px-10 py-4">ENTER THE CITY</PixelButton>
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/projects/siemcity-v2">
            <PixelButton variant="secondary">EXPLORE THE LAB</PixelButton>
          </Link>
          <Link to="/app" className="font-pixel text-[8px] px-4 py-3 border-2 border-border bg-card/80 text-muted-foreground hover:text-primary hover:border-primary transition-colors">
            📱 MOBILE EXPERIENCE PREVIEW <span className="text-secondary">[DEMO]</span>
          </Link>
        </div>
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none z-20" />
    </section>
  );
};

export default HeroSection;
