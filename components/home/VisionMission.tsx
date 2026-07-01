"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS } from "@/lib/i18n";

export default function VisionMission() {
  const { language } = useLanguage();

  return (
    <section className="bg-tenant-navy py-16" aria-labelledby="vision-mission-heading">
      <h2 id="vision-mission-heading" className="sr-only">
        Vision and Mission
      </h2>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-2xl font-bold text-white">
            {STRINGS.vision.en}
          </h3>
          <div className="mb-4 mt-2 h-1 w-16 bg-tenant-green" aria-hidden="true" />
          <p className="leading-relaxed text-white/80">{STRINGS.visionText.en}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="font-heading text-2xl font-bold text-white">
            {STRINGS.mission.en}
          </h3>
          <div className="mb-4 mt-2 h-1 w-16 bg-tenant-green" aria-hidden="true" />
          <p className="leading-relaxed text-white/80">{STRINGS.missionText.en}</p>
        </motion.div>
      </div>
    </section>
  );
}
