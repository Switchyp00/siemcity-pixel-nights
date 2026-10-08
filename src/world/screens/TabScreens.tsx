import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCitizen } from "../state/CitizenContext";
import { SIM_CITIZENS } from "../data/simCitizens";
import AvatarSprite from "../components/AvatarSprite";
import AvatarCreator from "../components/AvatarCreator";
import RetroWindow from "@/components/RetroWindow";
import { toast } from "sonner";
import AiMissionCreator from "../components/AiMissionCreator";

const LOCATIONS = [
  { id: "home", name: "Your Homebase", to: "/app/home", open: true },
  { id: "cafe", name: "Terminal Café", open: false },
  { id: "lab", name: "SOC Lab Archive", href: "/projects/siemcity-v2", open: true },
  { id: "plaza", name: "Packet Plaza", open: false },
];

export function CityScreen() {
  return (
    <div className="p-4 space-y-3">
      <h2 className="font-pixel text-[10px] neon-text">&gt; CITY MAP</h2>
      <div className="grid grid-cols-2 gap-3">
        {LOCATIONS.map((l) => {
          const body = (
            <div className={`h-28 border-2 p-3 flex flex-col justify-between ${l.open ? "border-primary/60 bg-card" : "border-border bg-card/50 opacity-70"}`}>
              <span className="font-pixel text-[8px] text-card-foreground">{l.name}</span>
              <span className={`font-pixel text-[6px] ${l.open ? "text-primary" : "text-secondary"}`}>{l.open ? "OPEN" : "UNDER CONSTRUCTION"}</span>
            </div>
          );
          return l.to ? <Link key={l.id} to={l.to}>{body}</Link> : l.href ? <a key={l.id} href={l.href}>{body}</a> : <div key={l.id}>{body}</div>;
        })}
      </div>
    </div>
  );
}

export function SocialScreen() {
  return (
    <div className="p-4 space-y-3">
      <h2 className="font-pixel text-[10px] neon-text">&gt; CITIZENS NEARBY</h2>
      {SIM_CITIZENS.map((c) => (
        <div key={c.id} className="retro-window p-3 flex items-center gap-3">
          <AvatarSprite avatar={c.avatar} size={36} />
          <div className="flex-1 min-w-0">
            <p className="font-pixel text-[8px] text-card-foreground">{c.username}</p>
            <p className="font-mono text-[9px] text-muted-foreground truncate">{c.networkAddress} · {c.online ? c.location : "offline"}</p>
            <p className="font-mono text-[10px] text-card-foreground/80 truncate">"{c.status}"</p>
          </div>
          <button onClick={() => toast("Friend requests unlock in the next update")} className="h-10 px-3 border-2 border-secondary font-pixel text-[7px] text-secondary">+ ADD</button>
        </div>
      ))}
    </div>
  );
}

export function MissionsScreen() {
  const { citizen, homebase } = useCitizen();
  const m = [
    { t: "Register as a citizen", done: !!citizen },
    { t: "Finish the homebase intro", done: !!citizen?.tutorialDone },
    { t: "Place an item from inventory", done: (homebase?.placed.length ?? 0) > 7 },
    { t: "Visit Terminal Café", done: false },
  ];
  return (
    <div className="p-4 space-y-4">
      <AiMissionCreator username={citizen?.username} />
      <RetroWindow title="MISSIONS.log" accentColor="primary">
        {m.map((x) => (
          <p key={x.t} className="font-mono text-xs py-2 border-b border-border last:border-0">
            <span className={x.done ? "neon-text" : "text-muted-foreground"}>[{x.done ? "✓" : " "}]</span> {x.t}
          </p>
        ))}
      </RetroWindow>
    </div>
  );
}

export function ProfileScreen() {
  const { citizen, updateCitizen, signOut } = useCitizen();
  const [edit, setEdit] = useState(false);
  const nav = useNavigate();
  if (!citizen) return null;
  if (edit) return <div className="p-4"><AvatarCreator initial={citizen.avatar} onSave={(a) => { updateCitizen({ avatar: a }); setEdit(false); toast.success("Avatar saved"); }} /></div>;
  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <AvatarSprite avatar={citizen.avatar} size={96} />
      <p className="font-pixel text-xs">{citizen.username}</p>
      <p className="font-mono text-sm neon-text">{citizen.networkAddress}</p>
      <p className="font-mono text-[10px] text-muted-foreground">Citizen since {new Date(citizen.createdAt).toLocaleDateString()}</p>
      <button onClick={() => setEdit(true)} className="w-full h-12 border-2 border-primary font-pixel text-[8px] text-primary">EDIT AVATAR</button>
      <a href="/community" className="w-full h-12 border-2 border-secondary font-pixel text-[8px] text-secondary flex items-center justify-center">COMMUNITY</a>
      <button onClick={async () => { await signOut(); nav("/app", { replace: true }); }} className="w-full h-12 border-2 border-destructive font-pixel text-[8px] text-destructive">RESET CITIZEN</button>
    </div>
  );
}
