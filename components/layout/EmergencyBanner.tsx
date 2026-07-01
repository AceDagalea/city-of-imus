"use client";

import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS } from "@/lib/i18n";

const STORAGE_KEY = "imus-emergency-banner-dismissed";

export default function EmergencyBanner() {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="sticky top-0 z-[60] flex items-center justify-center gap-3 bg-tenant-red px-4 py-2 text-white"
      role="alert"
    >
      <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
      <a
        href="tel:911"
        className="font-bold hover:underline focus-ring"
      >
        {STRINGS.emergency911[language]}
      </a>
      <button
        onClick={dismiss}
        className="absolute right-4 rounded p-1 hover:bg-white/20 focus-ring"
        aria-label="Dismiss emergency banner"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
