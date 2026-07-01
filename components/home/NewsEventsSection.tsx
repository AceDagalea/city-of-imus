"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { NEWS_ITEMS, UPCOMING_EVENTS } from "@/lib/constants";
import { t } from "@/lib/i18n";

function formatDate(dateStr: string, lang: "en" | "fil") {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString(lang === "fil" ? "fil-PH" : "en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatEventDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return {
    month: date.toLocaleDateString("en", { month: "short" }).toUpperCase(),
    day: date.getDate(),
  };
}

export default function NewsEventsSection() {
  const { language } = useLanguage();
  const featured = NEWS_ITEMS.find((n) => n.featured) ?? NEWS_ITEMS[0];
  const otherNews = NEWS_ITEMS.filter((n) => n.id !== featured.id).slice(0, 3);

  return (
    <section className="bg-tenant-gray py-12 md:py-16" aria-labelledby="news-events-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center justify-between">
              <h2
                id="news-events-heading"
                className="font-heading text-2xl font-bold text-tenant-navy md:text-3xl"
              >
                {language === "fil" ? "Balita at Updates" : "News & Updates"}
              </h2>
              <Link
                href="/news"
                className="flex items-center gap-1 text-sm font-semibold text-tenant-red transition-colors hover:text-tenant-navy focus-ring rounded-sm"
              >
                {language === "fil" ? "Lahat ng Balita" : "View All News"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-5">
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card md:col-span-3">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={featured.image}
                    alt={t(featured.title, language)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <span className="absolute left-3 top-3 rounded bg-tenant-red px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                    Featured
                  </span>
                </div>
                <div className="p-4">
                  <time className="text-xs text-tenant-navy/50">
                    {formatDate(featured.date, language)}
                  </time>
                  <h3 className="mt-1.5 font-heading text-base font-bold text-tenant-navy line-clamp-2">
                    {featured.external ? (
                      <a
                        href={featured.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-tenant-red focus-ring rounded-sm"
                      >
                        {t(featured.title, language)}
                      </a>
                    ) : (
                      <Link href={featured.href} className="hover:text-tenant-red focus-ring rounded-sm">
                        {t(featured.title, language)}
                      </Link>
                    )}
                  </h3>
                </div>
              </div>

              <ul className="flex flex-col justify-between gap-3 md:col-span-2">
                {otherNews.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-1 gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-card"
                  >
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image src={item.image} alt="" fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <time className="text-[10px] text-tenant-navy/50">
                        {formatDate(item.date, language)}
                      </time>
                      <h4 className="mt-0.5 text-xs font-semibold text-tenant-navy line-clamp-3">
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-tenant-red focus-ring rounded-sm"
                          >
                            {t(item.title, language)}
                          </a>
                        ) : (
                          <Link href={item.href} className="hover:text-tenant-red focus-ring rounded-sm">
                            {t(item.title, language)}
                          </Link>
                        )}
                      </h4>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-tenant-navy md:text-3xl">
                {language === "fil" ? "Mga Kaganapan" : "Upcoming Events"}
              </h2>
              <Link
                href="/news"
                className="flex items-center gap-1 text-sm font-semibold text-tenant-red transition-colors hover:text-tenant-navy focus-ring rounded-sm"
              >
                {language === "fil" ? "Lahat" : "View All Events"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="space-y-3">
              {UPCOMING_EVENTS.map((event) => {
                const { month, day } = formatEventDate(event.date);
                return (
                  <li
                    key={event.id}
                    className="flex gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-card"
                  >
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-tenant-navy text-white">
                      <span className="text-[10px] font-bold leading-none">{month}</span>
                      <span className="text-xl font-bold leading-none">{day}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-tenant-navy">
                        <Link href={event.href} className="hover:text-tenant-red focus-ring rounded-sm">
                          {t(event.title, language)}
                        </Link>
                      </h3>
                      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          {t(event.location, language)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/news"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border-2 border-tenant-navy px-5 py-2.5 text-sm font-semibold text-tenant-navy transition-colors hover:bg-tenant-navy hover:text-white focus-ring"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {language === "fil" ? "Buong Kalendaryo" : "View Full Calendar"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
