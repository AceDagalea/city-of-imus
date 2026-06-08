"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_URL } from "@/lib/constants";
import { t, type LocalizedString } from "@/lib/i18n";

const HERO_IMAGE = `${SITE_URL}/Media/newcityhall.jpg`;

interface GovernmentPageHeroProps {
  title: LocalizedString;
  subtitle: LocalizedString;
  breadcrumbLabel?: LocalizedString;
}

export default function GovernmentPageHero({
  title,
  subtitle,
  breadcrumbLabel,
}: GovernmentPageHeroProps) {
  const { language } = useLanguage();
  const crumb = breadcrumbLabel ?? title;

  return (
    <section className="relative overflow-hidden bg-imus-navy" aria-labelledby="gov-page-hero-heading">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-imus-navy via-imus-navy/80 to-imus-navy/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: t(crumb, language) },
          ]}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <h1
            id="gov-page-hero-heading"
            className="font-heading text-3xl font-bold text-white md:text-4xl"
          >
            {t(title, language)}
          </h1>
          <div className="mt-4 h-1 w-14 rounded-full bg-imus-green" aria-hidden="true" />
          <p className="mt-4 max-w-xl text-white/80">{t(subtitle, language)}</p>
        </motion.div>
      </div>
    </section>
  );
}
