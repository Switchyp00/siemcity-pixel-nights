import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import RetroWindow from "@/components/RetroWindow";
import PixelButton from "@/components/PixelButton";
import { toast } from "sonner";

export interface AiMission { title: string; location: string; briefing: string; steps: string[]; skills: string[]; xp: number }
interface Saved { mission: AiMission; done: boolean[]; completed: boolean }
const KEY = "sc.aiMission";
const LEVELS = ["beginner", "intermediate", "advanced"] as const;

export default function AiMissionCreator({ username }: { username?: string }) {
  const [interests, setInterests] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("beginner");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState<Saved | null>(() => { try { return JSON.parse(localStorage.getItem(KEY) ?? "null"); } catch { return null; } });
  useEffect(() => { saved ? localStorage.setItem(KEY, JSON.stringify(saved)) : localStorage.removeItem(KEY); }, [saved]);

  const generate = async () => {
    setBusy(true); setErr("");
    const { data, error } = await supabase.functions.invoke("generate-mission", { body: { interests, level, username } });
    setBusy(false);
    if (error || data?.error) {
      let msg = data?.error ?? "Couldn't reach the mission generator.";
      try { const b = await (error as any)?.context?.json?.(); if (b?.error) msg = b.error; } catch { /* keep */ }
      return setErr(msg);
    }
    setSaved({ mission: data.mission, done: data.mission.steps.map(() => false), completed: false });
  };

  if (saved) {
    const { mission: m, done } = saved;
    const all = done.every(Boolean);
    return (
      <RetroWindow title="AI_MISSION.exe" accentColor="secondary">
        <p className="font-pixel text-[9px] neon-text">{m.title}</p>
        <p className="font-mono text-[10px] text-secondary mt-1">◆ {m.location} · {m.xp} XP</p>
        <p className="font-mono text-[11px] text-card-foreground/90 mt-3">{m.briefing}</p>
        <div className="mt-3 space-y-1">
          {m.steps.map((s, i) => (
            <button key={i} disabled={saved.completed} onClick={() => setSaved({ ...saved, done: done.map((d, j) => (j === i ? !d : d)) })}
              className="w-full text-left font-mono text-xs py-2 border-b border-border last:border-0 flex gap-2">
              <span className={done[i] ? "neon-text" : "text-muted-foreground"}>[{done[i] ? "✓" : " "}]</span>
              <span className={done[i] ? "line-through text-muted-foreground" : ""}>{s}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 mt-3">{m.skills.map((k) => <span key={k} className="font-mono text-[9px] border border-primary/50 text-primary px-2 py-0.5">{k}</span>)}</div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {saved.completed ? <p className="font-pixel text-[8px] neon-text self-center">✓ COMPLETE +{m.xp} XP</p> :
            <PixelButton className="!px-2" onClick={() => { if (!all) return toast("Tick off every step first"); setSaved({ ...saved, completed: true }); toast.success(`Mission complete! +${m.xp} XP`); }}>COMPLETE</PixelButton>}
          <button onClick={() => setSaved(null)} className="h-11 border-2 border-border font-pixel text-[8px] text-muted-foreground">NEW MISSION</button>
        </div>
      </RetroWindow>
    );
  }

  return (
    <RetroWindow title="MISSION_GENERATOR.ai" accentColor="secondary">
      <p className="font-mono text-[11px] text-card-foreground/90">Tell the city what you're into. Lovable AI will build a mission just for you.</p>
      <textarea value={interests} onChange={(e) => setInterests(e.target.value)} maxLength={600} rows={3}
        placeholder="e.g. Wazuh alerts, phishing analysis, learning Nmap…"
        className="mt-3 w-full bg-background border-2 border-border focus:border-primary outline-none p-3 font-mono text-xs text-card-foreground" />
      <div className="grid grid-cols-3 gap-2 mt-2">
        {LEVELS.map((l) => (
          <button key={l} onClick={() => setLevel(l)}
            className={`h-10 border-2 font-pixel text-[7px] ${level === l ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground"}`}>{l.toUpperCase()}</button>
        ))}
      </div>
      {err && <p className="font-mono text-[10px] text-destructive mt-2">{err}</p>}
      <PixelButton className="w-full mt-3 h-12" onClick={() => !busy && interests.trim().length >= 3 ? generate() : !busy && setErr("Tell us a bit about your interests.")}>
        {busy ? "GENERATING…" : "GENERATE MISSION"}
      </PixelButton>
    </RetroWindow>
  );
}
