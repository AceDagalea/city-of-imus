"use client";

import Link from "next/link";
import {
  Briefcase,
  Phone,
  Clock,
  BookOpen,
  HeartPulse,
  MapPin,
  FileText,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  phone: Phone,
  clock: Clock,
  "book-open": BookOpen,
  "heart-pulse": HeartPulse,
  "map-pin": MapPin,
  "file-text": FileText,
  "alert-circle": AlertCircle,
};

interface ServiceTileProps {
  icon: string;
  label: string;
  href: string;
  external?: boolean;
}

export default function ServiceTile({ icon, label, href, external = false }: ServiceTileProps) {
  const Icon = iconMap[icon] || Briefcase;
  const [pressed, setPressed] = useState(false);

  const className = `flex min-w-[140px] flex-col items-center gap-3 rounded-xl bg-imus-navy p-4 transition-all duration-200 hover:bg-imus-navyDark focus-ring ${
    pressed ? "scale-95" : ""
  }`;

  const content = (
    <>
      <Icon className="h-7 w-7 text-imus-green" aria-hidden="true" />
      <span className="text-center text-sm font-medium text-white">{label}</span>
    </>
  );

  const handleMouseDown = () => setPressed(true);
  const handleMouseUp = () => setPressed(false);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {content}
    </Link>
  );
}
