import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { AvatarConfig, Citizen } from "../models";
import { toast } from "sonner";

export interface PresentCitizen { id: string; username: string; avatar: AvatarConfig; x: number; y: number }
interface Msg { id: string; author_id: string; content: string; created_at: string }

// Live presence for one district: tracks the signed-in citizen's position, returns everyone else in the room.
export function useDistrictPresence(locationId: string, me: Citizen | null, pos: { x: number; y: number }) {
  const [others, setOthers] = useState<PresentCitizen[]>([]);
  const ch = useRef<ReturnType<typeof supabase.channel> | null>(null);
  useEffect(() => {
    if (!me) return;
    const channel = supabase.channel(`presence:${locationId}`, { config: { presence: { key: me.id } } });
    channel.on("presence", { event: "sync" }, () => {
      const state = channel.presenceState<PresentCitizen>();
      setOthers(Object.entries(state).filter(([k]) => k !== me.id).map(([, v]) => v[v.length - 1]));
    }).subscribe((s) => { if (s === "SUBSCRIBED") channel.track({ id: me.id, username: me.username, avatar: me.avatar, ...pos }); });
    ch.current = channel;
    return () => { ch.current = null; supabase.removeChannel(channel); setOthers([]); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationId, me?.id]);
  useEffect(() => { if (me) ch.current?.track({ id: me.id, username: me.username, avatar: me.avatar, ...pos }); }, [pos.x, pos.y, me]);
  return others;
}

export default function DistrictChat({ locationId, name, me }: { locationId: string; name: string; me: Citizen | null }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [text, setText] = useState("");
  const [open, setOpen] = useState(true);
  const end = useRef<HTMLDivElement>(null);

  const resolve = async (ids: string[]) => {
    const missing = ids.filter((i) => !names[i]);
    if (!missing.length) return;
    const { data } = await supabase.from("citizens").select("id,username").in("id", missing);
    if (data) setNames((n) => ({ ...n, ...Object.fromEntries(data.map((c) => [c.id, c.username])) }));
  };

  useEffect(() => {
    if (!me) return;
    let alive = true;
    supabase.from("district_messages").select("id,author_id,content,created_at").eq("location_id", locationId)
      .order("created_at", { ascending: false }).limit(50).then(({ data, error }) => {
        if (error) return toast.error(error.message);
        if (!alive || !data) return;
        setMsgs(data.reverse()); resolve(data.map((m) => m.author_id));
      });
    const channel = supabase.channel(`chat:${locationId}`).on("postgres_changes",
      { event: "INSERT", schema: "public", table: "district_messages", filter: `location_id=eq.${locationId}` },
      (p) => { const m = p.new as Msg; setMsgs((x) => x.some((y) => y.id === m.id) ? x : [...x, m].slice(-100)); resolve([m.author_id]); }).subscribe();
    return () => { alive = false; supabase.removeChannel(channel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationId, me?.id]);
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [msgs.length, open]);

  const send = async () => {
    const c = text.trim();
    if (!c || !me) return;
    if (c.length > 280) return toast.error("Max 280 characters");
    setText("");
    const { error } = await supabase.from("district_messages").insert({ location_id: locationId, content: c });
    if (error) { toast.error(error.message.includes("Slow down") ? "Slow down — one message per second" : error.message); setText(c); }
  };
  const report = async (id: string) => {
    const { error } = await supabase.from("message_reports").insert({ message_id: id });
    toast[error ? "error" : "success"](error ? "Already reported" : "Reported to moderators");
  };

  return (
    <div className="retro-window flex flex-col w-full sm:w-80 max-h-[60vh] sm:max-h-[70vh]" onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen(!open)} className="flex justify-between items-center px-3 py-2 border-b-2 border-border font-pixel text-[8px] neon-text">
        <span># {name.toUpperCase()} CHAT</span><span>{open ? "–" : "+"}</span>
      </button>
      {open && (!me ? (
        <p className="p-3 font-mono text-[11px] text-muted-foreground">Log in with a Citizen to chat and appear here.</p>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-32">
            {msgs.length === 0 && <p className="font-mono text-[10px] text-muted-foreground">No messages yet. Say hi.</p>}
            {msgs.map((m) => (
              <div key={m.id} className="group font-mono text-[11px] leading-snug">
                <span className={m.author_id === me.id ? "neon-text" : "purple-text"}>{names[m.author_id] ?? "…"}</span>
                <span className="text-muted-foreground text-[9px] ml-2">{new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                {m.author_id !== me.id && <button onClick={() => report(m.id)} className="ml-2 text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive">report</button>}
                <p className="text-card-foreground break-words">{m.content}</p>
              </div>
            ))}
            <div ref={end} />
          </div>
          <div className="flex gap-2 p-2 border-t-2 border-border">
            <input value={text} maxLength={280} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Say something…" className="flex-1 h-9 bg-background border-2 border-border focus:border-primary outline-none px-2 font-mono text-xs text-card-foreground" />
            <button onClick={send} className="h-9 px-3 border-2 border-primary text-primary font-pixel text-[8px] hover:bg-primary/10">SEND</button>
          </div>
        </>
      ))}
    </div>
  );
}
