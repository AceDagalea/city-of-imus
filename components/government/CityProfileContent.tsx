"use client";

import Image from "next/image";
import { Users, Map, Home, TrendingUp, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCountUp } from "@/hooks/useCountUp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  CITY_PROFILE_IMAGE,
  CITY_PROFILE_MISSION,
  CITY_PROFILE_PARAGRAPHS,
  CITY_PROFILE_STATS,
  CITY_PROFILE_TAGLINE,
  CITY_PROFILE_VISION,
} from "@/lib/city-profile";
import { t } from "@/lib/i18n";

const STAT_ICONS = {
  users: Users,
  map: Map,
  home: Home,
  trending: TrendingUp,
  building: Building2,
};

function ProfileStat({
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
    <div className="flex flex-col items-center rounded-xl bg-white/10 px-3 py-5 text-center">
      <Icon className="mb-2 h-6 w-6 text-white/90" aria-hidden="true" />
      <p className="font-heading text-2xl font-extrabold text-white md:text-3xl">
        {displayValue}
        {suffix}
      </p>
      <p className="mt-1 text-sm font-semibold text-white">{label}</p>
      <p className="mt-0.5 text-xs text-white/75">{sublabel}</p>
    </div>
  );
}

export default function CityProfileContent() {
  const { language } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });

  return (
    <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card">
      <div className="relative aspect-[16/7] w-full bg-tenant-gray">
        <Image
          src={CITY_PROFILE_IMAGE}
          alt="Imus Plaza and Cathedral aerial view"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 70vw"
          priority
        />
      </div>

      <div className="space-y-6 p-6 md:p-8">
        <blockquote className="border-l-4 border-tenant-green pl-4 text-center text-sm italic leading-relaxed text-tenant-navy/80 md:text-base">
          {CITY_PROFILE_TAGLINE[language].map((line) => (
            <p key={line} className="mb-2 last:mb-0">
              {line}
            </p>
          ))}
        </blockquote>

        <div className="space-y-4 text-justify leading-relaxed text-gray-700">
          {CITY_PROFILE_PARAGRAPHS.map((para) => (
            <p key={para.en}>{t(para, language)}</p>
          ))}
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 gap-3 rounded-xl bg-tenant-green p-4 md:grid-cols-3 md:gap-4 md:p-6"
        >
          {CITY_PROFILE_STATS.map((stat) => (
            <ProfileStat
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

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-lg font-bold text-tenant-green md:text-xl">
              {language === "fil" ? "Bisyon" : "Vision"}
            </h2>
            <p className="mt-3 leading-relaxed text-gray-700">
              {language === "fil" ? CITY_PROFILE_VISION.fil : CITY_PROFILE_VISION.en}
            </p>
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-tenant-green md:text-xl">
              {language === "fil" ? "Misyon" : "Mission"}
            </h2>
            <p className="mt-3 leading-relaxed text-gray-700">
              {language === "fil" ? CITY_PROFILE_MISSION.fil : CITY_PROFILE_MISSION.en}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
