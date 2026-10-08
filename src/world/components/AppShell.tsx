import { Link, NavLink, Outlet } from "react-router-dom";
import { useCitizen } from "../state/CitizenContext";

const TABS = [
  { to: "/app/city", label: "CITY", icon: "▦" },
  { to: "/app/social", label: "SOCIAL", icon: "◎" },
  { to: "/app/home", label: "HOME", icon: "⌂" },
  { to: "/app/missions", label: "MISSIONS", icon: "◆" },
  { to: "/app/profile", label: "PROFILE", icon: "☺" },
];

export default function AppShell() {
  const { citizen } = useCitizen();
  return (
    <div className="h-[100dvh] flex flex-col bg-background max-w-md mx-auto border-x-2 border-border">
      <header className="h-12 shrink-0 flex items-center justify-between px-4 border-b-2 border-border bg-card/95">
        <Link to="/" className="font-pixel text-[8px] text-primary border-2 border-primary/60 px-2 h-8 flex items-center hover:bg-primary/10">← BACK TO SIEMCITY</Link>
        <span className="font-mono text-[10px] text-muted-foreground">{citizen?.networkAddress}</span>
      </header>
      <main className="flex-1 overflow-y-auto"><Outlet /></main>
      <nav className="shrink-0 grid grid-cols-5 border-t-2 border-border bg-card pb-[env(safe-area-inset-bottom)]">
        {TABS.map((t) => (
          <NavLink key={t.to} to={t.to} replace
            className={({ isActive }) => `flex flex-col items-center justify-center gap-1 h-16 font-pixel text-[7px] ${isActive ? "text-primary bg-primary/10" : "text-muted-foreground"}`}>
            <span className="text-lg leading-none">{t.icon}</span>{t.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
