import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

interface BannerProps {
  variant?: "light" | "dark";
  showCta?: boolean;
}

const Banner = ({ variant = "light", showCta = true }: BannerProps) => {
  const isLight = variant === "light";
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-md ${
        isLight ? "border-border bg-background/85" : "border-primary-foreground/10 bg-primary/85"
      }`}
    >
      <div className={`container flex h-20 items-center ${showCta ? "justify-between" : "justify-center"}`}>
        <Logo variant={isLight ? "dark" : "light"} />
        {showCta && (
          <div className="flex items-center gap-3">
            <span
              className={`hidden text-xs uppercase tracking-[0.2em] md:inline ${
                isLight ? "text-muted-foreground" : "text-primary-foreground/60"
              }`}
            >
              Risposta in 24h
            </span>
            <Button asChild variant="cta" size="default">
              <Link to="/quiz">Verifica il tuo caso</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Banner;
