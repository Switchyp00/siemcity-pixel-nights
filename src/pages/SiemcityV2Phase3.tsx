import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RetroWindow from "@/components/RetroWindow";
import PixelButton from "@/components/PixelButton";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import installStart from "@/assets/screenshots/phase3-wazuh-install-start.png";
import installComplete from "@/assets/screenshots/phase3-wazuh-install-complete.png";
import netplanConfig from "@/assets/screenshots/phase3-netplan-config.png";
import ipA from "@/assets/screenshots/phase3-ip-a.png";
import wazuhDashboard from "@/assets/screenshots/phase3-wazuh-dashboard.png";
import dc1Agent from "@/assets/screenshots/phase3-dc1-agent.png";
import client1Agent from "@/assets/screenshots/phase3-client1-agent.png";
import kaliAgent from "@/assets/screenshots/phase3-kali-agent.png";

const screenshots = [
  {
    title: "WAZUH_INSTALL_START.png",
    src: installStart,
    caption: "Wazuh Install Start",
    description: "Wazuh installation initiated — version 4.7.5 with indexer setup beginning",
  },
  {
    title: "WAZUH_INSTALL_COMPLETE.png",
    src: installComplete,
    caption: "Wazuh Install Complete",
    description: "Installation completed successfully with dashboard credentials and service initialization",
  },
  {
    title: "NETPLAN_CONFIG.png",
    src: netplanConfig,
    caption: "Netplan Configuration",
    description: "Static IP configuration applied using tee to write netplan YAML",
  },
  {
    title: "IP_A_OUTPUT.png",
    src: ipA,
    caption: "IP Address Verification",
    description: "Interface enp0s3 confirmed with static IP 192.168.10.30/24",
  },
  {
    title: "WAZUH_DASHBOARD.png",
    src: wazuhDashboard,
    caption: "Wazuh Dashboard Home",
    description: "Dashboard initialized with SIEM modules and overview metrics",
  },
  {
    title: "DC1_AGENT.png",
    src: dc1Agent,
    caption: "DC1 Agent Running",
    description: "Wazuh agent service running on Domain Controller (STATE: RUNNING)",
  },
  {
    title: "CLIENT1_AGENT.png",
    src: client1Agent,
    caption: "Client1 Agent Running",
    description: "Wazuh agent active on Windows 10 endpoint confirming successful deployment",
  },
  {
    title: "KALI_AGENT.png",
    src: kaliAgent,
    caption: "Kali Agent Status",
    description: "Wazuh agent running on Kali Linux using systemctl status",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const SiemcityV2Phase3 = () => {
  const [lightbox, setLightbox] = useState<typeof screenshots[number] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-16 px-4 max-w-5xl mx-auto">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link
            to="/projects/siemcity-v2"
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
          >
            <span>←</span> Back to SIEMCITY
          </Link>
        </div>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-pixel text-[8px] bg-primary text-primary-foreground px-2 py-1">
              PHASE 3
            </span>
            <span className="font-pixel text-[8px] text-muted-foreground">
              PHASE 3 / 5 — SIEM
            </span>
          </div>
          <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl neon-text mb-3 leading-relaxed">
            Wazuh Setup & Agent Deployment
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            SOC Home Lab — SIEM Deployment & Monitoring
          </p>
        </motion.div>

        {/* Phase Overview */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // PHASE_OVERVIEW
          </h2>
          <RetroWindow title="OVERVIEW.md">
            <p className="font-mono text-sm text-card-foreground leading-relaxed">
              With the Active Directory environment established, Phase 3 focuses on deploying Wazuh 4.7.5 as the SIEM solution for SIEMCITY v2. This phase includes installing the Wazuh manager, indexer, and dashboard on Ubuntu 22.04, configuring a static IP for internal communication, and deploying agents across all monitored endpoints — enabling centralized logging, monitoring, and detection across the lab environment.
            </p>
          </RetroWindow>
        </motion.section>

        {/* Wazuh Installation */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // WAZUH_INSTALLATION
          </h2>
          <RetroWindow title="INSTALLATION.log">
            <div className="font-mono text-sm text-card-foreground leading-relaxed space-y-3">
              <p>The Wazuh all-in-one installer was executed on WazuhServer using:</p>
              <p className="neon-text pl-4">sudo bash wazuh-install.sh -a</p>
              <p>This automated deployment installed and configured:</p>
              <div className="pl-4 space-y-1">
                <p><span className="text-primary">•</span> Wazuh Indexer</p>
                <p><span className="text-primary">•</span> Wazuh Manager</p>
                <p><span className="text-primary">•</span> Filebeat</p>
                <p><span className="text-primary">•</span> Wazuh Dashboard</p>
              </div>
              <p>The installation completed successfully with the dashboard exposed over HTTPS on port 443.</p>
            </div>
          </RetroWindow>
        </motion.section>

        {/* Static IP Configuration */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // STATIC_IP_CONFIGURATION
          </h2>
          <RetroWindow title="NETPLAN_CONFIG.yaml">
            <div className="font-mono text-sm text-card-foreground leading-relaxed space-y-3">
              <p>A static IP was configured on WazuhServer to ensure stable internal communication.</p>
              <p>Interface configuration:</p>
              <div className="pl-4 space-y-1">
                <p><span className="text-primary">enp0s3</span> <span className="text-muted-foreground">→</span> <span className="neon-text">192.168.10.30/24</span> <span className="text-muted-foreground">(Lab Network)</span></p>
                <p><span className="text-primary">enp0s8</span> <span className="text-muted-foreground">→</span> <span className="neon-text">DHCP</span> <span className="text-muted-foreground">(Internet/NAT)</span></p>
              </div>
              <p>The configuration was applied using the tee method to write directly to:</p>
              <p className="neon-text pl-4">/etc/netplan/00-installer-config.yaml</p>
            </div>
          </RetroWindow>
        </motion.section>

        {/* Dashboard Access */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // DASHBOARD_ACCESS
          </h2>
          <RetroWindow title="DASHBOARD_ACCESS.txt">
            <div className="font-mono text-sm text-card-foreground leading-relaxed space-y-3">
              <p>The Wazuh dashboard was accessed via:</p>
              <p className="neon-text pl-4">https://192.168.10.30</p>
              <p>After accepting the self-signed certificate and authenticating with generated credentials, the dashboard successfully initialized and displayed system modules and agent status.</p>
            </div>
          </RetroWindow>
        </motion.section>

        {/* Agent Deployment */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // AGENT_DEPLOYMENT
          </h2>
          <RetroWindow title="AGENT_DEPLOYMENT.log">
            <div className="font-mono text-sm text-card-foreground leading-relaxed space-y-3">
              <p>Wazuh agents were deployed to all monitored systems:</p>
              <div className="pl-4 space-y-1">
                <p><span className="text-primary">•</span> <span className="neon-text">DC1</span> <span className="text-muted-foreground">(Windows Server 2022)</span></p>
                <p><span className="text-primary">•</span> <span className="neon-text">Client1</span> <span className="text-muted-foreground">(Windows 10 Pro)</span></p>
                <p><span className="text-primary">•</span> <span className="neon-text">Kali Linux</span> <span className="text-muted-foreground">(Attack Machine)</span></p>
              </div>
              <p className="text-primary mt-2">Windows agents:</p>
              <p>Installed via Wazuh dashboard deployment method and started using:</p>
              <p className="neon-text pl-4">NET START WazuhSvc</p>
              <p className="text-primary mt-2">Linux agent:</p>
              <p>Installed manually and enabled using:</p>
              <div className="pl-4 space-y-1">
                <p className="neon-text">sudo systemctl enable wazuh-agent</p>
                <p className="neon-text">sudo systemctl start wazuh-agent</p>
              </div>
              <p className="mt-2">All agents successfully connected to the Wazuh manager and reported as active.</p>
            </div>
          </RetroWindow>
        </motion.section>

        {/* Screenshots Gallery */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-2">
            // SCREENSHOTS
          </h2>
          <p className="font-mono text-xs text-muted-foreground mb-6">
            The following visuals validate SIEM deployment, network configuration, and agent connectivity across the environment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {screenshots.map((shot) => (
              <motion.div key={shot.title} variants={fadeUp}>
                <RetroWindow title={shot.title}>
                  <div
                    className="mb-3 cursor-pointer group"
                    onClick={() => setLightbox(shot)}
                  >
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      className="w-full border border-border [image-rendering:auto] group-hover:opacity-80 transition-opacity"
                      loading="lazy"
                    />
                    <span className="font-mono text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity block mt-1 text-center">
                      Click to enlarge
                    </span>
                  </div>
                  <h3 className="font-pixel text-[8px] text-primary mb-1">
                    {shot.caption}
                  </h3>
                  <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                    {shot.description}
                  </p>
                </RetroWindow>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Phase Navigation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="border-t-2 border-border pt-8"
        >
          <p className="font-mono text-sm text-muted-foreground mb-6 text-center">
            With centralized logging and monitoring established, Phase 4 focuses on executing attack simulations and analyzing detection events within Wazuh.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/projects/siemcity-v2/phase-2">
              <PixelButton variant="secondary">
                ← Previous Phase — Infrastructure & Domain Setup
              </PixelButton>
            </Link>
            <Link to="/projects/siemcity-v2/phase-4">
              <PixelButton variant="primary">
                Next Phase → Attack Simulation & Detection
              </PixelButton>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />

      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-4xl w-[95vw] bg-card border-border p-0 overflow-hidden">
          <DialogTitle className="sr-only">{lightbox?.caption}</DialogTitle>
          {lightbox && (
            <>
              <div className="bg-secondary px-3 py-2">
                <span className="font-pixel text-[8px] text-primary-foreground tracking-wider">
                  {lightbox.title}
                </span>
              </div>
              <div className="p-4">
                <img
                  src={lightbox.src}
                  alt={lightbox.caption}
                  className="w-full [image-rendering:auto]"
                />
                <p className="font-mono text-xs text-muted-foreground mt-3">
                  {lightbox.description}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SiemcityV2Phase3;
