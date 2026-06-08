"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getBadgeStyle, type GridDocument } from "@/lib/disclosure-grid";
import { getSectionById } from "@/lib/full-disclosure";
import { t } from "@/lib/i18n";

interface DisclosureDocumentViewProps {
  sectionId: string;
  document: GridDocument;
}

export default function DisclosureDocumentView({ sectionId, document }: DisclosureDocumentViewProps) {
  const { language } = useLanguage();
  const section = getSectionById(sectionId);
  const sectionLabel = section ? t(section.label, language) : sectionId;
  const pages = document.pages ?? [];

  return (
    <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
      <header className="border-b border-gray-100 bg-imus-navy px-6 py-5 text-white">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-imus-green">{sectionLabel}</p>
          {document.badge && (
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${getBadgeStyle(document.badge)}`}>
              {document.badge}
            </span>
          )}
        </div>
        <h1 className="mt-2 font-heading text-xl font-bold leading-snug md:text-2xl lg:text-3xl">
          {document.title}
        </h1>
        <p className="mt-2 text-sm text-white/80">
          {language === "fil" ? "Nailathala" : "Published"}: {document.datePosted}
        </p>
      </header>

      {pages.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {pages.map((src, index) => (
            <section
              key={src}
              id={`page-${index + 1}`}
              aria-label={`${language === "fil" ? "Pahina" : "Page"} ${index + 1}`}
              className="bg-imus-gray/40 px-4 py-6 md:px-8"
            >
              <figure className="mx-auto max-w-4xl">
                <Image
                  src={src}
                  alt={`${document.title} — ${language === "fil" ? "Pahina" : "Page"} ${index + 1}`}
                  width={1200}
                  height={1600}
                  className="h-auto w-full rounded-lg border border-gray-200 bg-white shadow-sm"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority={index < 2}
                />
                <figcaption className="mt-3 text-center text-xs text-gray-500">
                  {language === "fil" ? "Pahina" : "Page"} {index + 1} {language === "fil" ? "ng" : "of"} {pages.length}
                </figcaption>
              </figure>
            </section>
          ))}
        </div>
      ) : (
        <div className="px-6 py-10 text-center text-gray-500">
          {language === "fil" ? "Walang preview na available." : "No preview available."}
        </div>
      )}

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-6 py-5">
        <Link
          href={`/full-disclosure/${sectionId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-imus-navy transition-colors hover:text-imus-red focus-ring rounded-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === "fil" ? `Bumalik sa ${sectionLabel}` : `Back to ${sectionLabel}`}
        </Link>
        {document.pdfUrl && (
          <a
            href={document.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-imus-navy px-4 py-2 text-sm font-medium text-imus-navy transition-colors hover:bg-imus-navy hover:text-white focus-ring"
          >
            <Download className="h-4 w-4" />
            {language === "fil" ? "I-download ang PDF" : "Download PDF"}
          </a>
        )}
      </footer>
    </article>
  );
}
