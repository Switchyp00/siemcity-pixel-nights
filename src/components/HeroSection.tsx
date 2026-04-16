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
        <Link to="/projects/siemcity-v2">
          <PixelButton variant="primary">EXPLORE THE LAB</PixelButton>
        </Link>
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none z-20" />
    </section>
  );
};

export default HeroSection;
