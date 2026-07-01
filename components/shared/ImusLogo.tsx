import Image from "next/image";
import Link from "next/link";
import { LOGO_URL } from "@/lib/constants";

type ImusLogoSize = "sm" | "md" | "lg" | "xl";

const LOGO_HEIGHT_CLASS: Record<ImusLogoSize, string> = {
  sm: "h-11 w-auto",
  md: "h-14 w-auto",
  lg: "h-16 w-auto sm:h-[4.5rem]",
  xl: "h-[4.5rem] w-auto sm:h-20",
};

const LOGO_DIMENSIONS: Record<ImusLogoSize, { width: number; height: number }> = {
  sm: { width: 196, height: 44 },
  md: { width: 252, height: 56 },
  lg: { width: 302, height: 72 },
  xl: { width: 336, height: 80 },
};

interface ImusLogoProps {
  href?: string;
  size?: ImusLogoSize;
  className?: string;
  /** Text wordmark for tight spaces or dark backgrounds */
  variant?: "image" | "wordmark";
  /** Light wordmark colors for navy/dark backgrounds */
  onDark?: boolean;
}

export function ImusWordmark({
  size = "md",
  onDark = false,
  className = "",
}: Pick<ImusLogoProps, "size" | "onDark" | "className">) {
  const topSize =
    size === "sm" ? "text-[0.65rem]" : size === "md" ? "text-xs" : size === "lg" ? "text-sm" : "text-base";
  const bottomSize =
    size === "sm" ? "text-xl" : size === "md" ? "text-2xl" : size === "lg" ? "text-3xl" : "text-4xl";

  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`font-heading font-bold uppercase tracking-wide ${topSize} ${
          onDark ? "text-tenant-green-light" : "text-tenant-green"
        }`}
      >
        City Government of
      </span>
      <span
        className={`font-heading font-extrabold uppercase tracking-tight ${bottomSize} ${
          onDark ? "text-white" : "text-tenant-navy"
        }`}
      >
        Imus
      </span>
    </span>
  );
}

export default function ImusLogo({
  href,
  size = "md",
  className = "",
  variant = "image",
  onDark = false,
}: ImusLogoProps) {
  const { width, height } = LOGO_DIMENSIONS[size];

  const content =
    variant === "wordmark" ? (
      <ImusWordmark size={size} onDark={onDark} className={className} />
    ) : (
      <Image
        src={LOGO_URL}
        alt="City Government of Imus"
        width={width}
        height={height}
        className={`object-contain object-left ${LOGO_HEIGHT_CLASS[size]} ${className}`}
        priority
      />
    );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center focus-ring rounded-md">
        {content}
      </Link>
    );
  }

  return <span className="inline-flex shrink-0 items-center">{content}</span>;
}
