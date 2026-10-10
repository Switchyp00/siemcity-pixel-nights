import type { Citizen, Homebase, AvatarConfig } from "../models";
import { STARTER_INVENTORY, STARTER_LAYOUT } from "../data/furniture";
import { SIM_CITIZENS } from "../data/simCitizens";
import { supabase } from "@/integrations/supabase/client";
import { generateAddress } from "./networkAddress";
import { migrateAvatar } from "../data/avatarParts";

// Repository interfaces: UI talks to these, never to the database directly.
// Same tables/IDs are intended for future native (Kotlin Multiplatform) clients.
export interface CitizenRepository {
  getCurrent(): Promise<Citizen | null>;
  create(username: string, avatar: AvatarConfig): Promise<Citizen>;
  update(id: string, patch: Partial<Citizen>): Promise<void>;
  isUsernameTaken(name: string): Promise<boolean>;
}
export interface HomebaseRepository {
  getForOwner(ownerId: string): Promise<Homebase | null>;
  save(h: Homebase): Promise<void>;
  createStarter(ownerId: string, name: string): Promise<Homebase>;
}

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
export const newId = uid;

type CitizenRow = {
  id: string; username: string; display_name: string; network_address: string; district: number;
  avatar: unknown; bio: string; tutorial_done: boolean; created_at: string;
};
const toCitizen = (r: CitizenRow, homebaseId = ""): Citizen => ({
  id: r.id, username: r.username, displayName: r.display_name || r.username, networkAddress: r.network_address,
  district: r.district, avatar: migrateAvatar(r.avatar as AvatarConfig), bio: r.bio, tutorialDone: r.tutorial_done,
  createdAt: r.created_at, homebaseId,
});

async function currentUserId() {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export const cloudCitizenRepo: CitizenRepository = {
  async getCurrent() {
    const id = await currentUserId();
    if (!id) return null;
    const { data, error } = await supabase.from("citizens").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const { data: hb } = await supabase.from("homebases").select("id").eq("owner_id", id).maybeSingle();
    return toCitizen(data as CitizenRow, hb?.id ?? "");
  },
  async create(username, avatar) {
    const id = await currentUserId();
    if (!id) throw new Error("Not signed in");
    // Unique address enforced by DB; retry on collision.
    for (let i = 0; i < 8; i++) {
      const { address, district } = generateAddress(new Set(SIM_CITIZENS.map((s) => s.networkAddress)));
      const { data, error } = await supabase.from("citizens")
        .insert({ id, username, display_name: username, network_address: address, district, avatar: avatar as never })
        .select("*").single();
      if (!error) return toCitizen(data as CitizenRow);
      if (error.code === "23505" && /username/.test(error.message)) throw new Error("Handle already on the network");
      if (error.code !== "23505") throw error;
    }
    throw new Error("Couldn't allocate a network address, try again");
  },
  async update(id, patch) {
    const row: { avatar?: never; bio?: string; display_name?: string; tutorial_done?: boolean } = {};
    if (patch.avatar) row.avatar = patch.avatar as never;
    if (patch.bio !== undefined) row.bio = patch.bio;
    if (patch.displayName !== undefined) row.display_name = patch.displayName;
    if (patch.tutorialDone !== undefined) row.tutorial_done = patch.tutorialDone;
    if (!Object.keys(row).length) return;
    const { error } = await supabase.from("citizens").update(row).eq("id", id);
    if (error) throw error;
  },
  async isUsernameTaken(name) {
    if (SIM_CITIZENS.some((s) => s.username.toLowerCase() === name.toLowerCase())) return true;
    const { data } = await supabase.from("citizens").select("id").ilike("username", name.replace(/[%_\\]/g, "\\$&")).limit(1);
    return !!data?.length;
  },
};

type HomeRow = { id: string; owner_id: string; name: string; width: number; height: number; floor: string; placed: unknown; inventory: unknown };
const toHome = (r: HomeRow): Homebase => ({
  id: r.id, ownerId: r.owner_id, name: r.name, width: r.width, height: r.height, floor: r.floor,
  placed: r.placed as Homebase["placed"], inventory: r.inventory as string[],
});

export const cloudHomebaseRepo: HomebaseRepository = {
  async getForOwner(ownerId) {
    const { data, error } = await supabase.from("homebases").select("*").eq("owner_id", ownerId).maybeSingle();
    if (error) throw error;
    return data ? toHome(data as HomeRow) : null;
  },
  async save(h) {
    const { error } = await supabase.from("homebases")
      .update({ name: h.name, placed: h.placed as never, inventory: h.inventory as never, floor: h.floor }).eq("id", h.id);
    if (error) throw error;
  },
  async createStarter(ownerId, name) {
    const { data, error } = await supabase.from("homebases").insert({
      owner_id: ownerId, name: `${name}'s Homebase`, width: 8, height: 8, floor: "wood",
      placed: STARTER_LAYOUT.map((p) => ({ ...p, uid: uid() })) as never, inventory: [...STARTER_INVENTORY] as never,
    }).select("*").single();
    if (error) throw error;
    return toHome(data as HomeRow);
  },
};
