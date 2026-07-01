"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t } from "@/lib/i18n";

/**
 * Transparency Seal badge — required on the homepage (and linked site-wide from
 * the footer) per DICT / Bagong Pilipinas government website guidance. Uses the
 * national `gov.*` palette so it reads as an official element regardless of the
 * tenant's local branding.
 */
export default function TransparencySealBadge({ className = "" }: { className?: string }) {
  const { language } = useLanguage();

  return (
    <Link
      href="/transparency"
      aria-label={t(STRINGS.viewTransparency, language)}
      className={`group inline-flex items-center gap-4 rounded-xl border border-gov-blue/15 bg-white px-5 py-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-float focus-ring ${className}`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gov-blue text-gov-gold">
        <ShieldCheck className="h-7 w-7" aria-hidden="true" />
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-bold uppercase tracking-wide text-gov-blueDark">
          {t(STRINGS.transparencySeal, language)}
        </span>
        <span className="text-xs text-gray-600">{t(STRINGS.transparencySealDesc, language)}</span>
      </span>
      <ArrowRight
        className="ml-1 h-4 w-4 shrink-0 text-gov-blue transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
