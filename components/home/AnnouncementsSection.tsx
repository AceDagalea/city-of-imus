"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ANNOUNCEMENTS } from "@/lib/constants";
import { STRINGS, t } from "@/lib/i18n";

type AnnouncementItem = (typeof ANNOUNCEMENTS)[number];

function formatDate(dateStr: string, lang: "en" | "fil") {
  return new Date(dateStr + "T00:00:00").toLocaleDateString(lang === "fil" ? "fil-PH" : "en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function AnnouncementCta({
  item,
  children,
  className,
}: {
  item: AnnouncementItem;
  children: ReactNode;
  className?: string;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {children}
    </Link>
  );
}

export default function AnnouncementsSection() {
  const { language } = useLanguage();
  const lang = language === "fil" ? "fil" : "en";
  const featured = ANNOUNCEMENTS.find((a) => a.featured) ?? ANNOUNCEMENTS[0];
  const others = ANNOUNCEMENTS.filter((a) => a.id !== featured.id);

  return (
    <section
      className="border-b border-gray-100 bg-white py-10 md:py-14"
      aria-labelledby="home-announcements-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tenant-navy text-white shadow-sm">
              <Megaphone className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="home-announcements-heading"
                className="font-heading text-2xl font-bold text-tenant-navy md:text-3xl"
              >
                {language === "fil" ? "Mga Anunsyo" : "Announcements"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {language === "fil"
                  ? "Mahahalagang abiso at update mula sa Pamahalaang Lungsod ng Imus."
                  : "Important notices and updates from the City Government of Imus."}
              </p>
            </div>
          </div>
          <Link
            href="/news#announcements"
            className="inline-flex items-center gap-1 text-sm font-semibold text-tenant-red transition-colors hover:text-tenant-navy focus-ring rounded-sm"
          >
            {language === "fil" ? "Lahat ng Anunsyo" : "View All Announcements"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-tenant-skyDark bg-tenant-sky shadow-card"
        >
          <div className="grid lg:grid-cols-5">
            <div className="relative aspect-[16/9] lg:col-span-2 lg:aspect-auto lg:min-h-[280px]">
              <Image
                src={featured.image}
                alt={t(featured.title, language)}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <span className="absolute left-4 top-4 rounded-full bg-tenant-red px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                {language === "fil" ? "Pinakabago" : "Latest"}
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 lg:col-span-3 lg:p-8">
              <time className="text-xs font-semibold uppercase tracking-wider text-tenant-navy/50">
                {formatDate(featured.date, lang)}
              </time>
              <h3 className="mt-2 font-heading text-xl font-bold text-tenant-navy md:text-2xl">
                {t(featured.title, language)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-tenant-navy/75 md:text-base">
                {t(featured.excerpt, language)}
              </p>
              <AnnouncementCta
                item={featured}
                className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-tenant-red transition-colors hover:text-tenant-navy focus-ring rounded-sm"
              >
                {STRINGS.readMore[language]}
                <ArrowRight className="h-4 w-4" />
              </AnnouncementCta>
            </div>
          </div>
        </motion.article>

        {others.length > 0 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {others.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-28 shrink-0 self-stretch sm:w-36">
                  <Image
                    src={item.image}
                    alt={t(item.title, language)}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-4">
                  <time className="text-[10px] font-semibold uppercase tracking-wider text-tenant-navy/50">
                    {formatDate(item.date, lang)}
                  </time>
                  <h3 className="mt-1 font-heading text-sm font-bold text-tenant-navy line-clamp-2 sm:text-base">
                    {t(item.title, language)}
                  </h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-gray-600 line-clamp-2 sm:text-sm">
                    {t(item.excerpt, language)}
                  </p>
                  <AnnouncementCta
                    item={item}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-tenant-red transition-colors hover:text-tenant-navy focus-ring rounded-sm sm:text-sm"
                  >
                    {STRINGS.readMore[language]}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </AnnouncementCta>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
