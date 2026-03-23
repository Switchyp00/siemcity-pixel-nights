import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RetroWindow from "@/components/RetroWindow";
import PixelButton from "@/components/PixelButton";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import archDiagram from "@/assets/screenshots/architecture-diagram.png";
import vboxGroup1 from "@/assets/screenshots/vbox-group1.png";
import vboxGroup2 from "@/assets/screenshots/vbox-group2.png";
import asanaBoard from "@/assets/screenshots/asana-board.png";

const techBadges = [
  "VirtualBox",
  "Windows Server 2022",
  "Windows 10 Pro",
  "Kali Linux",
  "Ubuntu 22.04",
  "Wazuh 4.7.5",
];

const vmData = [
  { vm: "DC1", role: "Domain Controller", os: "Windows Server 2022", ip: "192.168.10.10" },
  { vm: "Client1", role: "Workstation", os: "Windows 10 Pro", ip: "192.168.10.20" },
  { vm: "WazuhServer", role: "SIEM", os: "Ubuntu 22.04", ip: "192.168.10.30" },
  { vm: "Kali Linux", role: "Attacker", os: "Kali Linux", ip: "192.168.10.40" },
  { vm: "Metasploitable2", role: "Vulnerable Target", os: "Linux", ip: "192.168.10.50" },
];

const screenshots = [
  {
    title: "ARCHITECTURE.png",
    src: archDiagram,
    caption: "Architecture Diagram",
    description:
      "Lab network topology showing all 5 VMs connected on the 192.168.10.0/24 internal network with Wazuh SIEM as the central monitoring hub",
  },
  {
    title: "VBOX_GROUP1.png",
    src: vboxGroup1,
    caption: "VirtualBox VM List — Group 1",
    description:
      "VirtualBox Manager showing Client1 (Windows 10 Pro) and DC1 (Windows Server 2022) configured with 2GB RAM and 2 CPUs each",
  },
  {
    title: "VBOX_GROUP2.png",
    src: vboxGroup2,
    caption: "VirtualBox VM List — Group 2",
    description:
      "Metasploitable2, Kali Linux, and WazuhServer configured in VirtualBox. Kali and Wazuh allocated 4GB RAM for optimal performance",
  },
  {
    title: "ASANA_BOARD.png",
    src: asanaBoard,
    caption: "Asana Project Board",
    description:
      "Project tasks tracked in Asana across three phases: Lab Introduction, Infrastructure & Domain Setup, and Attack Simulation — all tasks completed on schedule",
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

const SiemcityV2 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-16 px-4 max-w-5xl mx-auto">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link
            to="/"
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
              PHASE 1
            </span>
            <span className="font-pixel text-[8px] text-muted-foreground">
              OVERVIEW
            </span>
          </div>
          <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl neon-text mb-3 leading-relaxed">
            SIEMCITY v2
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            SOC Home Lab — Project Documentation
          </p>
        </motion.div>

        {/* Project Overview */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // PROJECT_OVERVIEW
          </h2>
          <RetroWindow title="README.md">
            <p className="font-mono text-sm text-card-foreground leading-relaxed">
              SIEMCITY v2 is a fully virtualized SOC home lab built to simulate
              real-world attack and defense scenarios. The lab consists of 5
              virtual machines running on VirtualBox, configured across an
              isolated internal network. It features a Windows Server 2022
              Domain Controller, a Windows 10 Pro workstation, a Kali Linux
              attack machine, a Wazuh SIEM server, and a Metasploitable 2
              vulnerable target. All attack simulations are mapped to the MITRE
              ATT&CK framework and detected by Wazuh.
            </p>
          </RetroWindow>
        </motion.section>

        {/* Tech Stack Badges */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // TECH_STACK
          </h2>
          <div className="flex flex-wrap gap-3">
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="font-mono text-xs border-2 border-border bg-card px-3 py-1.5 text-card-foreground hover:border-primary/50 transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Network Overview Table */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // NETWORK_OVERVIEW
          </h2>
          <RetroWindow title="NETWORK_MAP.csv">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="font-pixel text-[8px] text-primary">VM</TableHead>
                    <TableHead className="font-pixel text-[8px] text-primary">ROLE</TableHead>
                    <TableHead className="font-pixel text-[8px] text-primary">OS</TableHead>
                    <TableHead className="font-pixel text-[8px] text-primary">IP ADDRESS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vmData.map((row) => (
                    <TableRow key={row.vm} className="border-border">
                      <TableCell className="font-mono text-xs text-card-foreground font-medium">
                        {row.vm}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {row.role}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {row.os}
                      </TableCell>
                      <TableCell className="font-mono text-xs neon-text">
                        {row.ip}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
          <h2 className="font-pixel text-sm neon-text mb-4">
            // SCREENSHOTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {screenshots.map((shot) => (
              <motion.div key={shot.title} variants={fadeUp}>
                <RetroWindow title={shot.title}>
                  <div className="mb-3">
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      className="w-full border border-border"
                      loading="lazy"
                    />
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
          className="border-t-2 border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="font-pixel text-[7px] text-muted-foreground mb-1">
              CURRENT PAGE
            </p>
            <p className="font-pixel text-[9px] text-card-foreground">
              Phase 1 — Lab Overview
            </p>
          </div>
          <PixelButton variant="primary">
            Next Phase → Infrastructure & Domain Setup
          </PixelButton>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SiemcityV2;
