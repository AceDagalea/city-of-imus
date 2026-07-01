"use client";

import { Contrast } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { STRINGS, t } from "@/lib/i18n";

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const options: { code: "en" | "fil"; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "fil", label: "FIL" },
  ];
  return (
    <div
      className="flex items-center overflow-hidden rounded-full border border-white/30"
      role="group"
      aria-label={t(STRINGS.language, language)}
    >
      {options.map((opt) => {
        const active = language === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLanguage(opt.code)}
            aria-pressed={active}
            className={`px-2 py-0.5 text-[0.7rem] font-semibold transition-colors focus-ring ${
              active ? "bg-white text-gov-blue" : "text-white/85 hover:bg-white/10"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function AccessibilityControls() {
  const { language } = useLanguage();
  const {
    canDecrease,
    canIncrease,
    decreaseFont,
    increaseFont,
    resetFont,
    highContrast,
    toggleHighContrast,
  } = useAccessibility();

  const btn =
    "flex h-6 min-w-6 items-center justify-center rounded border border-white/30 px-1.5 font-semibold text-white/90 transition-colors hover:bg-white/10 focus-ring disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <div className="flex items-center gap-1.5" aria-label={t(STRINGS.accessibility, language)} role="group">
      <button
        type="button"
        onClick={decreaseFont}
        disabled={!canDecrease}
        aria-label={t(STRINGS.decreaseTextSize, language)}
        className={`${btn} text-[0.65rem]`}
      >
        A-
      </button>
      <button
        type="button"
        onClick={resetFont}
        aria-label={t(STRINGS.resetTextSize, language)}
        className={`${btn} text-[0.75rem]`}
      >
        A
      </button>
      <button
        type="button"
        onClick={increaseFont}
        disabled={!canIncrease}
        aria-label={t(STRINGS.increaseTextSize, language)}
        className={`${btn} text-[0.85rem]`}
      >
        A+
      </button>
      <button
        type="button"
        onClick={toggleHighContrast}
        aria-pressed={highContrast}
        aria-label={t(STRINGS.toggleHighContrast, language)}
        className={`${btn} ${highContrast ? "bg-white text-gov-blue hover:bg-white" : ""}`}
      >
        <Contrast className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

/**
 * National "Republic of the Philippines" strip — the top-most chrome element on
 * every page. Uses the `gov.*` palette so it stays consistent across every LGU
 * deployment, and carries the language toggle + accessibility controls.
 */
export default function NationalBar() {
  const { language } = useLanguage();

  return (
    <div className="bg-gov-blue text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs md:px-6">
        <span className="inline-flex items-center gap-2 font-medium tracking-wide">
          <span aria-hidden="true" className="inline-block h-3 w-4 rounded-[1px] bg-gov-gold" />
          {t(STRINGS.republicOfPhilippines, language)}
        </span>
        <div className="flex items-center gap-3">
          <AccessibilityControls />
          <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden="true" />
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
}
