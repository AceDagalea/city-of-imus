"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MAYOR_PHOTO_URL, SITE_URL } from "@/lib/constants";
import { STRINGS } from "@/lib/i18n";

export default function MayorMessageSection() {
  const { language } = useLanguage();

  return (
    <section className="border-b border-gray-100 bg-white py-10 md:py-14" aria-labelledby="mayor-message-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2
          id="mayor-message-heading"
          className="mb-8 text-center text-sm font-bold uppercase tracking-[0.2em] text-imus-navy md:text-left"
        >
          {STRINGS.mayorMessage[language]}
        </h2>

        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl shadow-card md:mx-0 md:max-w-none">
              <Image
                src={MAYOR_PHOTO_URL}
                alt={`${STRINGS.mayorName[language]}, ${STRINGS.mayorTitle[language]}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 300px, 280px"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            <h3 className="font-heading text-xl font-bold text-imus-navy md:text-2xl">
              {STRINGS.mayorName[language]}
            </h3>
            <p className="mt-1 text-sm font-semibold text-imus-red">{STRINGS.mayorTitle[language]}</p>
            <blockquote className="mt-6 border-l-4 border-imus-green pl-5">
              <p className="text-base italic leading-relaxed text-imus-navy/85 md:text-lg">
                &ldquo;{STRINGS.mayorQuote[language]}&rdquo;
              </p>
            </blockquote>
            <Link
              href="/about/mayor"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-imus-navy px-5 py-2.5 text-sm font-semibold text-imus-navy transition-colors hover:bg-imus-navy hover:text-white focus-ring"
            >
              {language === "fil" ? "Basahin ang Buong Mensahe" : "Read Full Message"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
