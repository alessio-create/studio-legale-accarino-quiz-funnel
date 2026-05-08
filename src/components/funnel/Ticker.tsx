import type { ReactNode } from "react";

interface TickerProps {
  items: ReactNode[];
  variant?: "light" | "dark";
  speed?: "slow" | "normal" | "fast";
  separator?: ReactNode;
}

const Ticker = ({ items, variant = "light", speed = "normal", separator }: TickerProps) => {
  const isLight = variant === "light";
  const duration = speed === "slow" ? "60s" : speed === "fast" ? "25s" : "40s";
  const sep = separator ?? <span className="text-accent">◆</span>;

  return (
    <div
      className={`relative overflow-hidden border-y ${
        isLight ? "border-border bg-soft text-primary" : "border-primary-foreground/10 bg-primary text-primary-foreground"
      }`}
    >
      <div
        className="marquee flex w-max items-center gap-10 whitespace-nowrap py-5"
        style={{ animationDuration: duration }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-sm font-500 uppercase tracking-[0.2em] md:text-base">
              {item}
            </span>
            <span className="opacity-50">{sep}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
