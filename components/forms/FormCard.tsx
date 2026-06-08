"use client";

import Link from "next/link";
import { Download, FileText, ClipboardList, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { CityForm } from "@/lib/forms";
import { t } from "@/lib/i18n";

const modeConfig = {
  online: {
    icon: FileText,
    badge: { en: "Apply Online", fil: "Mag-apply Online" },
    badgeClass: "bg-imus-green text-imus-navy",
    action: { en: "Submit Online", fil: "Mag-submit Online" },
  },
  download: {
    icon: Download,
    badge: { en: "Download", fil: "I-download" },
    badgeClass: "bg-imus-navy/10 text-imus-navy",
    action: { en: "Download PDF", fil: "I-download ang PDF" },
  },
  requirements: {
    icon: ClipboardList,
    badge: { en: "Requirements", fil: "Requirements" },
    badgeClass: "bg-imus-red/10 text-imus-red",
    action: { en: "View Requirements", fil: "Tingnan ang Requirements" },
  },
};

export default function FormCard({ form }: { form: CityForm }) {
  const { language } = useLanguage();
  const config = modeConfig[form.mode];
  const Icon = config.icon;

  return (
    <article className="group flex flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-imus-green/50 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <Icon className="h-5 w-5 shrink-0 text-imus-red" aria-hidden="true" />
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.badgeClass}`}>
          {t(config.badge, language)}
        </span>
      </div>

      <h3 className="font-semibold text-imus-navy group-hover:text-imus-red">
        {t(form.name, language)}
      </h3>
      <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-2">
        {t(form.description, language)}
      </p>

      {form.processingDays && (
        <p className="mt-2 text-xs text-gray-400">
          {language === "fil" ? "Processing:" : "Processing:"} {form.processingDays}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {form.mode === "online" ? (
          <Link
            href={`/forms/${form.slug}`}
            className="inline-flex items-center gap-1 rounded-full bg-imus-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-imus-navyDark focus-ring"
          >
            {t(config.action, language)}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : form.mode === "requirements" && form.relatedSlug ? (
          <>
            <a
              href={form.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-imus-navy px-4 py-2 text-sm font-medium text-imus-navy transition-colors hover:bg-imus-gray focus-ring"
            >
              <Download className="h-4 w-4" />
              PDF
            </a>
            <Link
              href={`/forms/${form.relatedSlug}`}
              className="inline-flex items-center gap-1 rounded-full bg-imus-green px-4 py-2 text-sm font-medium text-imus-navy transition-colors hover:bg-imus-greenDark focus-ring"
            >
              {language === "fil" ? "Mag-apply Online" : "Apply Online"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        ) : (
          <>
            <a
              href={form.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-imus-navy px-4 py-2 text-sm font-medium text-imus-navy transition-colors hover:bg-imus-gray focus-ring"
            >
              <Download className="h-4 w-4" />
              {t(config.action, language)}
            </a>
            {form.relatedSlug && (
              <Link
                href={`/forms/${form.relatedSlug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-imus-red hover:underline focus-ring rounded-sm"
              >
                {language === "fil" ? "O mag-apply online" : "Or apply online"}
              </Link>
            )}
          </>
        )}
      </div>
    </article>
  );
}
