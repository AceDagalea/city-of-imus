"use client";

import { useLanguage } from "@/context/LanguageContext";
import { MAYOR_AGENDA_INTRO, MAYOR_AGENDA_ITEMS } from "@/lib/mayor";
import { t } from "@/lib/i18n";

export default function MayorAgendaSection() {
  const { language } = useLanguage();

  return (
    <section className="mt-12 md:mt-16" aria-labelledby="mayor-agenda-heading">
      <div className="text-center">
        <h2
          id="mayor-agenda-heading"
          className="font-heading text-2xl font-bold text-imus-navy md:text-3xl"
        >
          {t(MAYOR_AGENDA_INTRO.title, language)}
        </h2>
        <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-imus-green" aria-hidden="true" />
        <p className="mx-auto mt-4 max-w-3xl text-sm text-gray-600 md:text-base">
          {t(MAYOR_AGENDA_INTRO.subtitle, language)}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {MAYOR_AGENDA_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.id}
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-4 py-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-imus-green/10 text-imus-greenDark">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-heading text-sm font-bold leading-snug text-imus-navy">
                {t(item.label, language)}
              </h3>
            </article>
          );
        })}
      </div>
    </section>
  );
}
