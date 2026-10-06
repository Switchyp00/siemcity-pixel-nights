import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import type { AvatarConfig, Citizen, Homebase } from "../models";
import { localCitizenRepo, localHomebaseRepo, newId } from "../services/repositories";
import { generateAddress } from "../services/networkAddress";

interface Ctx {
  loading: boolean;
  citizen: Citizen | null;
  homebase: Homebase | null;
  register: (username: string, avatar: AvatarConfig) => Promise<Citizen>;
  updateCitizen: (patch: Partial<Citizen>) => Promise<void>;
  saveHomebase: (h: Homebase) => Promise<void>;
  signOut: () => Promise<void>;
}

const CitizenCtx = createContext<Ctx | null>(null);
const citizens = localCitizenRepo;
const homes = localHomebaseRepo;

export function CitizenProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [citizen, setCitizen] = useState<Citizen | null>(null);
  const [homebase, setHomebase] = useState<Homebase | null>(null);

  useEffect(() => {
    (async () => {
      const c = await citizens.getCurrent();
      setCitizen(c);
      if (c) setHomebase(await homes.get(c.homebaseId));
      setLoading(false);
    })();
  }, []);

  const register = useCallback(async (username: string, avatar: AvatarConfig) => {
    const { address, district } = generateAddress(await citizens.takenAddresses());
    const id = newId();
    const hb = await homes.createStarter(id, username);
    const c: Citizen = { id, username, avatar, networkAddress: address, district, homebaseId: hb.id, createdAt: new Date().toISOString(), tutorialDone: false };
    await citizens.save(c);
    setCitizen(c); setHomebase(hb);
    return c;
  }, []);

  const updateCitizen = useCallback(async (patch: Partial<Citizen>) => {
    setCitizen((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      citizens.save(next);
      return next;
    });
  }, []);

  const saveHomebase = useCallback(async (h: Homebase) => { setHomebase(h); await homes.save(h); }, []);
  const signOut = useCallback(async () => { await citizens.signOut(); setCitizen(null); setHomebase(null); }, []);

  return (
    <CitizenCtx.Provider value={{ loading, citizen, homebase, register, updateCitizen, saveHomebase, signOut }}>
      {children}
    </CitizenCtx.Provider>
  );
}

export function useCitizen() {
  const c = useContext(CitizenCtx);
  if (!c) throw new Error("useCitizen must be inside CitizenProvider");
  return c;
}
