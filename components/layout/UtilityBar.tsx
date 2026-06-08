"use client";

import Link from "next/link";
import { Facebook, Youtube } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT, SITE_URL } from "@/lib/constants";

export default function UtilityBar() {
  const { language } = useLanguage();

  return (
    <div className="bg-imus-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs md:px-6">
        <p className="text-white/80">
          {language === "fil" ? (
            <>
              Opisyal na Website ng{" "}
              <span className="font-semibold text-imus-green-light">Pamahalaang Lungsod ng Imus</span>, Cavite
            </>
          ) : (
            <>
              Official Website of the{" "}
              <span className="font-semibold text-imus-green-light">City Government of Imus</span>, Cavite
            </>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#main-content"
            className="text-white/70 transition-colors hover:text-imus-green focus-ring rounded-sm"
          >
            {language === "fil" ? "Accessibility" : "Accessibility"}
          </a>
          <Link
            href="/contact"
            className="text-white/70 transition-colors hover:text-imus-green focus-ring rounded-sm"
          >
            {language === "fil" ? "Makipag-ugnayan" : "Contact Us"}
          </Link>
          <a
            href={`${SITE_URL}/sitemap.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-imus-green focus-ring rounded-sm"
          >
            Sitemap
          </a>
          <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded p-1 text-white/70 transition-colors hover:text-imus-green focus-ring"
              aria-label="Facebook"
            >
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a
              href={`https://www.youtube.com/watch?v=${CONTACT.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded p-1 text-white/70 transition-colors hover:text-imus-green focus-ring"
              aria-label="YouTube"
            >
              <Youtube className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
