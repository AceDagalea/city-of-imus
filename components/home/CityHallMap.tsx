"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Clock, ExternalLink, Facebook, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT, MAP_EMBED_URL } from "@/lib/constants";
import { STRINGS } from "@/lib/i18n";

const MAPS_URL = "https://maps.google.com/?q=New+Imus+City+Hall";
const EMBED_HEIGHT = 380;

const SOCIAL_COLUMNS = [
  {
    id: "city",
    title: { en: "City of Imus", fil: "Lungsod ng Imus" },
    href: CONTACT.facebook,
    handle: "@CityofImus",
    iframeTitle: "City of Imus on Facebook",
  },
  {
    id: "tourism",
    title: { en: "Imus City Tourism", fil: "Imus City Tourism" },
    href: CONTACT.facebookTourism,
    handle: "@ImusCityTourism",
    iframeTitle: "Imus City Tourism on Facebook",
  },
] as const;

function FacebookEmbed({ href, title }: { href: string; title: string }) {
  return (
    <iframe
      src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(href)}&tabs=timeline&width=500&height=${EMBED_HEIGHT}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
      width="100%"
      height={EMBED_HEIGHT}
      style={{ border: "none", overflow: "hidden" }}
      scrolling="no"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      title={title}
      loading="lazy"
      className="block w-full"
    />
  );
}

function ColumnCard({
  title,
  children,
  footer,
  delay = 0,
}: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-gray-100"
    >
      <header className="flex min-h-[3.25rem] items-center border-b border-gray-100 px-5 py-4">
        <h3 className="font-heading text-base font-semibold text-imus-navy md:text-lg">{title}</h3>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">{children}</div>

      {footer ? (
        <footer className="mt-auto border-t border-gray-100 bg-imus-gray/30 px-5 py-3">{footer}</footer>
      ) : null}
    </motion.article>
  );
}

export default function CityHallMap() {
  const { language } = useLanguage();

  return (
    <section className="bg-imus-gray py-12 md:py-16" aria-labelledby="stay-connected-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-10"
        >
          <h2
            id="stay-connected-heading"
            className="font-heading text-2xl font-bold text-imus-navy md:text-3xl"
          >
            {STRINGS.stayConnected[language]}
          </h2>
          <div className="mt-3 h-1 w-14 rounded-full bg-imus-green" aria-hidden="true" />
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8 lg:items-stretch">
          <ColumnCard
            title={STRINGS.findUs[language]}
            delay={0}
            footer={
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-imus-green transition-colors hover:text-imus-greenDark focus-ring rounded-sm"
              >
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                {language === "fil" ? "Buksan sa Google Maps" : "Open in Google Maps"}
              </a>
            }
          >
            <div className="space-y-4 p-5">
              <div className="flex items-start gap-3 rounded-xl bg-imus-green/10 p-4 ring-1 ring-imus-green/15">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-imus-green text-white">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-relaxed text-imus-navy">
                    {CONTACT.address}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-imus-greenDark" aria-hidden="true" />
                    {CONTACT.hours}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl ring-1 ring-gray-200">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height={EMBED_HEIGHT}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="New Imus City Hall location on Google Maps"
                  className="block w-full"
                />
              </div>
            </div>
          </ColumnCard>

          {SOCIAL_COLUMNS.map((column, index) => (
            <ColumnCard
              key={column.id}
              title={language === "fil" ? column.title.fil : column.title.en}
              delay={(index + 1) * 0.08}
              footer={
                <a
                  href={column.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-imus-navy transition-colors hover:text-imus-green focus-ring rounded-sm"
                >
                  <Facebook className="h-4 w-4 shrink-0 text-imus-green" aria-hidden="true" />
                  {column.handle}
                </a>
              }
            >
              <div className="min-h-[380px] overflow-hidden bg-white">
                <FacebookEmbed href={column.href} title={column.iframeTitle} />
              </div>
            </ColumnCard>
          ))}
        </div>
      </div>
    </section>
  );
}
