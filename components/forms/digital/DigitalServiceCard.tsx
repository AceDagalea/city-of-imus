"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import type { CityForm } from "@/lib/forms";
import { getFormMeta } from "@/lib/digital-services";
import { getServiceIconStyle } from "@/lib/service-icons";
import { STRINGS, t } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageContext";

interface DigitalServiceCardProps {
  form: CityForm;
}

export default function DigitalServiceCard({ form }: DigitalServiceCardProps) {
  const { language } = useLanguage();
  const meta = getFormMeta(form);
  const iconStyle = getServiceIconStyle(form.slug, form.categoryId);
  const Icon = iconStyle.icon;
  const isOnline = form.mode === "online";

  const applyHref =
    form.mode === "online"
      ? `/forms/${form.slug}`
      : form.relatedSlug
        ? `/forms/${form.relatedSlug}`
        : form.pdfUrl;

  const isExternal = form.mode === "download" && !form.relatedSlug;

  return (
    <article className="group relative flex h-full flex-col rounded-[14px] border border-[#e7eaf0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,64,.04),0_8px_24px_rgba(16,24,64,.06)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#c9d6f5] hover:shadow-[0_12px_30px_rgba(16,24,64,.1)]">
      <span
        className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide ${
          isOnline ? "bg-[#e7f6ee] text-[#1f9d55]" : "bg-[#f1f3f8] text-[#7a8398]"
        }`}
      >
        {t(isOnline ? STRINGS.pillOnline : STRINGS.pillOffice, language)}
      </span>

      <div className="flex items-start gap-3.5 pr-16">
        <span
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#eef2fb] text-[#2b57c4]"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" strokeWidth={2.25} />
        </span>
        <div className="min-w-0">
          <h3 className="text-[15.5px] font-bold leading-snug text-[#12275c]">
            {t(form.name, language)}
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-[#6b7280] line-clamp-2">
            {t(form.description, language)}
          </p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-1.5 border-y border-[#e7eaf0] py-3.5">
        <div className="flex flex-col gap-0.5">
          <dt className="text-[10.5px] uppercase tracking-wide text-[#6b7280]">
            {t(STRINGS.metaProcessing, language)}
          </dt>
          <dd className="text-[12.5px] font-semibold text-[#1c2333]">{meta.processingTime}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-[10.5px] uppercase tracking-wide text-[#6b7280]">
            {t(STRINGS.metaRequirements, language)}
          </dt>
          <dd className="text-[12.5px] font-semibold text-[#2b57c4]">{meta.requirements}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-[10.5px] uppercase tracking-wide text-[#6b7280]">
            {t(STRINGS.metaFee, language)}
          </dt>
          <dd className="text-[12.5px] font-semibold text-[#1c2333]">{meta.fee}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-4">
        {isExternal ? (
          <a
            href={form.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-[#12275c] px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors group-hover:bg-[#1f9d55] group-hover:shadow-[0_6px_16px_rgba(31,157,85,.3)] focus-ring"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {t(STRINGS.downloadPdf, language)}
          </a>
        ) : (
          <Link
            href={applyHref}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-[#12275c] px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors group-hover:bg-[#1f9d55] group-hover:shadow-[0_6px_16px_rgba(31,157,85,.3)] focus-ring"
          >
            {t(STRINGS.applyNow, language)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
