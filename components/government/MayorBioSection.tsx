"use client";

import { CalendarDays } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MAYOR_BIO_PARAGRAPHS, MAYOR_TERM } from "@/lib/mayor";
import { t } from "@/lib/i18n";

export default function MayorBioSection() {
  const { language } = useLanguage();

  return (
    <section className="mt-8" aria-labelledby="mayor-bio-heading">
      <h2 id="mayor-bio-heading" className="sr-only">
        Mayor biography
      </h2>
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-32">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-imus-green/15 text-imus-greenDark">
            <CalendarDays className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm font-semibold text-imus-navy">
            {t(MAYOR_TERM.officeLabel, language)}
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-imus-navy">
            {t(MAYOR_TERM.years, language)}
          </p>
          <p className="mt-1 text-sm font-medium text-imus-green">{t(MAYOR_TERM.label, language)}</p>
        </aside>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-4 text-sm leading-relaxed text-gray-700 md:text-base">
            {MAYOR_BIO_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.en}>{t(paragraph, language)}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
