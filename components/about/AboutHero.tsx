"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ABOUT_HERO, ABOUT_HERO_IMAGE } from "@/lib/about";
import type { LocalizedString } from "@/lib/i18n";
import { t } from "@/lib/i18n";

interface AboutHeroProps {
  title?: LocalizedString;
  subtitle?: LocalizedString;
}

export default function AboutHero({
  title = ABOUT_HERO.title,
  subtitle = ABOUT_HERO.subtitle,
}: AboutHeroProps) {
  const { language } = useLanguage();

  return (
    <section
      className="relative min-h-[320px] overflow-hidden md:min-h-[380px]"
      aria-labelledby="about-hero-heading"
    >
      <Image
        src={ABOUT_HERO_IMAGE}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-tenant-navy/90 via-tenant-navy/65 to-tenant-navy/35" />

      <div className="relative mx-auto flex min-h-[320px] max-w-7xl items-center px-4 py-12 md:min-h-[380px] md:px-6 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl text-white"
        >
          <h1
            id="about-hero-heading"
            className="font-heading text-4xl font-extrabold leading-tight md:text-5xl"
          >
            {t(title, language)}
          </h1>
          <div className="mt-5 h-1 w-16 rounded-full bg-tenant-green" aria-hidden="true" />
          <p className="mt-5 text-lg font-medium text-white/90 md:text-xl">
            {t(subtitle, language)}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
