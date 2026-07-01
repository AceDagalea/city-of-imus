"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ABOUT_INTRO, ABOUT_QUICK_LINKS } from "@/lib/about";
import { t } from "@/lib/i18n";

const QUICK_LINK_ICONS = {
  "file-text": FileText,
  shield: ShieldCheck,
  scale: Scale,
};

export default function AboutIntroSection() {
  const { language } = useLanguage();

  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="about-intro-heading">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2
            id="about-intro-heading"
            className="font-heading text-2xl font-bold text-tenant-navy md:text-3xl"
          >
            {t(ABOUT_INTRO.title, language)}
          </h2>
          <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
            {ABOUT_INTRO.paragraphs.map((paragraph, index) => (
              <p key={index}>{t(paragraph, language)}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {ABOUT_QUICK_LINKS.map((link) => {
            const Icon = QUICK_LINK_ICONS[link.icon];
            return (
              <Link
                key={link.id}
                href={link.href}
                className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-tenant-green/30 hover:shadow-md focus-ring"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tenant-green/15 text-tenant-greenDark">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading font-bold text-tenant-navy group-hover:text-tenant-greenDark">
                    {t(link.label, language)}
                  </p>
                  <p className="mt-0.5 text-sm text-gray-500 line-clamp-2">
                    {t(link.description, language)}
                  </p>
                </div>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-tenant-green transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
