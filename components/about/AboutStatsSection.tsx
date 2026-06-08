"use client";

import { Users, Map, Home, TrendingUp, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCountUp } from "@/hooks/useCountUp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ABOUT_GLANCE_STATS } from "@/lib/about";
import { t } from "@/lib/i18n";

const STAT_ICONS = {
  users: Users,
  map: Map,
  home: Home,
  trending: TrendingUp,
  building: Building2,
};

function GlanceStat({
  value,
  suffix,
  decimals,
  label,
  sublabel,
  icon,
  isActive,
}: {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  sublabel: string;
  icon: keyof typeof STAT_ICONS;
  isActive: boolean;
}) {
  const displayValue = useCountUp({ end: value, decimals, isActive });
  const Icon = STAT_ICONS[icon];

  return (
    <div className="m-2 flex flex-col items-center rounded-xl bg-white/10 px-3 py-5 text-center md:px-4">
      <Icon className="mb-3 h-7 w-7 text-white/90" aria-hidden="true" />
      <p className="font-heading text-3xl font-extrabold text-white md:text-4xl">
        {displayValue}
        {suffix && <span className="text-2xl">{suffix}</span>}
      </p>
      <p className="mt-2 text-sm font-semibold text-white">{label}</p>
      <p className="mt-0.5 text-xs text-white/75">{sublabel}</p>
    </div>
  );
}

export default function AboutStatsSection() {
  const { language } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      id="at-a-glance"
      className="bg-imus-gray py-12 md:py-16"
      aria-labelledby="at-a-glance-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          ref={ref}
          className="overflow-hidden rounded-2xl bg-gradient-to-br from-imus-green to-imus-greenDark shadow-float"
        >
          <div className="border-b border-white/15 px-6 py-5 md:px-8">
            <h2
              id="at-a-glance-heading"
              className="font-heading text-2xl font-bold text-white md:text-3xl"
            >
              {language === "fil" ? "Imus sa Isang Sulyap" : "Imus at a Glance"}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-5">
            {ABOUT_GLANCE_STATS.map((stat) => (
              <GlanceStat
                key={stat.label.en}
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                label={t(stat.label, language)}
                sublabel={t(stat.sublabel, language)}
                icon={stat.icon}
                isActive={isVisible}
              />
            ))}
          </div>

          <p className="border-t border-white/15 px-6 py-3 text-right text-xs text-white/70 md:px-8">
            {language === "fil"
              ? "Source: Philippine Statistics Authority (PSA) — Census 2020"
              : "Source: Philippine Statistics Authority (PSA) — 2020 Census"}
          </p>
        </div>
      </div>
    </section>
  );
}
