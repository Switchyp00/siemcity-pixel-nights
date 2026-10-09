import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import type { AvatarConfig, Citizen, Homebase } from "../models";
import { cloudCitizenRepo, cloudHomebaseRepo } from "../services/repositories";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Ctx {
  loading: boolean;
  session: Session | null;
  citizen: Citizen | null;
  homebase: Homebase | null;
  register: (username: string, avatar: AvatarConfig) => Promise<Citizen>;
  updateCitizen: (patch: Partial<Citizen>) => Promise<void>;
  saveHomebase: (h: Homebase) => Promise<void>;
  signOut: () => Promise<void>;
}

const CitizenCtx = createContext<Ctx | null>(null);
const citizens = cloudCitizenRepo;
const homes = cloudHomebaseRepo;

export function CitizenProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [citizen, setCitizen] = useState<Citizen | null>(null);
  const [homebase, setHomebase] = useState<Homebase | null>(null);
  const loadedFor = useRef<string | null>(null);

  const load = useCallback(async (s: Session | null) => {
    const uidNow = s?.user.id ?? null;
    if (loadedFor.current === uidNow) { setLoading(false); return; }
    loadedFor.current = uidNow;
    if (!uidNow) { setCitizen(null); setHomebase(null); setLoading(false); return; }
    setLoading(true);
    try {
      const c = await citizens.getCurrent();
      setCitizen(c);
      setHomebase(c ? await homes.getForOwner(c.id) : null);
    } catch (e) { toast.error("Couldn't load your citizen: " + (e as Error).message); }
    setLoading(false);
  }, []);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { setSession(s); setTimeout(() => load(s), 0); });
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); load(data.session); });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const register = useCallback(async (username: string, avatar: AvatarConfig) => {
    const c = await citizens.create(username, avatar);
    const hb = await homes.createStarter(c.id, username);
    const full = { ...c, homebaseId: hb.id };
    setCitizen(full); setHomebase(hb);
    return full;
  }, []);

  const updateCitizen = useCallback(async (patch: Partial<Citizen>) => {
    if (!citizen) return;
    setCitizen({ ...citizen, ...patch });
    try { await citizens.update(citizen.id, patch); } catch (e) { toast.error("Save failed: " + (e as Error).message); }
  }, [citizen]);

  const saveHomebase = useCallback(async (h: Homebase) => {
    setHomebase(h);
    try { await homes.save(h); } catch (e) { toast.error("Homebase save failed: " + (e as Error).message); }
  }, []);

  const signOut = useCallback(async () => { await supabase.auth.signOut(); }, []);

  return (
    <CitizenCtx.Provider value={{ loading, session, citizen, homebase, register, updateCitizen, saveHomebase, signOut }}>
      {children}
    </CitizenCtx.Provider>
  );
}

export function useCitizen() {
  const c = useContext(CitizenCtx);
  if (!c) throw new Error("useCitizen must be inside CitizenProvider");
  return c;
}
