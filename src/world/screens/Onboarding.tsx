import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCitizen } from "../state/CitizenContext";
import AvatarCreator from "../components/AvatarCreator";
import AvatarSprite from "../components/AvatarSprite";
import PixelButton from "@/components/PixelButton";
import type { AvatarConfig, Citizen } from "../models";
import { cloudCitizenRepo } from "../services/repositories";
import { supabase } from "@/integrations/supabase/client";

const BOOT = ["INITIALIZING CONNECTION...", "ROUTING PACKETS...", "SIEMCITY NETWORK FOUND.", "CONNECTING...", "CONNECTION ESTABLISHED."];
type Step = "boot" | "welcome" | "signup" | "login" | "forgot" | "check" | "name" | "avatar" | "registered";
const input = "h-12 w-full bg-card border-2 border-border focus:border-primary outline-none px-4 font-mono text-sm text-card-foreground";

export default function Onboarding() {
  const { session, citizen, register, loading } = useCitizen();
  const nav = useNavigate();
  const [step, setStep] = useState<Step>("boot");
  const [lines, setLines] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<Citizen | null>(null);

  useEffect(() => {
    if (step !== "boot") return;
    if (lines >= BOOT.length) { const t = setTimeout(() => setStep("welcome"), 600); return () => clearTimeout(t); }
    const t = setTimeout(() => setLines((l) => l + 1), 450);
    return () => clearTimeout(t);
  }, [step, lines]);

  // Signed in but no citizen yet -> continue to handle creation.
  useEffect(() => {
    if (!loading && session && !citizen && !["name", "avatar", "registered"].includes(step)) setStep("name");
  }, [loading, session, citizen, step]);

  if (loading && step !== "boot") return <p className="p-6 font-mono text-xs neon-text">CONNECTING…</p>;
  if (citizen && !created) return <Navigate to="/app/home" replace />;

  const go = (s: Step) => { setErr(""); setInfo(""); setStep(s); };
  const run = async (fn: () => Promise<void>) => { setBusy(true); setErr(""); try { await fn(); } catch (e) { setErr((e as Error).message); } setBusy(false); };

  const signUp = () => run(async () => {
    if (pw.length < 8) throw new Error("Password must be at least 8 characters");
    const { data, error } = await supabase.auth.signUp({ email: email.trim(), password: pw, options: { emailRedirectTo: `${window.location.origin}/app` } });
    if (error) throw error;
    if (!data.session) go("check");
  });
  const signIn = () => run(async () => {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw });
    if (error) throw error;
  });
  const forgot = () => run(async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
    if (error) throw error;
    setInfo("If that email is registered, a reset link is on its way.");
  });
  const submitName = () => run(async () => {
    const n = name.trim();
    if (!/^[a-zA-Z0-9_]{3,16}$/.test(n)) throw new Error("3-16 chars: letters, numbers, _");
    if (await cloudCitizenRepo.isUsernameTaken(n)) throw new Error("Handle already on the network");
    setStep("avatar");
  });
  const saveAvatar = (a: AvatarConfig) => run(async () => { setCreated(await register(name.trim(), a)); setStep("registered"); });

  return (
    <div className="min-h-[100dvh] max-w-md mx-auto px-5 py-8 flex flex-col bg-background scanline">
      <Link to="/" className="self-start font-pixel text-[8px] text-primary border-2 border-primary/60 px-2 h-8 flex items-center hover:bg-primary/10">← BACK TO SIEMCITY</Link>
      {step === "boot" && (
        <div className="flex-1 flex flex-col justify-center font-mono text-sm gap-2">
          {BOOT.slice(0, lines).map((l, i) => <p key={l} className={i === BOOT.length - 1 ? "neon-text" : "text-muted-foreground"}>&gt; {l}</p>)}
          <span className="neon-text cursor-blink">█</span>
          <button onClick={() => setStep("welcome")} className="mt-8 self-end font-pixel text-[7px] text-muted-foreground">SKIP ›</button>
        </div>
      )}
      {step === "welcome" && (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
          <h1 className="font-pixel text-3xl"><span className="neon-text">SIEM</span><span className="purple-text">CITY</span></h1>
          <p className="font-mono text-xs text-muted-foreground">A living digital city. Build a home. Meet citizens. Explore the network.</p>
          <div className="w-full flex flex-col gap-3 mt-6">
            <PixelButton className="w-full h-14" onClick={() => go("signup")}>CREATE CITIZEN</PixelButton>
            <PixelButton variant="secondary" className="w-full h-14" onClick={() => go("login")}>LOG IN</PixelButton>
          </div>
        </div>
      )}
      {(step === "signup" || step === "login" || step === "forgot") && (
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <p className="font-pixel text-[9px] neon-text">&gt; {step === "signup" ? "REGISTER ON THE NETWORK" : step === "login" ? "RECONNECT" : "RESET PASSWORD"}</p>
          <input className={input} type="email" autoComplete="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {step !== "forgot" && (
            <input className={input} type="password" autoComplete={step === "signup" ? "new-password" : "current-password"} placeholder="password"
              value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (step === "signup" ? signUp() : signIn())} />
          )}
          {err && <p className="font-mono text-[10px] text-destructive">{err}</p>}
          {info && <p className="font-mono text-[10px] text-primary">{info}</p>}
          <PixelButton className="h-14" onClick={() => !busy && (step === "signup" ? signUp() : step === "login" ? signIn() : forgot())}>
            {busy ? "…" : step === "signup" ? "CREATE ACCOUNT" : step === "login" ? "LOG IN" : "SEND RESET LINK"}
          </PixelButton>
          <div className="flex justify-between">
            <button onClick={() => go("welcome")} className="font-pixel text-[7px] text-muted-foreground">‹ BACK</button>
            {step === "login" && <button onClick={() => go("forgot")} className="font-pixel text-[7px] text-secondary">FORGOT PASSWORD?</button>}
            {step === "signup" && <button onClick={() => go("login")} className="font-pixel text-[7px] text-secondary">HAVE AN ACCOUNT?</button>}
          </div>
        </div>
      )}
      {step === "check" && (
        <div className="flex-1 flex flex-col gap-4 justify-center text-center">
          <p className="font-pixel text-[9px] neon-text">CHECK YOUR INBOX</p>
          <p className="font-mono text-xs text-card-foreground">We sent a verification link to <b>{email}</b>. Open it to activate your account, then log in.</p>
          <PixelButton className="h-12" onClick={() => go("login")}>GO TO LOG IN</PixelButton>
        </div>
      )}
      {step === "name" && (
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <p className="font-pixel text-[9px] neon-text">&gt; CHOOSE YOUR HANDLE</p>
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} maxLength={16} onKeyDown={(e) => e.key === "Enter" && submitName()}
            className={input + " h-14"} placeholder="packet_runner" />
          {err && <p className="font-mono text-[10px] text-destructive">{err}</p>}
          <PixelButton className="h-14" onClick={() => !busy && submitName()}>{busy ? "…" : "CONTINUE"}</PixelButton>
          <button onClick={() => supabase.auth.signOut().then(() => go("welcome"))} className="font-pixel text-[7px] text-muted-foreground">LOG OUT</button>
        </div>
      )}
      {step === "avatar" && (
        <>
          <p className="font-pixel text-[9px] neon-text mb-4">&gt; BUILD YOUR CITIZEN</p>
          {err && <p className="font-mono text-[10px] text-destructive mb-2">{err}</p>}
          <AvatarCreator onSave={saveAvatar} saveLabel={busy ? "…" : "SAVE"} />
        </>
      )}
      {step === "registered" && created && (
        <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center pixel-fade-in">
          <p className="font-pixel text-[9px] neon-text">CITIZEN REGISTERED</p>
          <AvatarSprite avatar={created.avatar} size={96} />
          <p className="font-pixel text-xs text-card-foreground">{created.username}</p>
          <div className="retro-window w-full p-4 font-mono text-xs text-left space-y-1">
            <p><span className="text-muted-foreground">NETWORK ADDRESS:</span> <span className="neon-text">{created.networkAddress}</span></p>
            <p><span className="text-muted-foreground">DISTRICT:</span> {String(created.district).padStart(2, "0")}</p>
            <p><span className="text-muted-foreground">HOMEBASE:</span> assigned ✓</p>
          </div>
          <PixelButton className="w-full h-14" onClick={() => nav("/app/home", { replace: true })}>ENTER HOMEBASE</PixelButton>
        </div>
      )}
    </div>
  );
}
