"use client";

import Image from "next/image";
import { Phone, Printer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FEATURED_HOTLINES, getAdditionalHotlines } from "@/lib/contact";
import { STRINGS, t } from "@/lib/i18n";

function formatTel(number: string) {
  const digits = number.replace(/[^0-9]/g, "");
  return digits ? `tel:${digits}` : "#";
}

function HotlineCard({
  name,
  numbers,
  logo,
}: {
  name: string;
  numbers: string[];
  logo?: string;
}) {
  return (
    <article className="flex flex-col items-center rounded-xl bg-white p-5 text-center shadow-card ring-1 ring-gray-100 print:shadow-none print:ring-gray-200">
      <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full bg-imus-gray ring-2 ring-white">
        {logo ? (
          <Image src={logo} alt="" fill className="object-contain p-1.5" sizes="64px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-imus-navy/10">
            <Phone className="h-6 w-6 text-imus-navy/40" aria-hidden="true" />
          </div>
        )}
      </div>
      <h3 className="font-heading text-sm font-bold leading-snug text-imus-navy">{name}</h3>
      <ul className="mt-3 w-full space-y-1.5">
        {numbers.map((number) => (
          <li key={number}>
            <a
              href={formatTel(number)}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-imus-red focus-ring rounded-sm"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-imus-red print:hidden" aria-hidden="true" />
              {number}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function HotlinesSection() {
  const { language } = useLanguage();
  const lang = language === "fil" ? "fil" : "en";
  const additional = getAdditionalHotlines();

  return (
    <section id="hotlines" className="scroll-mt-32" aria-labelledby="hotlines-heading">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="hotlines-heading" className="font-heading text-2xl font-bold text-imus-navy">
            {STRINGS.hotlinesTitle[language]}
          </h2>
          <p className="mt-1 text-gray-600">{STRINGS.hotlinesSubtitle[language]}</p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 self-start rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-imus-navy shadow-sm transition-colors hover:bg-imus-gray focus-ring print:hidden"
          aria-label={STRINGS.printPage[language]}
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          {STRINGS.printPage[language]}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {FEATURED_HOTLINES.map((dept) => (
          <HotlineCard
            key={dept.id}
            name={t(dept.name, lang)}
            numbers={dept.numbers}
            logo={dept.logo}
          />
        ))}
      </div>

      {additional.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {additional.map((dept) => (
            <HotlineCard
              key={dept.id}
              name={t(dept.name, lang)}
              numbers={dept.numbers.map((n) => n.number)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
