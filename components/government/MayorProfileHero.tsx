"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  MAYOR_DISPLAY_NAME,
  MAYOR_PROFILE_PHOTO,
  MAYOR_TAGLINE,
} from "@/lib/mayor";
import { t } from "@/lib/i18n";

export default function MayorProfileHero() {
  const { language } = useLanguage();

  return (
    <section
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card"
      aria-labelledby="mayor-profile-heading"
    >
      <div className="grid md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <div className="relative min-h-[320px] bg-imus-gray md:min-h-[380px]">
          <Image
            src={MAYOR_PROFILE_PHOTO}
            alt={`${MAYOR_DISPLAY_NAME}, City Mayor of Imus`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 340px"
            priority
          />
        </div>

        <div className="flex flex-col justify-center bg-[linear-gradient(135deg,#f8fafc_0%,#eef4fb_100%)] p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-imus-green">
            {language === "fil" ? "Punong Lungsod" : "City Mayor"}
          </p>
          <h1
            id="mayor-profile-heading"
            className="mt-3 font-heading text-2xl font-extrabold uppercase leading-tight text-imus-navy md:text-3xl lg:text-4xl"
          >
            {MAYOR_DISPLAY_NAME}
          </h1>
          <p className="mt-4 max-w-xl text-base italic leading-relaxed text-gray-600 md:text-lg">
            {t(MAYOR_TAGLINE, language)}
          </p>
        </div>
      </div>
    </section>
  );
}
