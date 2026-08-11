"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_URL } from "@/lib/constants";

export default function UtilityBar() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#132a63] text-[#aebbe4]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-6 py-1.5 text-[12.5px]">
        <p>
          {language === "fil" ? (
            <>
              Opisyal na Website ng{" "}
              <span className="font-semibold text-white">Pamahalaang Lungsod ng Imus</span>, Cavite
            </>
          ) : (
            <>
              Official Website of the{" "}
              <span className="font-semibold text-white">City Government of Imus</span>, Cavite
            </>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-[18px]">
          <Link
            href="/contact"
            className="text-[#aebbe4] transition-colors hover:text-white focus-ring rounded-sm"
          >
            {language === "fil" ? "Makipag-ugnayan" : "Contact Us"}
          </Link>
          <a
            href={`${SITE_URL}/sitemap.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#aebbe4] transition-colors hover:text-white focus-ring rounded-sm"
          >
            Sitemap
          </a>
        </div>
      </div>
    </div>
  );
}
