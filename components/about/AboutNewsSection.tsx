"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ABOUT_NEWS_PREVIEW } from "@/lib/about";
import { t } from "@/lib/i18n";

function formatDate(dateStr: string, lang: "en" | "fil") {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString(lang === "fil" ? "fil-PH" : "en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function AboutNewsSection() {
  const { language } = useLanguage();

  return (
    <section className="bg-tenant-gray py-12 md:py-16" aria-labelledby="about-news-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2
            id="about-news-heading"
            className="font-heading text-2xl font-bold text-tenant-navy md:text-3xl"
          >
            {language === "fil" ? "Balita at Updates" : "News & Updates"}
          </h2>
          <Link
            href="/news"
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-tenant-green transition-colors hover:text-tenant-greenDark focus-ring rounded-sm"
          >
            {language === "fil" ? "Lahat ng balita" : "View all news"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {ABOUT_NEWS_PREVIEW.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full bg-tenant-gray">
                  <Image
                    src={item.image}
                    alt={t(item.title, language)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="w-fit rounded-full bg-tenant-green/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tenant-greenDark">
                    {t(item.category, language)}
                  </span>
                  <time className="mt-2 text-xs text-gray-400">
                    {formatDate(item.date, language)}
                  </time>
                  <h3 className="mt-1.5 font-heading text-sm font-bold text-tenant-navy line-clamp-2">
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-tenant-green focus-ring rounded-sm"
                      >
                        {t(item.title, language)}
                      </a>
                    ) : (
                      <Link href={item.href} className="hover:text-tenant-green focus-ring rounded-sm">
                        {t(item.title, language)}
                      </Link>
                    )}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-gray-500 line-clamp-3">
                    {t(item.excerpt, language)}
                  </p>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-tenant-green hover:text-tenant-greenDark focus-ring rounded-sm"
                    >
                      {language === "fil" ? "Basahin pa" : "Read more"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-tenant-green hover:text-tenant-greenDark focus-ring rounded-sm"
                    >
                      {language === "fil" ? "Basahin pa" : "Read more"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tenant-green/15 text-tenant-greenDark">
                <Bell className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-tenant-navy">
                {language === "fil" ? "Manatiling Updated" : "Stay Updated"}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {language === "fil"
                  ? "Makatanggap ng pinakabagong balita at anunsyo mula sa Lungsod ng Imus."
                  : "Get the latest news and announcements from the City of Imus."}
              </p>
              <form
                className="mt-5 space-y-3"
                onSubmit={(e) => e.preventDefault()}
                aria-label={language === "fil" ? "Newsletter signup" : "Newsletter signup"}
              >
                <label className="sr-only" htmlFor="about-newsletter-email">
                  Email address
                </label>
                <input
                  id="about-newsletter-email"
                  type="email"
                  required
                  placeholder={language === "fil" ? "Email address" : "Email address"}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-tenant-green focus:ring-2 focus:ring-tenant-green/20"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-tenant-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tenant-greenDark focus-ring"
                >
                  {language === "fil" ? "Mag-subscribe" : "Subscribe"}
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
