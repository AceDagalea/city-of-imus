"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gavel, Scale, ScrollText } from "lucide-react";
import Button from "@/components/shared/Button";
import { useLanguage } from "@/context/LanguageContext";
import { COUNCIL_INFO, MAYOR_PROFILE } from "@/lib/about";
import { MAYOR_PHOTO_URL, SITE_URL } from "@/lib/constants";
import { STRINGS, t } from "@/lib/i18n";

const COUNCIL_LINKS = [
  {
    label: { en: "Ordinances", fil: "Mga Ordinansa" },
    href: "/full-disclosure/ordinances",
    icon: Scale,
  },
  {
    label: { en: "Resolutions", fil: "Mga Resolusyon" },
    href: "/full-disclosure/resolutions",
    icon: ScrollText,
  },
  {
    label: { en: "Executive Orders", fil: "Executive Orders" },
    href: "/full-disclosure/executive-orders",
    icon: Gavel,
  },
];

interface AboutGovernmentSectionProps {
  embedded?: boolean;
}

export default function AboutGovernmentSection({ embedded = false }: AboutGovernmentSectionProps) {
  const { language } = useLanguage();

  return (
    <div className={embedded ? undefined : "mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"}>
      <article
        id="mayor"
        className="scroll-mt-32 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative aspect-[4/3] w-full shrink-0 bg-tenant-gray sm:aspect-auto sm:w-48 md:w-56">
            <Image
              src={MAYOR_PHOTO_URL}
              alt={`${STRINGS.mayorName[language]}, City Mayor`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 224px"
              loading="lazy"
            />
          </div>
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-tenant-green">
              {STRINGS.mayorTitle[language]}
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-tenant-navy">
              {STRINGS.mayorName[language]}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {t(MAYOR_PROFILE.bio, language)}
            </p>
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-tenant-navy/60">
                {language === "fil" ? "Eight-Point Agenda" : "Eight-Point Agenda"}
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {MAYOR_PROFILE.agenda.map((item) => (
                  <li
                    key={item.en}
                    className="rounded-full bg-tenant-green/10 px-3 py-1 text-xs font-medium text-tenant-greenDark"
                  >
                    {t(item, language)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5">
                <Button href="/about/mayor" variant="primary">
                  {STRINGS.learnMore[language]}
                </Button>
            </div>
          </div>
        </div>
      </article>

      <article
        id="council"
        className="mt-5 scroll-mt-32 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative aspect-[16/9] w-full shrink-0 bg-tenant-navy sm:aspect-auto sm:w-48 md:w-56">
            <Image
              src={COUNCIL_INFO.image}
              alt={language === "fil" ? "Sangguniang Panlungsod ng Imus" : "Imus City Council"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 224px"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-tenant-navy/35" />
            <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-white/95 px-3 py-2 text-center shadow-sm">
              <p className="text-2xl font-bold text-tenant-navy">{COUNCIL_INFO.memberCount}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                {language === "fil" ? "Mga Konsehal" : "Councilors"}
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-tenant-green">
              {language === "fil" ? "Sanggunian" : "Legislative Branch"}
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-tenant-navy">
              {language === "fil" ? "Sangguniang Panlungsod" : "City Council"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold text-tenant-navy">
                {t(COUNCIL_INFO.viceMayorTitle, language)}:
              </span>{" "}
              {t(COUNCIL_INFO.viceMayor, language)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {t(COUNCIL_INFO.viceMayorBio, language)}
            </p>

            <ul className="mt-3 space-y-1.5 text-sm text-gray-600">
              {COUNCIL_INFO.responsibilities.map((item) => (
                <li key={item.en} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-tenant-green" aria-hidden="true" />
                  <span>{t(item, language)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {COUNCIL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-tenant-navy/10 bg-tenant-gray px-3 py-1.5 text-xs font-semibold text-tenant-navy transition-colors hover:border-tenant-green/40 hover:bg-tenant-green/10 focus-ring"
                  >
                    <Icon className="h-3.5 w-3.5 text-tenant-green" aria-hidden="true" />
                    {t(link.label, language)}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button href={`${SITE_URL}/city_council.html`} variant="primary" external>
                {STRINGS.learnMore[language]}
              </Button>
              <Link
                href="/full-disclosure/resolutions"
                className="inline-flex items-center gap-1 text-sm font-semibold text-tenant-green transition-colors hover:text-tenant-greenDark focus-ring rounded-sm"
              >
                {language === "fil" ? "Mga Resolusyon" : "View Resolutions"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
