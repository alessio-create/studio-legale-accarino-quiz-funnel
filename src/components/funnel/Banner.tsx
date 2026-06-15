import { useEffect, useState } from "react";
import Logo from "./Logo";

interface BannerProps {
  variant?: "light" | "dark";
  /** Reactive — switches from primary/gold to white/dark on scroll. Default true on landing. */
  scrollAware?: boolean;
  showCta?: boolean;
}

const Banner = ({ variant = "light", scrollAware = false }: BannerProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!scrollAware) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollAware]);

  // Resolve effective theme
  const isDark = scrollAware ? !scrolled : variant === "dark";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 ease-out ${
        isDark
          ? "border-primary-foreground/10 bg-primary/95"
          : "border-border bg-background/90 shadow-card"
      }`}
    >
      <div className="container flex h-24 items-center justify-center md:h-28">
        <div
          className={`transition-opacity duration-500 ease-out ${
            isDark ? "opacity-100" : "opacity-0 pointer-events-none absolute"
          }`}
          aria-hidden={!isDark}
        >
          <Logo variant="gold" />
        </div>
        <div
          className={`transition-opacity duration-500 ease-out ${
            isDark ? "opacity-0 pointer-events-none absolute" : "opacity-100"
          }`}
          aria-hidden={isDark}
        >
          <Logo variant="dark" />
        </div>
      </div>
    </header>
  );
};

export default Banner;
