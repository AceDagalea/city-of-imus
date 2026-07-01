"use client";

import Link from "next/link";
import {
  Monitor,
  Briefcase,
  FileText,
  MapPin,
  Megaphone,
  Users,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { QUICK_ACCESS } from "@/lib/constants";
import { t } from "@/lib/i18n";

const iconMap: Record<string, LucideIcon> = {
  monitor: Monitor,
  briefcase: Briefcase,
  "file-text": FileText,
  "map-pin": MapPin,
  megaphone: Megaphone,
  users: Users,
  "credit-card": CreditCard,
};

export default function QuickAccessBar() {
  const { language } = useLanguage();

  return (
    <section className="relative z-20 -mt-10 px-4 md:-mt-12 md:px-6" aria-label="Quick access">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-float">
          <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 sm:grid-cols-4 sm:divide-y-0">
            {QUICK_ACCESS.map((item) => {
              const Icon = iconMap[item.icon] || Monitor;
              const content = (
                <>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-tenant-navy/10 transition-colors group-hover:border-tenant-navy group-hover:bg-tenant-navy">
                    <Icon
                      className="h-4 w-4 text-tenant-navy transition-colors group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-center text-xs font-semibold leading-tight text-tenant-navy">
                    {t(item.label, language)}
                  </span>
                </>
              );

              const className =
                "group flex flex-col items-center justify-center gap-2 px-3 py-5 transition-colors hover:bg-tenant-gray/60 focus-ring sm:py-6";

              return "external" in item && item.external ? (
                <a
                  key={item.label.en}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link key={item.label.en} href={item.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
