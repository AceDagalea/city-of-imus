"use client";

import Link from "next/link";
import {
  Home,
  Landmark,
  Building2,
  Users,
  Briefcase,
  Newspaper,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ABOUT_SIDEBAR_LINKS } from "@/lib/about";
import { t } from "@/lib/i18n";

const ICON_MAP = {
  home: Home,
  landmark: Landmark,
  building: Building2,
  users: Users,
  briefcase: Briefcase,
  newspaper: Newspaper,
};

interface AboutSidebarProps {
  activeId?: string;
  variant?: "hero" | "page";
}

export default function AboutSidebar({ activeId = "our-city", variant = "page" }: AboutSidebarProps) {
  const { language } = useLanguage();
  const isHero = variant === "hero";

  return (
    <nav
      aria-label="About Imus sections"
      className={
        isHero
          ? "w-full max-w-[240px] rounded-lg bg-imus-navy/90 p-2 shadow-xl backdrop-blur-sm"
          : "w-full"
      }
    >
      <ul className="space-y-0.5">
        {ABOUT_SIDEBAR_LINKS.map((link) => {
          const Icon = ICON_MAP[link.icon];
          const isActive = activeId === link.id;
          const className = `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors focus-ring ${
            isActive
              ? "border-l-4 border-imus-green bg-white/10 font-semibold text-white"
              : isHero
                ? "border-l-4 border-transparent text-white/85 hover:bg-white/10 hover:text-white"
                : "border-l-4 border-transparent text-imus-navy hover:bg-imus-gray"
          }`;

          const content = (
            <>
              <Icon
                className={`h-4 w-4 shrink-0 ${isActive && isHero ? "text-imus-green" : isHero ? "text-white/70" : isActive ? "text-imus-green" : "text-imus-red"}`}
                aria-hidden="true"
              />
              <span>{t(link.label, language)}</span>
            </>
          );

          return (
            <li key={link.id}>
              {"external" in link && link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link href={link.href} className={className}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
