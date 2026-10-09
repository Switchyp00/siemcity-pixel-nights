import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PixelButton from "@/components/PixelButton";

export default function ResetPassword() {
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const save = async () => {
    if (pw.length < 8) return setMsg("Password must be at least 8 characters");
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) return setMsg(error.message);
    setMsg("Password updated. Redirecting…");
    setTimeout(() => nav("/app", { replace: true }), 1000);
  };
  return (
    <div className="min-h-[100dvh] max-w-md mx-auto px-5 py-16 flex flex-col gap-4 bg-background">
      <p className="font-pixel text-[9px] neon-text">&gt; SET NEW PASSWORD</p>
      <input type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)}
        className="h-12 bg-card border-2 border-border focus:border-primary outline-none px-4 font-mono text-sm text-card-foreground" placeholder="new password" />
      {msg && <p className="font-mono text-[10px] text-card-foreground">{msg}</p>}
      <PixelButton className="h-12" onClick={save}>UPDATE PASSWORD</PixelButton>
    </div>
  );
}
