"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CityForm } from "@/lib/forms";
import { t } from "@/lib/i18n";
import ServiceMiniLogo from "@/components/forms/digital/ServiceMiniLogo";

export default function MostRequestedCard({ form }: { form: CityForm }) {
  const href =
    form.mode === "online"
      ? `/forms/${form.slug}`
      : form.relatedSlug
        ? `/forms/${form.relatedSlug}`
        : `/forms/${form.slug}`;

  return (
    <Link
      href={href}
      className="group flex min-w-[210px] flex-1 flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-imus-skyDark hover:shadow-float focus-ring"
    >
      <ServiceMiniLogo slug={form.slug} categoryId={form.categoryId} size="lg" className="mb-4" />
      <h3 className="font-semibold text-imus-navy group-hover:text-imus-red line-clamp-2">
        {t(form.name)}
      </h3>
      <p className="mt-2 flex-1 text-sm text-gray-500 line-clamp-2">{t(form.description)}</p>
      <ChevronRight className="mt-4 h-5 w-5 text-imus-navy/30 transition-transform group-hover:translate-x-1 group-hover:text-imus-navy" />
    </Link>
  );
}
