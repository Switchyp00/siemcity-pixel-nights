import RetroWindow from "./RetroWindow";
import { motion } from "framer-motion";

const features = [
  {
    title: "THREAT_INTEL.exe",
    icon: "🛡",
    description: "Real-time threat intelligence feeds and SIEM rule sharing. Stay ahead of adversaries.",
    status: "ACTIVE",
  },
  {
    title: "DETECTION_LAB.exe",
    icon: "🔬",
    description: "Hands-on detection engineering labs. Build, test, and share Sigma rules with the community.",
    status: "ACTIVE",
  },
  {
    title: "FORUM_HQ.exe",
    icon: "💬",
    description: "Community forums for SOC analysts, threat hunters, and detection engineers. Your new home base.",
    status: "COMING SOON",
  },
  {
    title: "TOOL_SHED.exe",
    icon: "⚒",
    description: "Curated cybersecurity tools, scripts, and automation resources for blue teamers.",
    status: "ACTIVE",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="font-pixel text-lg sm:text-xl neon-text text-center mb-4">
        // CITY_DISTRICTS
      </h2>
      <p className="text-center text-muted-foreground font-mono text-sm mb-12 max-w-lg mx-auto">
        Explore the districts of SIEM City. Each zone offers unique resources for cybersecurity professionals.
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={item}>
            <RetroWindow
              title={feature.title}
              accentColor={feature.status === "COMING SOON" ? "secondary" : "primary"}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <div className="flex-1">
                  <p className="font-mono text-sm text-card-foreground mb-3">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 ${
                        feature.status === "ACTIVE" ? "bg-primary" : "bg-secondary cursor-blink"
                      }`}
                    />
                    <span className="font-pixel text-[7px] text-muted-foreground">
                      {feature.status}
                    </span>
                  </div>
                </div>
              </div>
            </RetroWindow>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
