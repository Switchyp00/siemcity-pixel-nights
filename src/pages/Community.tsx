import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RetroWindow from "@/components/RetroWindow";
import PixelButton from "@/components/PixelButton";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const communityFeatures = [
  "SOC lab builds and SIEM detection workflows",
  "Attack simulations and red team techniques",
  "Alert analysis and threat investigation",
  "Malware, networking, and security fundamentals",
  "Career paths, certifications, and progression",
  "Community-driven cybersecurity projects",
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero / Header */}
      <motion.section
        className="pt-28 pb-12 px-4 max-w-4xl mx-auto text-center"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <span className="font-pixel text-[9px] text-muted-foreground tracking-widest">
            [ COMMUNITY — COMING SOON ]
          </span>
        </motion.div>

        <motion.h1
          className="font-pixel text-2xl sm:text-3xl md:text-4xl neon-text mt-6 mb-4"
          variants={fadeUp}
        >
          SIEMCITY COMMUNITY
        </motion.h1>

        <motion.p
          className="font-pixel text-[9px] sm:text-[10px] purple-text tracking-wider mb-10"
          variants={fadeUp}
        >
          Cybersecurity. Built Through Practice.
        </motion.p>

        <motion.div className="max-w-2xl mx-auto" variants={fadeUp}>
          <RetroWindow title="README.md" accentColor="secondary">
            <p className="font-mono text-sm text-card-foreground leading-relaxed mb-4">
              SIEMCITY is expanding into a full cybersecurity community focused on hands-on learning, real-world labs, and practical skill development.
            </p>
            <p className="font-mono text-sm text-card-foreground leading-relaxed">
              This will be a space for people exploring blue team, red team, and everything in between — built around real projects, not just theory.
            </p>
          </RetroWindow>
        </motion.div>
      </motion.section>

      {/* What You'll Find */}
      <motion.section
        className="py-12 px-4 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
      >
        <motion.h2
          className="font-pixel text-sm sm:text-base neon-text text-center mb-8"
          variants={fadeUp}
        >
          {">"} WHAT_YOU_WILL_FIND
        </motion.h2>

        <motion.div className="max-w-2xl mx-auto" variants={fadeUp}>
          <RetroWindow title="TOPICS.log" accentColor="primary">
            <div className="space-y-3">
              {communityFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                >
                  <span className="neon-text font-mono text-xs shrink-0">$</span>
                  <p className="font-mono text-xs text-card-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </RetroWindow>
        </motion.div>
      </motion.section>

      {/* Early Access */}
      <motion.section
        className="py-12 px-4 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
      >
        <motion.div className="max-w-2xl mx-auto" variants={fadeUp}>
          <RetroWindow title="EARLY_ACCESS.txt" accentColor="secondary">
            <p className="font-mono text-sm text-card-foreground leading-relaxed mb-4">
              SIEMCITY Community is currently in development.
            </p>
            <p className="font-mono text-sm text-card-foreground leading-relaxed">
              Be among the first to join when it launches and help shape the direction of the platform.
            </p>
          </RetroWindow>
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-12 pb-20 px-4 max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
      >
        <motion.p
          className="font-pixel text-[8px] text-muted-foreground tracking-widest mb-6"
          variants={fadeUp}
        >
          Be part of the first wave.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeUp}
        >
          <a href="#" onClick={(e) => e.preventDefault()}>
            <PixelButton variant="primary">GET EARLY ACCESS</PixelButton>
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <PixelButton variant="secondary">JOIN DISCORD</PixelButton>
          </a>
        </motion.div>

        <motion.p
          className="font-mono text-[10px] text-muted-foreground mt-10"
          variants={fadeUp}
        >
          Powered by real projects — not just theory.
        </motion.p>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Community;
