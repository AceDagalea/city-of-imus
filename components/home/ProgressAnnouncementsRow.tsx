"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_URL } from "@/lib/constants";

export default function ProgressAnnouncementsRow() {
  const { language } = useLanguage();

  return (
    <section className="bg-white py-10 md:py-14" aria-label="Discover Imus">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl lg:min-h-[280px]">
          <Image
            src={`${SITE_URL}/Media/Carousel_BattleOfImus.jpg`}
            alt="Battle of Imus Monument"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-imus-navy/75" aria-hidden="true" />
          <div className="relative flex h-full flex-col justify-center px-8 py-12 md:px-12">
            <p className="text-xs font-bold uppercase tracking-widest text-imus-green">
              {language === "fil" ? "Maging Bahagi ng Pag-unlad" : "Be Part of the Progress"}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl">
              {language === "fil" ? "Maging Imuseño." : "Be Imuseño."}
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/80">
              {language === "fil"
                ? "Tuklasin ang kasaysayan, kultura, at mga oportunidad sa Flag Capital of the Philippines."
                : "Discover the history, culture, and opportunities in the Flag Capital of the Philippines."}
            </p>
            <Link
              href="/tourism"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-imus-green px-6 py-3 text-sm font-bold text-imus-navy transition-colors hover:bg-white focus-ring"
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
