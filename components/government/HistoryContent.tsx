"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { HISTORY_CLOSING, HISTORY_IMAGES, HISTORY_PARAGRAPHS } from "@/lib/history";
import { t } from "@/lib/i18n";

export default function HistoryContent() {
  const { language } = useLanguage();
  const closingParagraphs = (language === "fil" ? HISTORY_CLOSING.fil : HISTORY_CLOSING.en).split(
    "\n\n"
  );

  return (
    <article className="overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-card md:p-8">
      <h2 className="font-heading text-xl font-bold text-imus-green md:text-2xl">
        {language === "fil" ? "KASAYSAYAN" : "HISTORY"}
      </h2>

      <div className="mt-6 space-y-4 text-justify leading-relaxed text-gray-700">
        {HISTORY_PARAGRAPHS.map((para) => (
          <p key={para.en}>{t(para, language)}</p>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {HISTORY_IMAGES.map((image) => (
          <figure key={image.src} className="overflow-hidden rounded-lg border border-gray-100">
            <div className="relative aspect-[4/3] bg-imus-gray">
              <Image
                src={image.src}
                alt={t(image.alt, language)}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 100vw, 320px"
              />
            </div>
            <figcaption className="border-t border-gray-100 px-4 py-3 text-center text-xs text-gray-600 md:text-sm">
              {t(image.alt, language)}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-8 space-y-4 text-justify leading-relaxed text-gray-700">
        {closingParagraphs.map((para) => (
          <p key={para.slice(0, 40)}>{para}</p>
        ))}
      </div>
    </article>
  );
}
