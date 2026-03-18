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

      {/* Content */}
      <div className="relative z-10 text-center px-4 mt-32">
        <div className="mb-8">
          <h1 className="font-pixel text-4xl sm:text-5xl md:text-6xl neon-text mb-4 tracking-wider">
            SIEM CITY
          </h1>
          <div className="h-8">
            <TerminalText
              text="> Welcome to the cybersecurity community_"
              speed={40}
              className="text-sm sm:text-base text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA area */}
      <div className="relative z-10 mt-auto mb-16 flex flex-col items-center gap-4">
        <PixelButton variant="primary">JOIN THE CITY</PixelButton>
        <p className="font-pixel text-[7px] text-muted-foreground tracking-widest">
          [ PRESS START TO BEGIN ]
        </p>
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline pointer-events-none z-20" />
    </section>
  );
};

export default HeroSection;
