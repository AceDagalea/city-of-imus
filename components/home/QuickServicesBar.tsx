"use client";

import { motion } from "framer-motion";
import ServiceTile from "@/components/shared/ServiceTile";
import { useLanguage } from "@/context/LanguageContext";
import { QUICK_SERVICES } from "@/lib/constants";
import { t } from "@/lib/i18n";

export default function QuickServicesBar() {
  const { language } = useLanguage();

  return (
    <section className="bg-imus-gray py-8" aria-label="Quick services">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {QUICK_SERVICES.map((service, index) => (
            <motion.div
              key={service.label.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="shrink-0"
            >
              <ServiceTile
                icon={service.icon}
                label={t(service.label, language)}
                href={service.href}
                external={"external" in service ? Boolean(service.external) : false}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
