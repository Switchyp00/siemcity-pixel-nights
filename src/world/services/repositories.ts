import type { Citizen, Homebase } from "../models";
import { STARTER_INVENTORY, STARTER_LAYOUT } from "../data/furniture";
import { SIM_CITIZENS } from "../data/simCitizens";

// Repository interfaces: swap LocalStorage implementations for Cloud-backed ones later.
export interface CitizenRepository {
  getCurrent(): Promise<Citizen | null>;
  save(c: Citizen): Promise<void>;
  isUsernameTaken(name: string): Promise<boolean>;
  takenAddresses(): Promise<Set<string>>;
  signOut(): Promise<void>;
}
export interface HomebaseRepository {
  get(id: string): Promise<Homebase | null>;
  save(h: Homebase): Promise<void>;
  createStarter(ownerId: string, name: string): Promise<Homebase>;
}

const K = { citizen: "sc.citizen", homes: "sc.homebases" };
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
const read = <T,>(k: string, d: T): T => {
  try { return JSON.parse(localStorage.getItem(k) ?? "") as T; } catch { return d; }
};

export const localCitizenRepo: CitizenRepository = {
  async getCurrent() { return read<Citizen | null>(K.citizen, null); },
  async save(c) { localStorage.setItem(K.citizen, JSON.stringify(c)); },
  async isUsernameTaken(name) {
    return SIM_CITIZENS.some((s) => s.username.toLowerCase() === name.toLowerCase());
  },
  async takenAddresses() { return new Set(SIM_CITIZENS.map((s) => s.networkAddress)); },
  async signOut() { localStorage.removeItem(K.citizen); },
};

export const localHomebaseRepo: HomebaseRepository = {
  async get(id) { return read<Record<string, Homebase>>(K.homes, {})[id] ?? null; },
  async save(h) {
    const all = read<Record<string, Homebase>>(K.homes, {});
    all[h.id] = h;
    localStorage.setItem(K.homes, JSON.stringify(all));
  },
  async createStarter(ownerId, name) {
    const h: Homebase = {
      id: uid(), ownerId, name: `${name}'s Homebase`, width: 8, height: 8, floor: "grid",
      placed: STARTER_LAYOUT.map((p) => ({ ...p, uid: uid() })),
      inventory: [...STARTER_INVENTORY],
    };
    await this.save(h);
    return h;
  },
};

export const newId = uid;
