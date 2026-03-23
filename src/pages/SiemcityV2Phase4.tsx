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

import nmapSubnet from "@/assets/screenshots/phase4-nmap-subnet.png";
import nmapMeta from "@/assets/screenshots/phase4-nmap-metasploitable.png";
import wazuhRule510 from "@/assets/screenshots/phase4-wazuh-rule510.png";
import metasploitExploit from "@/assets/screenshots/phase4-metasploit-exploit.png";
import credentialDump from "@/assets/screenshots/phase4-credential-dump.png";
import hydraBrute from "@/assets/screenshots/phase4-hydra-bruteforce.png";
import wazuhT1110 from "@/assets/screenshots/phase4-wazuh-t1110.png";
import wazuhDiscover from "@/assets/screenshots/phase4-wazuh-discover.png";

type Screenshot = {
  title: string;
  src: string;
  caption: string;
  description: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const SiemcityV2Phase4 = () => {
  const [lightbox, setLightbox] = useState<Screenshot | null>(null);

  const renderScreenshot = (shot: Screenshot) => (
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
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-16 px-4 max-w-5xl mx-auto">
        {/* Breadcrumb */}
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
              PHASE 4
            </span>
            <span className="font-pixel text-[8px] text-muted-foreground">
              PHASE 4 / 5 — ATTACK & DETECTION
            </span>
          </div>
          <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl neon-text mb-3 leading-relaxed">
            Attack Simulations & Detection
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            SOC Home Lab — MITRE ATT&CK Validation
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
              With the lab fully operational, Phase 4 focused on simulating real attacker behavior using the MITRE ATT&CK framework and validating that Wazuh detected each technique. Attacks were launched from the Kali Linux machine (192.168.10.40) against DC1, Client1, and Metasploitable 2. Every simulation was mapped to a specific ATT&CK technique and confirmed with Wazuh alerts.
            </p>
          </RetroWindow>
        </motion.section>

        {/* Section 1: Network Reconnaissance */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // NETWORK_RECONNAISSANCE (T1046)
          </h2>
          <RetroWindow title="RECON.log">
            <div className="font-mono text-sm text-card-foreground leading-relaxed space-y-3">
              <p>The first step in any attack is reconnaissance. An Nmap service and OS detection scan was run against the full lab subnet, mapping all live hosts and open services:</p>
              <p className="neon-text pl-4">nmap -sV -O 192.168.10.0/24</p>
              <p>A follow-up scan targeted Metasploitable 2 directly, revealing a wide attack surface including <span className="neon-text">vsftpd 2.3.4</span> on port 21 — a known vulnerable service.</p>
              <p>Wazuh detected the scan activity and generated <span className="text-primary">Rule 510</span> rootcheck alerts on the Kali agent.</p>
            </div>
          </RetroWindow>
        </motion.section>

        {/* Recon Screenshots */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderScreenshot({
              title: "NMAP_SUBNET_SCAN.png",
              src: nmapSubnet,
              caption: "Nmap Full Subnet Scan",
              description: "Nmap service and OS detection scan across 192.168.10.0/24 — DC1, Client1, and WazuhServer discovered with open ports and OS fingerprints",
            })}
            {renderScreenshot({
              title: "NMAP_METASPLOITABLE.png",
              src: nmapMeta,
              caption: "Nmap Metasploitable 2 Scan",
              description: "Targeted scan of 192.168.10.50 revealing vsftpd 2.3.4, OpenSSH, MySQL, PostgreSQL, and full open port list",
            })}
            {renderScreenshot({
              title: "WAZUH_RULE510.png",
              src: wazuhRule510,
              caption: "Wazuh Rule 510 Alerts",
              description: "Wazuh Security Alerts showing Rule 510 rootcheck detection events triggered by Kali agent during reconnaissance",
            })}
          </div>
        </motion.section>

        {/* Section 2: Exploitation */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // EXPLOITATION_AND_CREDENTIAL_ACCESS (T1190, T1003)
          </h2>
          <RetroWindow title="EXPLOIT.log">
            <div className="font-mono text-sm text-card-foreground leading-relaxed space-y-3">
              <p>Using Metasploit, the <span className="neon-text">vsftpd 2.3.4 backdoor</span> exploit was launched against Metasploitable 2. The exploit opened a root shell on the target machine.</p>
              <p>From the root shell, sensitive credential files were dumped:</p>
              <div className="pl-4 space-y-1">
                <p className="neon-text">/etc/passwd</p>
                <p className="neon-text">/etc/shadow</p>
              </div>
              <p>This exposed all system users and hashed passwords, simulating post-exploitation credential harvesting.</p>
            </div>
          </RetroWindow>
        </motion.section>

        {/* Exploitation Screenshots */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderScreenshot({
              title: "METASPLOIT_EXPLOIT.png",
              src: metasploitExploit,
              caption: "Metasploit vsftpd Exploit",
              description: "Metasploit console showing vsftpd_234_backdoor exploit execution — root shell opened on Metasploitable 2 (whoami = root)",
            })}
            {renderScreenshot({
              title: "CREDENTIAL_DUMP.png",
              src: credentialDump,
              caption: "Credential Dump Output",
              description: "/etc/passwd and /etc/shadow dump exposing all system user accounts and password hashes from the compromised target",
            })}
          </div>
        </motion.section>

        {/* Section 3: Brute Force */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // CREDENTIAL_BRUTE_FORCE (T1110)
          </h2>
          <RetroWindow title="BRUTEFORCE.log">
            <div className="font-mono text-sm text-card-foreground leading-relaxed space-y-3">
              <p>Hydra was used to launch an SMB brute force attack against Client1, targeting the Administrator account:</p>
              <p className="neon-text pl-4">hydra -l Administrator -P /usr/share/wordlists/rockyou.txt smb://192.168.10.20 -t 4 -V</p>
              <p>Wazuh immediately detected the attack, triggering <span className="text-primary">Rule 60204</span> at <span className="text-primary">Level 10</span> — the highest severity seen in the lab — with MITRE technique <span className="neon-text">T1110 (Credential Access)</span> auto-tagged in the dashboard.</p>
            </div>
          </RetroWindow>
        </motion.section>

        {/* Brute Force Screenshots */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderScreenshot({
              title: "HYDRA_BRUTEFORCE.png",
              src: hydraBrute,
              caption: "Hydra SMB Brute Force",
              description: "Hydra brute force attack targeting Administrator account on Client1 (192.168.10.20) using rockyou.txt wordlist",
            })}
            {renderScreenshot({
              title: "WAZUH_T1110.png",
              src: wazuhT1110,
              caption: "Wazuh Rule 60204 — T1110 Detection",
              description: "Wazuh Security Alerts showing Rule 60204 at Level 10 — Multiple Windows logon failures with MITRE T1110 Credential Access auto-tagged",
            })}
          </div>
        </motion.section>

        {/* Section 4: Additional Detections */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // ADDITIONAL_DETECTIONS
          </h2>
          <RetroWindow title="DETECTIONS.log">
            <div className="font-mono text-sm text-card-foreground leading-relaxed space-y-3">
              <p>Beyond the primary attack chain, Wazuh generated several additional notable alerts throughout Phase 4:</p>
              <div className="pl-4 space-y-1">
                <p><span className="text-primary">•</span> <span className="neon-text">Registry Key Integrity</span> change detected on DC1</p>
                <p><span className="text-primary">•</span> <span className="neon-text">NTLM authentication</span> alert flagged as a possible pass-the-hash attempt</p>
                <p><span className="text-primary">•</span> <span className="neon-text">AppArmor DENIED</span> events on WazuhServer</p>
              </div>
              <p>These demonstrate that Wazuh was actively monitoring across all agents throughout the simulation.</p>
            </div>
          </RetroWindow>
        </motion.section>

        {/* Additional Detection Screenshot */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderScreenshot({
              title: "WAZUH_DISCOVER.png",
              src: wazuhDiscover,
              caption: "Wazuh Alert Timeline",
              description: "Wazuh Discover view filtered to rule.level >=5 showing the full alert timeline across the attack chain — including NTLM, registry, and AppArmor events",
            })}
          </div>
        </motion.section>

        {/* Detection Summary */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-pixel text-sm neon-text mb-4">
            // DETECTION_SUMMARY
          </h2>
          <RetroWindow title="SUMMARY.md">
            <div className="font-mono text-sm text-card-foreground leading-relaxed space-y-3">
              <p>Wazuh successfully detected all simulated attack techniques across multiple stages of the attack chain:</p>
              <div className="pl-4 space-y-1">
                <p><span className="text-primary">•</span> Reconnaissance activity detected via rootcheck alerts (<span className="neon-text">Rule 510</span>)</p>
                <p><span className="text-primary">•</span> Exploitation phase correlated with abnormal system behavior</p>
                <p><span className="text-primary">•</span> Credential dumping activity confirmed via sensitive file access</p>
                <p><span className="text-primary">•</span> Brute force attack detected with high severity <span className="neon-text">Rule 60204</span> (<span className="text-primary">Level 10</span>)</p>
                <p><span className="text-primary">•</span> Additional alerts included <span className="neon-text">NTLM authentication</span> anomalies and <span className="neon-text">registry integrity</span> changes</p>
              </div>
              <p>This validates that the SIEM deployment provides full visibility across the attack lifecycle, from initial reconnaissance to post-exploitation.</p>
            </div>
          </RetroWindow>
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
            With attack simulations validated and detections confirmed, Phase 5 focuses on custom detection rules, MITRE ATT&CK mapping, and final reporting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/projects/siemcity-v2/phase-3">
              <PixelButton variant="secondary">
                ← Previous Phase — Wazuh Setup & Agent Deployment
              </PixelButton>
            </Link>
            <Link to="/projects/siemcity-v2/phase-5">
              <PixelButton variant="primary">
                Next Phase → Custom Rules & Reporting
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

export default SiemcityV2Phase4;
