import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCitizen } from "../state/CitizenContext";
import AvatarCreator from "../components/AvatarCreator";
import AvatarSprite from "../components/AvatarSprite";
import PixelButton from "@/components/PixelButton";
import type { AvatarConfig, Citizen } from "../models";
import { localCitizenRepo } from "../services/repositories";

const BOOT = ["INITIALIZING CONNECTION...", "ROUTING PACKETS...", "SIEMCITY NETWORK FOUND.", "CONNECTING...", "CONNECTION ESTABLISHED."];
type Step = "boot" | "welcome" | "name" | "avatar" | "registered";

export default function Onboarding() {
  const { citizen, register, loading } = useCitizen();
  const nav = useNavigate();
  const [step, setStep] = useState<Step>("boot");
  const [lines, setLines] = useState(0);
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [created, setCreated] = useState<Citizen | null>(null);

  useEffect(() => {
    if (step !== "boot") return;
    if (lines >= BOOT.length) { const t = setTimeout(() => setStep("welcome"), 600); return () => clearTimeout(t); }
    const t = setTimeout(() => setLines((l) => l + 1), 450);
    return () => clearTimeout(t);
  }, [step, lines]);

  if (loading) return null;
  if (citizen && !created) return <Navigate to="/app/home" replace />;

  const submitName = async () => {
    const n = name.trim();
    if (!/^[a-zA-Z0-9_]{3,16}$/.test(n)) return setErr("3-16 chars: letters, numbers, _");
    if (await localCitizenRepo.isUsernameTaken(n)) return setErr("Handle already on the network");
    setErr(""); setStep("avatar");
  };
  const saveAvatar = async (a: AvatarConfig) => { setCreated(await register(name.trim(), a)); setStep("registered"); };

  return (
    <div className="min-h-[100dvh] max-w-md mx-auto px-5 py-8 flex flex-col bg-background scanline">
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
            <PixelButton className="w-full h-14" onClick={() => setStep("name")}>CREATE CITIZEN</PixelButton>
            <PixelButton variant="secondary" className="w-full h-14" onClick={() => setErr("Accounts arrive with Cloud sync — create a citizen for now.")}>LOG IN</PixelButton>
            {err && <p className="font-mono text-[10px] text-destructive">{err}</p>}
          </div>
        </div>
      )}
      {step === "name" && (
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <p className="font-pixel text-[9px] neon-text">&gt; CHOOSE YOUR HANDLE</p>
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} maxLength={16} onKeyDown={(e) => e.key === "Enter" && submitName()}
            className="h-14 bg-card border-2 border-border focus:border-primary outline-none px-4 font-mono text-card-foreground" placeholder="packet_runner" />
          {err && <p className="font-mono text-[10px] text-destructive">{err}</p>}
          <PixelButton className="h-14" onClick={submitName}>CONTINUE</PixelButton>
          <button onClick={() => setStep("welcome")} className="font-pixel text-[7px] text-muted-foreground">‹ BACK</button>
        </div>
      )}
      {step === "avatar" && (
        <>
          <p className="font-pixel text-[9px] neon-text mb-4">&gt; BUILD YOUR CITIZEN</p>
          <AvatarCreator onSave={saveAvatar} saveLabel="SAVE" />
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
