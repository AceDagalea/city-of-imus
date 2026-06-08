"use client";

import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";

interface FormApplicationHeroProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  draftSavedAt?: string | null;
}

export default function FormApplicationHero({
  title,
  description,
  breadcrumbs,
  draftSavedAt,
}: FormApplicationHeroProps) {
  return (
    <section className="bg-imus-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <nav aria-label="Breadcrumb" className="mb-3 text-sm">
              <ol className="flex flex-wrap items-center gap-1.5 text-white/70">
                {breadcrumbs.map((item, i) => (
                  <li key={item.label + i} className="flex items-center gap-1.5">
                    {i > 0 && <span className="text-white/40">›</span>}
                    {item.href ? (
                      <Link href={item.href} className="hover:text-imus-green focus-ring rounded-sm">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-imus-green">{item.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <h1 className="font-heading text-3xl font-bold md:text-4xl">{title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">{description}</p>
          </div>

          {draftSavedAt && (
            <div className="shrink-0 rounded-xl border border-white/25 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Clock className="h-4 w-4 text-imus-green" aria-hidden="true" />
                Draft saved
                <CheckCircle2 className="h-4 w-4 text-green-400" aria-hidden="true" />
              </div>
              <p className="mt-1 text-xs text-white/60">Last saved: {draftSavedAt}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
