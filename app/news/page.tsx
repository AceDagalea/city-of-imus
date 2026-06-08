"use client";

import { motion } from "framer-motion";
import AnnouncementCard from "@/components/shared/AnnouncementCard";
import { useLanguage } from "@/context/LanguageContext";
import { ANNOUNCEMENTS, NEWS_ITEMS } from "@/lib/constants";
import { STRINGS, t } from "@/lib/i18n";

export default function NewsPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-imus-gray pt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl font-bold text-imus-navy">
            {STRINGS.newsTitle[language]}
          </h1>
        </motion.div>

        <section id="announcements" aria-labelledby="announcements-section" className="mb-14">
          <h2
            id="announcements-section"
            className="mb-6 font-heading text-2xl font-bold text-imus-navy"
          >
            {language === "fil" ? "Mga Anunsyo" : "Announcements"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ANNOUNCEMENTS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AnnouncementCard
                  image={item.image}
                  date={item.date}
                  title={t(item.title, language)}
                  excerpt={t(item.excerpt, language)}
                  href={item.href}
                  readMoreLabel={STRINGS.readMore[language]}
                  external={item.external}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section aria-labelledby="news-section">
          <h2 id="news-section" className="mb-6 font-heading text-2xl font-bold text-imus-navy">
            {language === "fil" ? "Balita" : "City News"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NEWS_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AnnouncementCard
                  image={item.image}
                  date={item.date}
                  title={t(item.title, language)}
                  excerpt={t(item.excerpt, language)}
                  href={item.href}
                  readMoreLabel={STRINGS.readMore[language]}
                  external={item.external}
                />
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
