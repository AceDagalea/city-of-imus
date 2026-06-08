"use client";

import { type ReactNode } from "react";
import type { Language } from "@/lib/i18n";

const LANGUAGE: Language = "en";

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useLanguage() {
  return { language: LANGUAGE };
}
