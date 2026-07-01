"use client";

import Link from "next/link";
import { ArrowRight, CircleHelp, Info, Landmark } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { DEPARTMENT_INFO, EXPLORE_GOVERNMENT_LINKS } from "@/lib/departments";
import { MAYOR_GOVERNMENT_CTA } from "@/lib/mayor";
import { t } from "@/lib/i18n";

interface GovernmentExploreSidebarProps {
  activeId: string;
  variant?: "default" | "mayor";
}

export default function GovernmentExploreSidebar({
  activeId,
  variant = "default",
}: GovernmentExploreSidebarProps) {
  const { language } = useLanguage();

  return (
    <aside className="lg:sticky lg:top-32 lg:self-start">
      <p className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.2em] text-tenant-navy/45">
        {language === "fil" ? "Pangkalahatang Impormasyon" : "General Information"}
      </p>

      <nav
        aria-label="Explore government"
        className="space-y-1 rounded-xl bg-white p-2 shadow-md"
      >
        {EXPLORE_GOVERNMENT_LINKS.map((link) => {
          const isActive = link.id === activeId;
          const className = `block rounded-lg px-3 py-2.5 text-sm transition-colors focus-ring ${
            isActive
              ? "bg-tenant-navy font-semibold text-white"
              : "text-tenant-navy hover:bg-tenant-gray"
          }`;

          return "external" in link && link.external ? (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {t(link.label, language)}
            </a>
          ) : (
            <Link key={link.id} href={link.href} className={className}>
              {t(link.label, language)}
            </Link>
          );
        })}
      </nav>

      {variant === "mayor" ? (
        <div className="mt-4 rounded-xl bg-tenant-green/10 p-4 ring-1 ring-tenant-green/15">
          <div className="flex items-start gap-2">
            <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-tenant-greenDark" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-tenant-navy">
                {t(MAYOR_GOVERNMENT_CTA.title, language)}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {t(MAYOR_GOVERNMENT_CTA.body, language)}
              </p>
              <Link
                href="/about/government"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-tenant-green hover:text-tenant-greenDark focus-ring rounded-sm"
              >
                {t(MAYOR_GOVERNMENT_CTA.link, language)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-4 rounded-xl bg-tenant-green/10 p-4 ring-1 ring-tenant-green/15">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-tenant-greenDark" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-tenant-navy">
                  {t(DEPARTMENT_INFO.whatIs.title, language)}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {t(DEPARTMENT_INFO.whatIs.body, language)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-tenant-sky/70 p-4 ring-1 ring-tenant-navy/5">
            <div className="flex items-start gap-2">
              <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-tenant-navy" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-tenant-navy">
                  {t(DEPARTMENT_INFO.needHelp.title, language)}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {t(DEPARTMENT_INFO.needHelp.body, language)}
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-tenant-green hover:text-tenant-greenDark focus-ring rounded-sm"
                >
                  {t(DEPARTMENT_INFO.needHelp.cta, language)}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
