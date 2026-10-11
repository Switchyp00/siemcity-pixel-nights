import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { CitizenProvider, useCitizen } from "@/world/state/CitizenContext";
import AvatarSprite from "@/world/components/AvatarSprite";
import { supabase } from "@/integrations/supabase/client";
import PixelButton from "@/components/PixelButton";

const NAV = [
  { to: "/city", label: "CITY", icon: "▦" },
  { to: "/citizen/home", label: "HOME", icon: "⌂" },
  { to: "/community", label: "SOCIAL", icon: "◎" },
  { to: "/citizen", label: "PROFILE", icon: "☺", end: true },
  { to: "/citizen/creator", label: "CUSTOMIZE", icon: "✦" },
];

function DesktopLogin() {
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [err, setErr] = useState("");
  const go = async () => { setErr(""); const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw }); if (error) setErr(error.message); };
  const cls = "h-11 w-full bg-card border-2 border-border focus:border-primary outline-none px-3 font-mono text-sm text-card-foreground";
  return (
    <div className="max-w-sm mx-auto mt-24 retro-window p-6 flex flex-col gap-3">
      <p className="font-pixel text-[10px] neon-text">&gt; RECONNECT TO SIEMCITY</p>
      <input className={cls} type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className={cls} type="password" placeholder="password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} />
      {err && <p className="font-mono text-[10px] text-destructive">{err}</p>}
      <PixelButton onClick={go}>LOG IN</PixelButton>
      <p className="font-mono text-[10px] text-muted-foreground">New here? <Link to="/app" className="text-secondary underline">Create a Citizen</Link></p>
    </div>
  );
}

function Layout() {
  const { citizen, loading, session } = useCitizen();
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-56 shrink-0 border-r-2 border-border bg-card/60 flex flex-col">
        <Link to="/" className="px-5 py-5 border-b-2 border-border">
          <p className="font-pixel text-base"><span className="neon-text">SIEM</span><span className="purple-text">CITY</span></p>
          <p className="font-mono text-[9px] text-muted-foreground mt-1">EXPRESS YOURSELF. CONNECT YOUR WORLD.</p>
        </Link>
        <nav className="flex flex-col py-3">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) => `flex items-center gap-3 px-5 h-12 font-pixel text-[9px] border-l-4 ${isActive ? "border-primary text-primary bg-primary/10" : "border-transparent text-muted-foreground hover:text-card-foreground"}`}>
              <span className="text-base w-5">{n.icon}</span>{n.label}
            </NavLink>
          ))}
        </nav>
        {citizen && (
          <Link to="/citizen" className="m-3 mt-auto retro-window p-3 flex gap-3 items-center">
            <AvatarSprite avatar={citizen.avatar} size={36} />
            <div className="min-w-0">
              <p className="font-pixel text-[7px] text-primary">● ONLINE</p>
              <p className="font-pixel text-[9px] text-card-foreground truncate">{citizen.username}</p>
              <p className="font-mono text-[9px] text-muted-foreground">{citizen.networkAddress}</p>
            </div>
          </Link>
        )}
      </aside>
      <main className="flex-1 min-w-0">
        {loading ? <p className="p-8 font-mono text-xs neon-text">CONNECTING…</p>
          : !session ? <DesktopLogin />
          : !citizen ? <p className="p-8 font-mono text-sm">No Citizen yet — <Link to="/app" className="text-secondary underline">create one</Link>.</p>
          : <Outlet />}
      </main>
    </div>
  );
}

export default function DesktopShell() {
  return <CitizenProvider><Layout /></CitizenProvider>;
}

export function PageHeader({ title, sub, right }: { title: string; sub: string; right?: React.ReactNode }) {
  return (
    <header className="flex items-center justify-between gap-4 px-8 py-5 border-b-2 border-border">
      <div><h1 className="font-pixel text-xl neon-text">{title}</h1><p className="font-mono text-xs text-muted-foreground mt-2">{sub}</p></div>
      {right}
    </header>
  );
}
