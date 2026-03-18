import { ReactNode } from "react";

interface RetroWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  accentColor?: "primary" | "secondary";
}

const RetroWindow = ({ title, children, className = "", accentColor = "secondary" }: RetroWindowProps) => {
  const barColor = accentColor === "primary" 
    ? "bg-primary" 
    : "bg-secondary";
  
  return (
    <div className={`retro-window ${className}`}>
      <div className={`${barColor} px-3 py-2 flex items-center justify-between`}>
        <span className="font-pixel text-[8px] text-primary-foreground tracking-wider">{title}</span>
        <div className="flex gap-1">
          <span className="w-3 h-3 border border-primary-foreground/50 flex items-center justify-center text-[6px] font-pixel text-primary-foreground">_</span>
          <span className="w-3 h-3 border border-primary-foreground/50 flex items-center justify-center text-[6px] font-pixel text-primary-foreground">□</span>
          <span className="w-3 h-3 border border-primary-foreground/50 flex items-center justify-center text-[6px] font-pixel text-primary-foreground">×</span>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default RetroWindow;
