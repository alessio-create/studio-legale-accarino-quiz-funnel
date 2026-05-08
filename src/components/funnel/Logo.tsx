import { Link } from "@tanstack/react-router";
import logoAccarino from "@/assets/logo-accarino.svg";

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
        src={logoAccarino}
        alt="Studio Legale Accarino"
        className="h-16 w-auto md:h-20"
      />
    </Link>
  );
};

export default Logo;
