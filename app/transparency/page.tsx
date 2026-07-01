"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { FOOTER_COLUMNS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t } from "@/lib/i18n";

export default function TransparencyPage() {
  const { language } = useLanguage();
  const links = FOOTER_COLUMNS.transparency.links;

  return (
    <>
      <PageHeader
        title={t(STRINGS.transparencyTitle, language)}
        subtitle={t(STRINGS.transparencyIntro, language)}
        breadcrumbs={[
          { label: t(STRINGS.cityName, language), href: "/" },
          { label: t(STRINGS.transparencyTitle, language) },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-10 flex items-start gap-4 rounded-xl border border-gov-blue/15 bg-gov-blue/5 p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gov-blue text-gov-gold">
            <ShieldCheck className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-gov-blueDark">
              {t(STRINGS.transparencySeal, language)}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{t(STRINGS.transparencySealDesc, language)}</p>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => {
            const label = t(link.label, language);
            const isExternal = "external" in link && link.external;
            const classes =
              "group flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-tenant-navy/15 hover:shadow-float focus-ring";
            const inner = (
              <>
                <span className="font-semibold text-tenant-navy">{label}</span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-tenant-green transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </>
            );
            return (
              <li key={link.href}>
                {isExternal ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
                    {inner}
                  </a>
                ) : (
                  <Link href={link.href} className={classes}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
