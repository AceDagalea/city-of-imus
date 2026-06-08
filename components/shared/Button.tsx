import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-imus-green text-imus-navy font-semibold hover:bg-imus-greenDark",
  secondary:
    "bg-imus-red text-white font-semibold hover:bg-imus-red/90",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-imus-navy",
  ghost:
    "text-imus-navy hover:text-imus-red",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  external = false,
  onClick,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const baseClass = `inline-flex items-center justify-center rounded-full px-8 py-3 transition-all duration-200 focus-ring ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClass} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClass}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
