"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { tenantConfig } from "@/config/tenant.config";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t } from "@/lib/i18n";

/**
 * Standard government footer legal strip (per master plan §4.2 point 5):
 * LGU legal name, Transparency Seal link, FOI link, Data Privacy Act (RA 10173)
 * notice, and an accessibility statement. All copy is config/i18n driven.
 */
export default function NationalLegalStrip() {
  const { language } = useLanguage();

  return (
    <div className="border-t border-white/10 bg-tenant-navyDark">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <p className="text-sm font-semibold text-white">{t(tenantConfig.lguName, language)}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          <Link
            href="/transparency"
            className="inline-flex items-center gap-1.5 text-tenant-green transition-colors hover:text-white focus-ring rounded-sm"
          >
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {t(STRINGS.transparencySeal, language)}
          </Link>
          <a
            href={tenantConfig.foiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-white focus-ring rounded-sm"
          >
            {t(STRINGS.freedomOfInformation, language)}
          </a>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-white/50">
          <span className="font-semibold text-white/70">{t(STRINGS.privacyPolicy, language)}:</span>{" "}
          {t(STRINGS.privacyNotice, language)}
        </p>
        <p className="mt-1.5 max-w-3xl text-xs leading-relaxed text-white/50">
          {t(STRINGS.accessibilityStatement, language)}
        </p>
      </div>
    </div>
  );
}
