import type { SimCitizen } from "../models";

// Small simulated population so the city doesn't feel empty. Replace with presence service later.
export const SIM_CITIZENS: SimCitizen[] = [
  { id: "sim1", username: "packet_pixie", networkAddress: "192.SC.03.77", online: true, location: "Terminal Café", status: "brewing coffee + pcaps",
    avatar: { body: "s1", eyes: "glow", brows: "flat", mouth: "smile", hair: "long", hairColor: "#ff8fab", top: "hoodie", topColor: "#1b1b2f", bottom: "pants", bottomColor: "#3a3a5a", shoes: "neon", accessory: "headset" } },
  { id: "sim2", username: "rootkit_ronin", networkAddress: "192.SC.11.204", online: true, location: "Homebase", status: "rearranging my server rack",
    avatar: { body: "s4", eyes: "dot", brows: "bold", mouth: "smirk", hair: "mohawk", hairColor: "#00ff9c", top: "jacket", topColor: "#e94560", bottom: "cargo", bottomColor: "#1b1b2f", shoes: "boots", accessory: "visor" } },
  { id: "sim3", username: "blue_team_bea", networkAddress: "192.SC.07.12", online: false, location: "Offline", status: "rule 60204 enjoyer",
    avatar: { body: "s3", eyes: "wide", brows: "flat", mouth: "open", hair: "bun", hairColor: "#6b4226", top: "tee", topColor: "#4cc9f0", bottom: "shorts", bottomColor: "#3a3a5a", shoes: "sneaker", accessory: "badge" } },
];
