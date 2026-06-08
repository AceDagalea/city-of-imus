"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, LineChart, Store } from "lucide-react";
import YouTubeEmbed from "@/components/shared/YouTubeEmbed";
import { useLanguage } from "@/context/LanguageContext";
import {
  INVEST_CLOSING,
  INVEST_PARAGRAPHS,
  INVEST_PLATFORMS,
  INVEST_SECTION,
  INVEST_VIDEO,
} from "@/lib/invest";
import { t } from "@/lib/i18n";

const HIGHLIGHTS = [
  {
    icon: LineChart,
    label: { en: "Economically Dynamic", fil: "Makinarya" },
  },
  {
    icon: Building2,
    label: { en: "97 Barangays", fil: "97 Barangay" },
  },
  {
    icon: Store,
    label: { en: "Business Friendly", fil: "Business Friendly" },
  },
] as const;

export default function WhyInvestSection() {
  const { language } = useLanguage();

  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="why-invest-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2
              id="why-invest-heading"
              className="font-heading text-2xl font-bold text-imus-navy md:text-3xl"
            >
              {t(INVEST_SECTION.title, language)}
            </h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-imus-green" aria-hidden="true" />
            <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
              {t(INVEST_SECTION.subtitle, language)}
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 flex flex-wrap gap-3"
            aria-label={language === "fil" ? "Mga pangunahing katangian" : "Key highlights"}
          >
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li
                key={label.en}
                className="inline-flex items-center gap-2 rounded-full border border-imus-green/20 bg-imus-green/10 px-4 py-2 text-sm font-semibold text-imus-navy"
              >
                <Icon className="h-4 w-4 text-imus-greenDark" aria-hidden="true" />
                {t(label, language)}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 overflow-hidden rounded-2xl shadow-card ring-1 ring-gray-100"
        >
          <YouTubeEmbed
            videoId={INVEST_VIDEO.id}
            startSeconds={INVEST_VIDEO.startSeconds}
            title={
              language === "fil"
                ? "Bakit mag-invest sa Imus — promotional video"
                : "Why invest in Imus — promotional video"
            }
          />
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 rounded-2xl border border-gray-100 bg-imus-gray/40 p-6 md:p-8"
        >
          <div className="space-y-4 text-sm leading-relaxed text-gray-700 md:text-base">
            {INVEST_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.en}>{t(paragraph, language)}</p>
            ))}

            <div>
              <p className="font-semibold text-imus-navy">
                {language === "fil"
                  ? "Nagtatag ang Pamahalaang Lungsod ng mga platform para sa negosyo, tulad ng:"
                  : "The City Government has also established several platforms for businesses, such as the following:"}
              </p>
              <ol className="mt-3 list-none space-y-3">
                {INVEST_PLATFORMS.map((platform, index) => (
                  <li key={platform.en} className="flex gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-imus-green text-sm font-bold text-white"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{t(platform, language)}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p>{language === "fil" ? INVEST_CLOSING.fil : INVEST_CLOSING.en}</p>
          </div>

          <a
            href={INVEST_SECTION.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-imus-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-imus-navy/90 focus-ring"
          >
            {t(INVEST_SECTION.cta, language)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.article>
      </div>
    </section>
  );
}
