import { useEffect, useState } from "react";

interface TerminalTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const TerminalText = ({ text, speed = 50, className = "" }: TerminalTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`font-mono ${className}`}>
      {displayed}
      <span className={`${done ? "cursor-blink" : ""} neon-text`}>█</span>
    </span>
  );
};

export default TerminalText;
