"use client";

import { motion } from "framer-motion";
import StatCard from "@/components/shared/StatCard";
import { useLanguage } from "@/context/LanguageContext";
import { CITY_STATS } from "@/lib/constants";
import { STRINGS, t } from "@/lib/i18n";

export default function CityStats() {
  const { language } = useLanguage();

  return (
    <section className="bg-tenant-gray py-16" aria-labelledby="stats-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.h2
          id="stats-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center font-heading text-3xl font-bold text-tenant-navy"
        >
          {STRINGS.cityStatistics[language]}
        </motion.h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {CITY_STATS.map((stat, index) => (
            <motion.div
              key={stat.label.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard
                value={stat.value}
                label={t(stat.label, language)}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
