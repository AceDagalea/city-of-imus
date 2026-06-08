"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import { useLanguage } from "@/context/LanguageContext";
import { MAYOR_PHOTO_URL, SITE_URL } from "@/lib/constants";
import { STRINGS } from "@/lib/i18n";

export default function MayorMessage() {
  const { language } = useLanguage();

  return (
    <section className="bg-white py-16" aria-labelledby="mayor-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.h2
          id="mayor-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center font-heading text-3xl font-bold text-imus-navy"
        >
          {STRINGS.mayorMessage[language]}
        </motion.h2>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative mx-auto h-[400px] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={MAYOR_PHOTO_URL}
                alt={`${STRINGS.mayorName[language]}, ${STRINGS.mayorTitle[language]} of Imus`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 400px"
                loading="lazy"
              />
            </div>
            <h3 className="mt-4 font-heading text-xl font-bold text-imus-navy">
              {STRINGS.mayorName[language]}
            </h3>
            <p className="text-sm text-imus-red">{STRINGS.mayorTitle[language]}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <blockquote className="relative border-l-4 border-imus-green pl-6">
              <p className="font-heading text-lg italic leading-relaxed text-imus-navy/90 md:text-xl">
                &ldquo;{STRINGS.mayorQuote[language]}&rdquo;
              </p>
            </blockquote>
            <div className="mt-8">
              <Button href="/about/mayor" variant="primary">
                {STRINGS.learnMore[language]}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
