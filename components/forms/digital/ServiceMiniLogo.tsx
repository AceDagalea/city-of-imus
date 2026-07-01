"use client";

import { getServiceIconStyle, getSizeClasses, type ServiceIconSize, type ServiceIconStyle } from "@/lib/service-icons";

interface ServiceMiniLogoProps {
  slug?: string;
  categoryId?: string;
  style?: ServiceIconStyle;
  size?: ServiceIconSize;
  className?: string;
  active?: boolean;
}

export default function ServiceMiniLogo({
  slug = "",
  categoryId = "",
  style,
  size = "md",
  className = "",
  active = false,
}: ServiceMiniLogoProps) {
  const config = style ?? getServiceIconStyle(slug, categoryId);
  const sizes = getSizeClasses(size);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full shadow-sm ring-2 ${config.bg} ${config.ring ?? "ring-transparent"} ${sizes.box} ${className} ${
        active ? "ring-tenant-navy/30 shadow-md" : ""
      }`}
      aria-hidden="true"
    >
      <Icon className={`${sizes.icon} ${config.color}`} strokeWidth={2.25} />
    </span>
  );
}
