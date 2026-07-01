"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { useLanguage } from "@/context/LanguageContext";
import { DEPARTMENTS_HERO } from "@/lib/departments";
import { SITE_URL } from "@/lib/constants";
import { t } from "@/lib/i18n";

const HERO_IMAGE = `${SITE_URL}/Media/newcityhall.jpg`;

export default function DepartmentsHero() {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-tenant-navy" aria-labelledby="departments-hero-heading">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tenant-navy via-tenant-navy/80 to-tenant-navy/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: language === "fil" ? "Pamahalaan" : "Government" },
          ]}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <h1
            id="departments-hero-heading"
            className="font-heading text-3xl font-bold text-white md:text-4xl"
          >
            {t(DEPARTMENTS_HERO.title, language)}
          </h1>
          <div className="mt-4 h-1 w-14 rounded-full bg-tenant-green" aria-hidden="true" />
          <p className="mt-4 max-w-xl text-white/80">
            {t(DEPARTMENTS_HERO.subtitle, language)}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
