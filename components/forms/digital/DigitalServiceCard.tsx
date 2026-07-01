"use client";

import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import type { CityForm } from "@/lib/forms";
import { getFormMeta } from "@/lib/digital-services";
import { t } from "@/lib/i18n";
import ServiceMiniLogo from "@/components/forms/digital/ServiceMiniLogo";

interface DigitalServiceCardProps {
  form: CityForm;
}

export default function DigitalServiceCard({ form }: DigitalServiceCardProps) {
  const meta = getFormMeta(form);

  const applyHref =
    form.mode === "online"
      ? `/forms/${form.slug}`
      : form.relatedSlug
        ? `/forms/${form.relatedSlug}`
        : form.pdfUrl;

  const isExternal = form.mode === "download" && !form.relatedSlug;

  return (
    <article className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-card transition-shadow hover:shadow-float">
      <div className="mb-4 flex items-start gap-3">
        <ServiceMiniLogo slug={form.slug} categoryId={form.categoryId} size="md" />
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="font-semibold text-tenant-navy line-clamp-2">{t(form.name)}</h3>
          <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{t(form.description)}</p>
        </div>
      </div>

      <dl className="mt-auto space-y-2 border-t border-gray-50 pt-4 text-xs text-gray-600">
        <div className="flex justify-between gap-2">
          <dt className="font-medium text-gray-400">Processing Time</dt>
          <dd className="text-right font-medium text-tenant-navy">{meta.processingTime}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="font-medium text-gray-400">Requirements</dt>
          <dd className="text-right font-medium text-tenant-navy">{meta.requirements}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="font-medium text-gray-400">Fee</dt>
          <dd className="text-right font-medium text-tenant-navy">{meta.fee}</dd>
        </div>
      </dl>

      <div className="mt-4">
        {isExternal ? (
          <a
            href={form.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-tenant-navy px-4 py-2.5 text-sm font-semibold text-tenant-navy transition-colors hover:bg-tenant-navy hover:text-white focus-ring"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        ) : (
          <Link
            href={applyHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-tenant-navy px-4 py-2.5 text-sm font-semibold text-tenant-navy transition-colors hover:bg-tenant-navy hover:text-white focus-ring"
          >
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
