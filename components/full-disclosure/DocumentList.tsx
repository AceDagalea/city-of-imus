"use client";

import { useState } from "react";
import { Download, ChevronDown, Calendar, Tag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { DisclosureDocument } from "@/lib/full-disclosure";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DocumentList({ documents }: { documents: DisclosureDocument[] }) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(documents[0]?.id ?? null);

  if (documents.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        {language === "fil" ? "Walang dokumentong nahanap." : "No documents found."}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => {
        const isOpen = expanded === doc.id;
        return (
          <article
            key={doc.id}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              onClick={() => setExpanded(isOpen ? null : doc.id)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left focus-ring"
              aria-expanded={isOpen}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-imus-navy leading-snug">{doc.title}</h3>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {language === "fil" ? "Petsa:" : "Posted:"} {formatDate(doc.postedDate)}
                  </span>
                  {doc.category && (
                    <span className="flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      {doc.category}
                    </span>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-imus-navy transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="border-t border-gray-100 px-5 pb-5 pt-3">
                {doc.description && (
                  <p className="mb-4 text-sm text-gray-600">{doc.description}</p>
                )}
                <a
                  href={doc.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-imus-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-imus-navyDark focus-ring"
                >
                  <Download className="h-4 w-4" />
                  {language === "fil" ? "I-download ang PDF" : "Download PDF"}
                </a>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
