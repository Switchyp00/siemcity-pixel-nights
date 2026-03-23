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

import addsWizard from "@/assets/screenshots/phase2-adds-wizard.png";
import aducUsers from "@/assets/screenshots/phase2-aduc-users.png";
import gpoLockout from "@/assets/screenshots/phase2-gpo-lockout.png";
import domainJoin from "@/assets/screenshots/phase2-domain-join.png";
import client1Aduc from "@/assets/screenshots/phase2-client1-aduc.png";
import asanaBoard from "@/assets/screenshots/phase2-asana-board.png";

const objectives = [
  "Promoted DC1 to Domain Controller",
  "Configured Active Directory domain — soclab.local",
  "Created domain users — jsmith and badactor",
  "Deployed SecurityBaseline GPO with account lockout policy",
  "Assigned static IP to Client1 (192.168.10.20)",
  "Joined Client1 to soclab.local domain",
  "Verified Client1 in ADUC Computers container",
];

const screenshots = [
  {
    title: "ADDS_WIZARD.png",
    src: addsWizard,
    caption: "AD DS Configuration Wizard",
    description:
      "DC1 promoted to Domain Controller using the Add New Forest option with root domain soclab.local",
  },
  {
    title: "ADUC_USERS.png",
    src: aducUsers,
    caption: "Active Directory Users and Computers",
    description:
      "ADUC showing soclab.local domain with domain users jsmith and badactor alongside default security groups",
  },
  {
    title: "GPO_LOCKOUT.png",
    src: gpoLockout,
    caption: "Group Policy Management Editor",
    description:
      "SecurityBaseline GPO configured with account lockout policy — 5 invalid attempts triggers a 30 minute lockout",
  },
  {
    title: "DOMAIN_JOIN.png",
    src: domainJoin,
    caption: "Domain Join Confirmation",
    description:
      "Client1 successfully joined to soclab.local domain — welcome confirmation dialog",
  },
  {
    title: "CLIENT1_ADUC.png",
    src: client1Aduc,
    caption: "Client1 in ADUC",
    description:
      "CLIENT1 visible in ADUC Computers container confirming successful domain join",
  },
  {
    title: "ASANA_PHASE2.png",
    src: asanaBoard,
    caption: "Asana Board",
    description:
      "Infrastructure & Domain Setup tasks completed — domain configuration, DNS setup, client join, and validation",
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

const SiemcityV2Phase2 = () => {
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
              PHASE 2
            </span>
            <span className="font-pixel text-[8px] text-muted-foreground">
              PHASE 2 / 5 — INFRASTRUCTURE
            </span>
          </div>
          <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl neon-text mb-3 leading-relaxed">
            Infrastructure & Domain Setup
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            SOC Home Lab — Active Directory Deployment
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
              Phase 2 focuses on deploying a fully functional Active Directory
              environment within the lab. DC1 was promoted to a Domain Controller
              for the soclab.local domain, domain users were created to simulate
              enterprise activity, a Security Baseline Group Policy was enforced,
              and Client1 was successfully joined to the domain — establishing the
              core infrastructure required for realistic attack simulation and
              detection.
            </p>
          </RetroWindow>
        </motion.section>

        {/* Key Objectives */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // KEY_OBJECTIVES
          </h2>
          <RetroWindow title="CHECKLIST.sh">
            <div className="space-y-2">
              {objectives.map((obj) => (
                <p key={obj} className="font-mono text-sm text-primary leading-relaxed">
                  <span className="text-primary">[✔]</span>{" "}
                  <span className="text-card-foreground">{obj}</span>
                </p>
              ))}
            </div>
          </RetroWindow>
        </motion.section>

        {/* Configuration Details */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // CONFIGURATION_DETAILS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RetroWindow title="DOMAIN_CONFIG.txt">
              <div className="space-y-1.5 font-mono text-sm">
                <p><span className="text-primary">Domain:</span> <span className="text-card-foreground">soclab.local</span></p>
                <p><span className="text-primary">NetBIOS:</span> <span className="text-card-foreground">SOCLAB</span></p>
                <p><span className="text-primary">DC Hostname:</span> <span className="text-card-foreground">DC1</span></p>
                <p><span className="text-primary">DC IP:</span> <span className="neon-text">192.168.10.10</span></p>
                <p><span className="text-primary">Forest Level:</span> <span className="text-card-foreground">Windows Server 2016</span></p>
                <p><span className="text-primary">DNS:</span> <span className="text-card-foreground">Integrated with Active Directory</span></p>
              </div>
            </RetroWindow>
            <RetroWindow title="USERS.txt">
              <div className="space-y-1.5 font-mono text-sm">
                <p><span className="neon-text">Administrator</span> <span className="text-muted-foreground">— Built-in domain admin</span></p>
                <p><span className="neon-text">jsmith</span> <span className="text-muted-foreground">— Standard domain user</span></p>
                <p><span className="neon-text">badactor</span> <span className="text-muted-foreground">— Simulated threat actor</span></p>
                <p className="text-muted-foreground text-xs mt-2 italic">(used in attack phase)</p>
              </div>
            </RetroWindow>
          </div>
        </motion.section>

        {/* GPO Section */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // GROUP_POLICY
          </h2>
          <RetroWindow title="SECURITYBASELINE_GPO.txt">
            <div className="space-y-1.5 font-mono text-sm">
              <p><span className="text-primary">GPO Name:</span> <span className="text-card-foreground">SecurityBaseline</span></p>
              <p><span className="text-primary">Linked To:</span> <span className="text-card-foreground">soclab.local</span></p>
              <p><span className="text-primary">Account Lockout Threshold:</span> <span className="neon-text">5 invalid attempts</span></p>
              <p><span className="text-primary">Account Lockout Duration:</span> <span className="neon-text">30 minutes</span></p>
              <p><span className="text-primary">Reset Lockout Counter:</span> <span className="neon-text">30 minutes</span></p>
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
            The following visuals validate Active Directory deployment, policy enforcement, and domain integration within the lab.
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
            With Active Directory fully configured, Phase 3 focuses on deploying Wazuh SIEM for centralized logging, monitoring, and detection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/projects/siemcity-v2">
              <PixelButton variant="secondary">
                ← Previous Phase — Lab Overview
              </PixelButton>
            </Link>
            <Link to="/projects/siemcity-v2/phase-3">
              <PixelButton variant="primary">
                Next Phase → Wazuh SIEM Deployment
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

export default SiemcityV2Phase2;
