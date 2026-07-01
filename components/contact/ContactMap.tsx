"use client";

import { MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MAP_EMBED_URL } from "@/lib/contact";
import { CONTACT } from "@/lib/constants";

const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("New Imus City Hall, Imus Boulevard, Cavite")}`;

export default function ContactMap() {
  const { language } = useLanguage();

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-xl shadow-card ring-1 ring-gray-100 lg:min-h-[480px]">
      <iframe
        src={MAP_EMBED_URL}
        width="100%"
        height="100%"
        className="absolute inset-0 h-full min-h-[420px] w-full border-0 lg:min-h-[480px]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="City of Imus City Hall on Google Maps"
      />

      <div className="absolute left-4 top-4 z-10 max-w-[220px] rounded-lg bg-white p-3 shadow-md ring-1 ring-gray-100">
        <p className="flex items-start gap-2 text-xs font-semibold text-tenant-navy">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tenant-red" aria-hidden="true" />
          <span>New Imus City Hall</span>
        </p>
        <p className="mt-1 pl-5 text-[11px] leading-snug text-gray-600">{CONTACT.address}</p>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block pl-5 text-xs font-semibold text-tenant-green transition-colors hover:text-tenant-greenDark focus-ring rounded-sm"
        >
          {language === "fil" ? "Direksyon →" : "Directions →"}
        </a>
      </div>
    </div>
  );
}
