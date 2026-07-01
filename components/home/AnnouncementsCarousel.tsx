"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnnouncementCard from "@/components/shared/AnnouncementCard";
import { useLanguage } from "@/context/LanguageContext";
import { NEWS_ITEMS } from "@/lib/constants";
import { STRINGS, t } from "@/lib/i18n";

export default function AnnouncementsCarousel() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const visibleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3;
  const maxIndex = Math.max(0, NEWS_ITEMS.length - visibleCount);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        const next = prev + newDirection;
        if (next < 0) return maxIndex;
        if (next > maxIndex) return 0;
        return next;
      });
    },
    [maxIndex]
  );

  return (
    <section className="bg-white py-16" aria-labelledby="announcements-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.h2
          id="announcements-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 font-heading text-3xl font-bold text-tenant-navy"
        >
          {STRINGS.announcements[language]}
        </motion.h2>

        <div className="relative">
          <div className="hidden gap-6 md:grid md:grid-cols-3">
            {NEWS_ITEMS.slice(currentIndex, currentIndex + 3).map((item) => (
              <AnnouncementCard
                key={item.id}
                image={item.image}
                date={item.date}
                title={t(item.title, language)}
                excerpt={t(item.excerpt, language)}
                href={item.href}
                readMoreLabel={STRINGS.readMore[language]}
                external={item.external}
              />
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.3 }}
              >
                <AnnouncementCard
                  image={NEWS_ITEMS[currentIndex].image}
                  date={NEWS_ITEMS[currentIndex].date}
                  title={t(NEWS_ITEMS[currentIndex].title, language)}
                  excerpt={t(NEWS_ITEMS[currentIndex].excerpt, language)}
                  href={NEWS_ITEMS[currentIndex].href}
                  readMoreLabel={STRINGS.readMore[language]}
                  external={NEWS_ITEMS[currentIndex].external}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              className="rounded-full bg-tenant-navy p-2 text-white transition-colors hover:bg-tenant-navyDark focus-ring"
              aria-label="Previous announcements"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Announcement slides">
              {NEWS_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`h-2 w-2 rounded-full transition-colors focus-ring ${
                    i === currentIndex ? "bg-tenant-green" : "bg-gray-300"
                  }`}
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`Go to announcement ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              className="rounded-full bg-tenant-navy p-2 text-white transition-colors hover:bg-tenant-navyDark focus-ring"
              aria-label="Next announcements"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
