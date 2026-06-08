"use client";

import Image from "next/image";
import Link from "next/link";
import { Megaphone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ANNOUNCEMENTS } from "@/lib/constants";
import { t } from "@/lib/i18n";

export default function AnnouncementsCard() {
  const { language } = useLanguage();
  const featured = ANNOUNCEMENTS.find((a) => a.featured) ?? ANNOUNCEMENTS[0];

  return (
    <section className="bg-imus-gray py-8 md:py-10" aria-labelledby="announcements-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="overflow-hidden rounded-2xl bg-imus-sky border border-imus-skyDark">
          <div className="grid md:grid-cols-5">
            <div className="relative aspect-[16/7] md:col-span-2 md:aspect-auto md:min-h-[200px]">
              <Image
                src={featured.image}
                alt={t(featured.title, language)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:col-span-3 md:p-8">
              <div className="mb-3 flex items-center gap-2 text-imus-navy">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-imus-navy text-white">
                  <Megaphone className="h-4 w-4" aria-hidden="true" />
                </div>
                <h2
                  id="announcements-heading"
                  className="text-sm font-bold uppercase tracking-wider"
                >
                  {language === "fil" ? "Mga Anunsyo" : "Announcements"}
                </h2>
              </div>
              <h3 className="font-heading text-xl font-bold text-imus-navy md:text-2xl">
                {t(featured.title, language)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-imus-navy/70 md:text-base">
                {t(featured.excerpt, language)}
              </p>
              {featured.external ? (
                <a
                  href={featured.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-imus-red transition-colors hover:text-imus-navy focus-ring rounded-sm"
                >
                  {language === "fil" ? "Basahin pa" : "Read more"}
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  href={featured.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-imus-red transition-colors hover:text-imus-navy focus-ring rounded-sm"
                >
                  {language === "fil" ? "Basahin pa" : "Read more"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
