"use client";

import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getBanaagHtmlUrl } from "@/lib/banaag-generated";
import type { TableDisclosureItem } from "@/lib/full-disclosure";

interface DisclosureTableProps {
  items: TableDisclosureItem[];
  columns: { key: keyof TableDisclosureItem; label: { en: string; fil: string } }[];
  tableVariant?: "bids" | "jobs" | "gad" | "banaag" | "disposal" | "lgf";
}

export default function DisclosureTable({ items, columns, tableVariant }: DisclosureTableProps) {
  const { language } = useLanguage();
  const useHtmlLinks = tableVariant === "banaag";

  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        {language === "fil" ? "Walang dokumentong nahanap." : "No documents found."}
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-tenant-navy text-white">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-semibold">
                  {language === "fil" ? col.label.fil : col.label.en}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold">
                {useHtmlLinks
                  ? language === "fil"
                    ? "Basahin"
                    : "Read"
                  : language === "fil"
                    ? "I-download"
                    : "Download"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-tenant-sky/30">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3.5 align-top text-tenant-navy">
                    {col.key === "title" && useHtmlLinks ? (
                      <Link
                        href={getBanaagHtmlUrl(item.id)}
                        className="font-medium text-tenant-navy underline decoration-tenant-navy/30 underline-offset-2 transition-colors hover:text-tenant-red hover:decoration-tenant-red focus-ring rounded-sm"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      String(item[col.key as keyof typeof item])
                    )}
                  </td>
                ))}
                <td className="px-4 py-3.5 align-top">
                  {useHtmlLinks ? (
                    <Link
                      href={getBanaagHtmlUrl(item.id)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-tenant-navy px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-tenant-navyDark focus-ring"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {language === "fil" ? "HTML" : "HTML"}
                    </Link>
                  ) : (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-tenant-navy px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-tenant-navyDark focus-ring"
                    >
                      <Download className="h-3.5 w-3.5" />
                      PDF
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
