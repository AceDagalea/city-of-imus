"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Button from "@/components/shared/Button";
import { useLanguage } from "@/context/LanguageContext";
import { LANDMARKS } from "@/lib/constants";
import { STRINGS, t } from "@/lib/i18n";

export default function LandmarksCarousel() {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return LANDMARKS.length - 1;
      if (next >= LANDMARKS.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paused, paginate]);

  const landmark = LANDMARKS[current];

  return (
    <section className="bg-tenant-gray py-16" aria-labelledby="landmarks-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.h2
          id="landmarks-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 font-heading text-3xl font-bold text-tenant-navy"
        >
          {STRINGS.landmarks[language]}
        </motion.h2>

        <div
          className="relative overflow-hidden rounded-2xl shadow-xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative h-[400px] md:h-[500px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 200 : -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -200 : 200 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={landmark.image}
                  alt={t(landmark.title, language)}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tenant-navy/90 via-tenant-navy/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
                    {t(landmark.title, language)}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {landmark.address}
                  </p>
                  <div className="mt-4">
                    <Button href="/#map" variant="primary">
                      {STRINGS.visitUs[language]}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40 focus-ring"
            aria-label="Previous landmark"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40 focus-ring"
            aria-label="Next landmark"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-4 right-4 flex gap-2">
            {LANDMARKS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2 w-2 rounded-full transition-colors focus-ring ${
                  i === current ? "bg-tenant-green" : "bg-white/50"
                }`}
                aria-label={`Go to landmark ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
