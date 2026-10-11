import { Link, useNavigate } from "react-router-dom";
import { useCitizen } from "@/world/state/CitizenContext";
import AvatarSprite from "@/world/components/AvatarSprite";
import { PageHeader } from "./DesktopShell";

export default function DesktopProfile() {
  const { citizen, homebase, signOut } = useCitizen();
  const nav = useNavigate();
  if (!citizen) return null;
  const card = "retro-window p-5 hover:brightness-125 transition";
  return (
    <>
      <PageHeader title="CITIZEN PROFILE" sub="YOUR IDENTITY ON THE SIEMCITY NETWORK." />
      <div className="p-8 grid lg:grid-cols-[320px_1fr] gap-6">
        <div className="retro-window p-6 flex flex-col items-center gap-4">
          <AvatarSprite avatar={citizen.avatar} size={150} />
          <p className="font-pixel text-sm text-card-foreground">{citizen.username}</p>
          <div className="w-full font-mono text-xs space-y-1">
            <p><span className="text-muted-foreground">NETWORK ADDRESS:</span> <span className="neon-text">{citizen.networkAddress}</span></p>
            <p><span className="text-muted-foreground">DISTRICT:</span> {String(citizen.district).padStart(2, "0")}</p>
            <p><span className="text-muted-foreground">JOINED:</span> {new Date(citizen.createdAt).toLocaleDateString()}</p>
          </div>
          <button onClick={() => signOut().then(() => nav("/city"))} className="font-pixel text-[8px] text-muted-foreground hover:text-destructive">LOG OUT</button>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 content-start">
          <Link to="/citizen/home" className={card}><p className="font-pixel text-[10px] neon-text">⌂ HOMEBASE</p><p className="font-mono text-xs text-muted-foreground mt-2">{homebase?.placed.length ?? 0} items placed · decorate your room</p></Link>
          <Link to="/citizen/creator" className={card}><p className="font-pixel text-[10px] neon-text">✦ CITIZEN CREATOR</p><p className="font-mono text-xs text-muted-foreground mt-2">Change your look</p></Link>
          <Link to="/city" className={card}><p className="font-pixel text-[10px] neon-text">▦ CITY</p><p className="font-mono text-xs text-muted-foreground mt-2">Visit districts and chat</p></Link>
        </div>
      </div>
    </>
  );
}
