"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  HeartPulse,
  Shield,
  BookOpen,
  Users,
  Building2,
  FileCheck,
  Flame,
  ShieldCheck,
  Microscope,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/shared/Button";
import PageHeader from "@/components/shared/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { STRINGS, t } from "@/lib/i18n";

const iconMap: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  "heart-pulse": HeartPulse,
  shield: Shield,
  "book-open": BookOpen,
  users: Users,
  "building-2": Building2,
  "file-check": FileCheck,
  flame: Flame,
  "shield-check": ShieldCheck,
  microscope: Microscope,
};

export default function ServicesPage() {
  const { language } = useLanguage();

  return (
    <>
      <PageHeader
        title={STRINGS.servicesTitle[language]}
        subtitle={STRINGS.servicesSubtitle[language]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: STRINGS.servicesTitle[language] },
        ]}
      />
      <div className="bg-imus-gray">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">

        {SERVICE_CATEGORIES.map((category, catIndex) => (
          <section
            key={category.id}
            id={category.id}
            className="mb-12"
            aria-labelledby={`category-${category.id}`}
          >
            <motion.h2
              id={`category-${category.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 font-heading text-2xl font-bold text-imus-navy"
            >
              <span className="border-b-4 border-imus-green pb-1">
                {t(category.title, language)}
              </span>
            </motion.h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.services.map((service, index) => {
                const Icon = iconMap[service.icon] || Briefcase;
                const isFeatured = "featured" in service && service.featured;

                return (
                  <motion.article
                    key={service.title.en}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (catIndex + index) * 0.05 }}
                    className={`flex flex-col rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg ${
                      isFeatured ? "ring-2 ring-imus-green" : ""
                    }`}
                  >
                    {isFeatured && (
                      <span className="mb-3 inline-block w-fit rounded-full bg-imus-green px-3 py-1 text-xs font-semibold text-imus-navy">
                        Featured
                      </span>
                    )}
                    <Icon className="mb-4 h-10 w-10 text-imus-red" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-imus-navy">
                      {t(service.title, language)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-gray-600">
                      {t(service.description, language)}
                    </p>
                    <div className="mt-4">
                      <Button
                        href={service.href}
                        variant="primary"
                        external={"external" in service ? service.external : service.href.startsWith("http")}
                        className="!px-6 !py-2 text-sm"
                      >
                        {language === "fil" ? "Alamin Pa" : "Learn More"}
                      </Button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      </div>
    </>
  );
}
