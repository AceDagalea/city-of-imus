"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  getBadgeStyle,
  getGridHtmlUrl,
  getThumbnailFit,
  GRID_THUMBNAIL_HEIGHT,
  showBadgeOnThumbnail,
  type GridDocument,
} from "@/lib/disclosure-grid";

interface DisclosureGridCardProps {
  sectionId: string;
  document: GridDocument;
  readLabel: { en: string; fil: string };
  showPages?: boolean;
}

export default function DisclosureGridCard({
  sectionId,
  document,
  readLabel,
  showPages = true,
}: DisclosureGridCardProps) {
  const { language } = useLanguage();
  const pageCount = document.pages?.length ?? 0;
  const hasThumbnail = Boolean(document.thumbnail);
  const href = getGridHtmlUrl(sectionId, document.id);
  const thumbnailFit = getThumbnailFit(sectionId);
  const badgeOnImage = showBadgeOnThumbnail(sectionId) && document.badge && hasThumbnail;

  return (
    <article className="group flex h-full min-h-[340px] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-imus-navy/15 hover:shadow-lg">
      <Link href={href} className="flex h-full flex-col focus-ring rounded-xl">
        <div
          className={`relative ${GRID_THUMBNAIL_HEIGHT} shrink-0 overflow-hidden border-b border-gray-100 bg-imus-gray`}
        >
          {hasThumbnail && thumbnailFit !== "icon" ? (
            <Image
              src={document.thumbnail!}
              alt={document.title}
              fill
              className={
                thumbnailFit === "cover"
                  ? "object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  : "bg-white object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
              }
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-imus-sky/30 to-white px-4 py-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-imus-navy/10">
                <FileText className="h-6 w-6 text-imus-navy/50" aria-hidden="true" />
              </div>
            </div>
          )}

          {badgeOnImage && (
            <span
              className={`absolute left-3 top-3 max-w-[85%] truncate rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${getBadgeStyle(document.badge)}`}
            >
              {document.badge}
            </span>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-4">
          {document.badge && !badgeOnImage && (
            <p
              className={`mb-2 line-clamp-2 w-fit max-w-full rounded-full px-2.5 py-1 text-[10px] font-bold uppercase leading-tight tracking-wide ${getBadgeStyle(document.badge)}`}
              title={document.badge}
            >
              {document.badge}
            </p>
          )}

          <h3 className="line-clamp-3 min-h-[3.75rem] break-words font-heading text-sm font-bold leading-snug text-imus-navy md:text-base">
            {document.title}
          </h3>

          <p className="mt-2 text-xs text-gray-500">
            {language === "fil" ? "Nailathala:" : "Published:"}{" "}
            <span className="text-gray-600">{document.datePosted}</span>
          </p>

          {showPages && pageCount > 0 && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
              <FileText className="h-3.5 w-3.5 shrink-0 text-imus-navy/50" aria-hidden="true" />
              {pageCount}{" "}
              {language === "fil"
                ? pageCount === 1
                  ? "Pahina"
                  : "Mga Pahina"
                : pageCount === 1
                  ? "Page"
                  : "Pages"}
            </p>
          )}

          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-imus-navy transition-colors group-hover:text-imus-red">
            {language === "fil" ? readLabel.fil : readLabel.en}
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
