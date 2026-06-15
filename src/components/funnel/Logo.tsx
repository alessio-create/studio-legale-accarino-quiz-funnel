import { Link } from "@tanstack/react-router";
import logoDark from "@/assets/logo-horizontal.svg";
import logoGold from "@/assets/logo-horizontal-gold.svg";
import logoLight from "@/assets/logo-horizontal-inverted.svg";

interface LogoProps {
  variant?: "dark" | "light" | "gold";
  className?: string;
}

const SRC = {
  dark: logoDark,
  light: logoLight,
  gold: logoGold,
} as const;

const Logo = ({ variant = "dark", className = "" }: LogoProps) => {
  return (
    <Link
      to="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Studio Legale Accarino"
    >
      <img
        src={SRC[variant]}
        alt="Studio Legale Accarino"
        className="h-16 w-auto md:h-20"
      />
    </Link>
  );
};

export default Logo;
