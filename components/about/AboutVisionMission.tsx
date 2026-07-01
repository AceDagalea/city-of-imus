"use client";

import { Binoculars, Flag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS } from "@/lib/i18n";

export default function AboutVisionMission() {
  const { language } = useLanguage();

  return (
    <section
      id="vision-mission"
      className="bg-white py-12 md:py-16"
      aria-labelledby="about-vm-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:gap-14 md:px-6">
        <div className="flex gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-tenant-green/30 bg-tenant-green/10 text-tenant-greenDark">
            <Binoculars className="h-7 w-7" aria-hidden="true" />
          </div>
          <div>
            <h2 id="about-vm-heading" className="font-heading text-xl font-bold text-tenant-navy md:text-2xl">
              {STRINGS.vision[language]}
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">{STRINGS.visionText[language]}</p>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-tenant-green/30 bg-tenant-green/10 text-tenant-greenDark">
            <Flag className="h-7 w-7" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-tenant-navy md:text-2xl">
              {STRINGS.mission[language]}
            </h3>
            <p className="mt-3 leading-relaxed text-gray-600">{STRINGS.missionText[language]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
