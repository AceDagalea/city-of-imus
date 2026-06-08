"use client";

import { Clock, MapPin, Phone, Siren } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_OFFICE_HOURS } from "@/lib/contact";
import { CONTACT } from "@/lib/constants";
import { t } from "@/lib/i18n";

function formatTel(number: string) {
  const digits = number.replace(/[^0-9]/g, "");
  return digits ? `tel:${digits}` : "#";
}

export default function GetInTouchPanel() {
  const { language } = useLanguage();
  const lang = language === "fil" ? "fil" : "en";

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-white p-6 shadow-card ring-1 ring-gray-100">
        <h2 className="font-heading text-xl font-bold text-imus-navy">
          {language === "fil" ? "Makipag-ugnayan" : "Get in Touch"}
        </h2>

        <div className="mt-6 space-y-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-imus-navy text-white">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-imus-navy">City Government Center</p>
              <address className="mt-1 not-italic text-sm leading-relaxed text-gray-600">
                {CONTACT.address}
              </address>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-imus-navy text-white">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-imus-navy">
                {language === "fil" ? "Oras ng Opisina" : "Office Hours"}
              </p>
              <ul className="mt-1 space-y-0.5 text-sm text-gray-600">
                {CONTACT_OFFICE_HOURS.map((line) => (
                  <li key={line.en}>{t(line, lang)}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-imus-navy text-white">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-imus-navy">
                {language === "fil" ? "Main Lines" : "Main Lines"}
              </p>
              <div className="mt-1 space-y-0.5">
                {CONTACT.mainLines.map((line) => (
                  <a
                    key={line}
                    href={formatTel(line)}
                    className="block text-sm font-medium text-gray-700 transition-colors hover:text-imus-red focus-ring rounded-sm"
                  >
                    {line}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-imus-red p-6 text-white shadow-card">
        <div className="relative z-10">
          <p className="text-sm font-medium text-white/90">
            {language === "fil" ? "Emergency Hotline" : "Emergency Hotline"}
          </p>
          <a
            href={formatTel(CONTACT.emergency)}
            className="mt-1 block font-heading text-3xl font-bold tracking-tight hover:underline focus-ring rounded-sm"
          >
            {CONTACT.emergency}
          </a>
          <a href="tel:911" className="mt-1 block text-sm text-white/90 hover:underline focus-ring rounded-sm">
            Emergency 911
          </a>
        </div>
        <Siren
          className="absolute bottom-4 right-4 h-14 w-14 text-white/25"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
