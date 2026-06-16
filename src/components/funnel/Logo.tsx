import { Link } from "@tanstack/react-router";
import logoDark from "@/assets/logo-horizontal.svg";
import logoGold from "@/assets/logo-horizontal-gold.svg";
import logoLight from "@/assets/logo-horizontal-inverted.svg";
import monogramDark from "@/assets/monogram.svg";
import monogramLight from "@/assets/monogram-inverted.svg";
import verticalGoldAsset from "@/assets/logo-accarino-vertical.png.asset.json";

interface LogoProps {
  variant?: "dark" | "light" | "gold";
  className?: string;
  logomarkOnly?: boolean;
}

const SRC = {
  dark: logoDark,
  light: logoLight,
  gold: logoGold,
} as const;

const MONOGRAM = {
  dark: monogramDark,
  light: monogramLight,
  gold: verticalGoldAsset.url,
} as const;

const Logo = ({ variant = "dark", className = "", logomarkOnly = false }: LogoProps) => {
  const src = logomarkOnly ? MONOGRAM[variant] : SRC[variant];
  return (
    <Link
      to="/"
      className="inline-flex shrink-0 items-center"
      aria-label="Studio Legale Accarino"
    >
      <img
        src={src}
        alt="Studio Legale Accarino"
        className={className || "h-10 w-auto md:h-12"}
      />
    </Link>
  );
};

export default Logo;
