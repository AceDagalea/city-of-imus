"use client";

import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getBadgeStyle, type GridDocument } from "@/lib/disclosure-grid";
import { getSectionById } from "@/lib/full-disclosure";
import { t } from "@/lib/i18n";

interface TextDisclosureViewProps {
  sectionId: string;
  document: GridDocument;
  enacted?: string;
  approved?: string;
}

export default function TextDisclosureView({
  sectionId,
  document,
  enacted,
  approved,
}: TextDisclosureViewProps) {
  const { language } = useLanguage();
  const section = getSectionById(sectionId);
  const sectionLabel = section ? t(section.label, language) : sectionId;

  return (
    <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
      <header className="border-b border-gray-100 bg-tenant-navy px-6 py-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-tenant-green">{sectionLabel}</p>
        <p className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${getBadgeStyle(document.badge)}`}>
          {document.badge}
        </p>
        <h1 className="mt-3 font-heading text-lg font-bold leading-relaxed md:text-xl">
          {document.title}
        </h1>
        {(enacted || approved || document.datePosted) && (
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/80">
            {enacted && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {language === "fil" ? "Enacted:" : "Enacted:"} {enacted}
              </span>
            )}
            {approved && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {language === "fil" ? "Approved:" : "Approved:"} {approved}
              </span>
            )}
            {!enacted && !approved && document.datePosted && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {document.datePosted}
              </span>
            )}
          </div>
        )}
      </header>

      <div className="px-6 py-8">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 md:text-base">
          {document.title}
        </p>
      </div>

      <footer className="border-t border-gray-100 px-6 py-5">
        <Link
          href={`/full-disclosure/${sectionId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-tenant-navy transition-colors hover:text-tenant-red focus-ring rounded-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === "fil" ? `Bumalik sa ${sectionLabel}` : `Back to ${sectionLabel}`}
        </Link>
      </footer>
    </article>
  );
}
