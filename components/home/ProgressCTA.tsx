"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_URL } from "@/lib/constants";

export default function ProgressCTA() {
  const { language } = useLanguage();

  return (
    <section className="py-8 md:py-10" aria-label="Discover Imus">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={`${SITE_URL}/Media/Carousel_BattleOfImus.jpg`}
            alt="Battle of Imus Monument"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-tenant-navy/70" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-center px-8 py-14 md:px-14 md:py-20">
            <p className="text-xs font-bold uppercase tracking-widest text-tenant-green">
              {language === "fil" ? "Maging Bahagi ng Pag-unlad" : "Be Part of the Progress"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {language === "fil" ? "Maging Imuseño." : "Be Imuseño."}
            </h2>
            <p className="mt-3 max-w-lg text-sm text-white/80 md:text-base">
              {language === "fil"
                ? "Tuklasin ang kasaysayan, kultura, at mga oportunidad sa Flag Capital of the Philippines."
                : "Discover the history, culture, and opportunities in the Flag Capital of the Philippines."}
            </p>
            <Link
              href="/tourism"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-tenant-green px-6 py-3 text-sm font-bold text-tenant-navy transition-colors hover:bg-white focus-ring"
            >
              {language === "fil" ? "Tuklasin ang Imus" : "Discover Imus"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
