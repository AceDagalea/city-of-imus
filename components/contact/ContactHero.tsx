"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_HERO } from "@/lib/contact";
import { t } from "@/lib/i18n";

export default function ContactHero() {
  const { language } = useLanguage();
  const lang = language === "fil" ? "fil" : "en";

  return (
    <section className="relative overflow-hidden bg-imus-navy text-white">
      <div className="absolute inset-0">
        <Image
          src={CONTACT_HERO.image}
          alt=""
          fill
          className="object-cover object-right opacity-55"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-imus-navy from-[42%] via-imus-navy/88 to-imus-navy/45" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6 md:pb-20 md:pt-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: language === "fil" ? "Makipag-ugnayan" : "Contact Us" },
          ]}
        />
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl"
        >
          {language === "fil" ? "Makipag-ugnayan" : "Contact Us"}
        </motion.h1>
        <div className="mt-4 h-1 w-16 rounded-full bg-imus-green" aria-hidden="true" />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-base text-white/85 md:text-lg"
        >
          {t(CONTACT_HERO.subtitle, lang)}
        </motion.p>
      </div>
    </section>
  );
}
