import { Link } from "@tanstack/react-router";
import logoLight from "@/assets/logo-horizontal.svg";
import logoDark from "@/assets/logo-horizontal-inverted.svg";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

const Logo = ({ variant = "dark", className = "" }: LogoProps) => {
  const isLight = variant === "light";
  return (
    <Link
      to="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Studio Legale Accarino"
    >
      <img
        src={isLight ? logoDark : logoLight}
        alt="Studio Legale Accarino"
        className="h-10 w-auto md:h-11"
      />
    </Link>
  );
};

export default Logo;
