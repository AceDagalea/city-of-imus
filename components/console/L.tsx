"use client";

import { useLanguage } from "@/context/LanguageContext";
import { t, type LocalizedString } from "@/lib/i18n";

/** Renders a LocalizedString in the active language (usable from server components). */
export default function L({ s }: { s: LocalizedString }) {
  const { language } = useLanguage();
  return <>{t(s, language)}</>;
}
