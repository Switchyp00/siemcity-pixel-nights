import RetroWindow from "./RetroWindow";
import { motion } from "framer-motion";

const features = [
  {
    title: "AD_LAB.exe",
    icon: "🏢",
    description: "Active Directory lab with Domain Controller + workstation. Realistic enterprise environment for detection engineering.",
    status: "ACTIVE",
  },
  {
    title: "ATTACK_CHAIN.exe",
    icon: "⚔",
    description: "Nmap recon → vsftpd exploit → credential access → lateral movement. Real attack chains using Kali + Metasploitable.",
    status: "ACTIVE",
  },
  {
    title: "WAZUH_SIEM.exe",
    icon: "🛡",
    description: "Centralized logging & detection with Wazuh agents. Custom detection rules + MITRE ATT&CK mapping in progress.",
    status: "ACTIVE",
  },
  {
    title: "COMMUNITY.exe",
    icon: "💬",
    description: "Share labs, detection write-ups, and incident scenarios. A space for aspiring SOC analysts to learn together.",
    status: "COMING SOON",
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
        // LAB_INFRASTRUCTURE
      </h2>
      <p className="text-center text-muted-foreground font-mono text-sm mb-12 max-w-lg mx-auto">
        A production-style, open-source SOC lab. Built for hands-on detection engineering and real attack simulation.
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
