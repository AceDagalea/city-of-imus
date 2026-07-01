"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_CTA } from "@/lib/contact";
import { t } from "@/lib/i18n";

export default function ContactDirectoryCta() {
  const { language } = useLanguage();
  const lang = language === "fil" ? "fil" : "en";

  return (
    <section className="rounded-xl bg-tenant-sky/70 p-6 ring-1 ring-tenant-navy/5 md:p-8">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tenant-navy text-white shadow-sm">
            <Mail className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-tenant-navy md:text-xl">
              {t(CONTACT_CTA.title, lang)}
            </h2>
            <p className="mt-1 text-sm text-gray-600 md:text-base">{t(CONTACT_CTA.subtitle, lang)}</p>
          </div>
        </div>
        <Link
          href={CONTACT_CTA.href}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-tenant-navy px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-tenant-navyDark focus-ring"
        >
          {t(CONTACT_CTA.cta, lang)}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
