"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { HERO_IMAGE_URL, POPULAR_SEARCHES } from "@/lib/constants";
import { STRINGS, t } from "@/lib/i18n";

export default function HeroSection() {
  const { language } = useLanguage();

  return (
    <>
      <section className="relative flex min-h-[480px] items-center overflow-hidden md:min-h-[560px]">
        <Image
          src={HERO_IMAGE_URL}
          alt="City of Imus Government Center"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-tenant-navy/65" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-tenant-green">
                {STRINGS.vision.en}
              </p>
              <h1 className="mt-2 font-heading text-xl font-bold leading-snug text-white md:text-2xl lg:text-[1.65rem]">
                {STRINGS.visionText.en}
              </h1>
              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-tenant-green">
                {STRINGS.mission.en}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-base">
                {STRINGS.missionText.en}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/75 md:text-sm"
            >
              <span className="font-medium">{language === "fil" ? "Popular:" : "Popular:"}</span>
              {POPULAR_SEARCHES.map((item, i) => (
                <span key={item.href} className="inline-flex items-center gap-3">
                  {"external" in item && item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-tenant-green focus-ring rounded-sm"
                    >
                      {t(item.label, language)}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-tenant-green focus-ring rounded-sm"
                    >
                      {t(item.label, language)}
                    </Link>
                  )}
                  {i < POPULAR_SEARCHES.length - 1 && (
                    <span className="text-white/30" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
