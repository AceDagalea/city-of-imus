"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { OrdinanceEntry } from "@/lib/disclosure-generated";

export default function OrdinanceList({ ordinances }: { ordinances: OrdinanceEntry[] }) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(ordinances[0]?.id ?? null);

  if (ordinances.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        {language === "fil" ? "Walang ordinansa na nahanap." : "No ordinances found."}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {ordinances.map((item) => {
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
                {(item.enacted || item.approved) && (
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                    {item.enacted && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {language === "fil" ? "Enacted:" : "Enacted:"} {item.enacted}
                      </span>
                    )}
                    {item.approved && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {language === "fil" ? "Approved:" : "Approved:"} {item.approved}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-imus-navy transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          </article>
        );
      })}
    </div>
  );
}
