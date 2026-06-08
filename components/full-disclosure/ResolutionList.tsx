"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { ResolutionEntry } from "@/lib/full-disclosure";

export default function ResolutionList({ resolutions }: { resolutions: ResolutionEntry[] }) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(resolutions[0]?.id ?? null);

  if (resolutions.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        {language === "fil" ? "Walang resolusyon na nahanap." : "No resolutions found."}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {resolutions.map((item) => {
        const isOpen = expanded === item.id;
        return (
          <article
            key={item.id}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              onClick={() => setExpanded(isOpen ? null : item.id)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left focus-ring"
              aria-expanded={isOpen}
            >
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-imus-green">
                  {item.number}
                </p>
                <h3 className="mt-1 font-semibold leading-snug text-imus-navy">{item.title}</h3>
                <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.date}
                </p>
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-imus-navy transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-gray-100 px-5 pb-5 pt-3">
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
