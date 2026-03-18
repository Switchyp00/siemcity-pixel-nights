import { ReactNode } from "react";

interface PixelButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}

const PixelButton = ({ children, variant = "primary", className = "", onClick }: PixelButtonProps) => {
  const base = "font-pixel text-xs px-6 py-3 border-2 transition-all duration-100 cursor-pointer active:translate-y-[2px]";
  const variants = {
    primary: "bg-primary text-primary-foreground border-primary hover:brightness-110 shadow-[4px_4px_0_0_hsl(var(--muted))]  active:shadow-[2px_2px_0_0_hsl(var(--muted))]",
    secondary: "bg-secondary text-secondary-foreground border-secondary hover:brightness-110 shadow-[4px_4px_0_0_hsl(var(--muted))] active:shadow-[2px_2px_0_0_hsl(var(--muted))]",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default PixelButton;
