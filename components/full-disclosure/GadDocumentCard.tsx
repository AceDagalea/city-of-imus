"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  GAD_CATEGORY_STYLES,
  getGadHtmlUrl,
  getGadPageCount,
  getGadThumbnail,
  type GadDocument,
} from "@/lib/gad-generated";

interface GadDocumentCardProps {
  document: GadDocument;
}

export default function GadDocumentCard({ document }: GadDocumentCardProps) {
  const { language } = useLanguage();
  const thumbnail = getGadThumbnail(document);
  const pageCount = getGadPageCount(document);
  const categoryStyle = GAD_CATEGORY_STYLES[document.category] ?? "bg-gray-100 text-gray-700";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-tenant-navy/15 hover:shadow-lg">
      <Link href={getGadHtmlUrl(document.id)} className="flex h-full flex-col focus-ring rounded-xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-tenant-gray">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={document.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              {language === "fil" ? "Walang preview" : "No preview"}
            </div>
          )}
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${categoryStyle}`}
          >
            {document.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-3 font-heading text-base font-bold leading-snug text-tenant-navy">
            {document.title}
          </h3>

          <p className="mt-2 text-xs text-gray-500">
            {language === "fil" ? "Nailathala:" : "Published:"}{" "}
            <span className="text-gray-600">{document.datePosted}</span>
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
            <FileText className="h-3.5 w-3.5 shrink-0 text-tenant-navy/50" aria-hidden="true" />
            {pageCount} {language === "fil" ? (pageCount === 1 ? "Pahina" : "Mga Pahina") : pageCount === 1 ? "Page" : "Pages"}
          </p>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-tenant-navy transition-colors group-hover:text-tenant-red">
            {language === "fil" ? "Basahin ang Dokumento" : "Read Document"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
