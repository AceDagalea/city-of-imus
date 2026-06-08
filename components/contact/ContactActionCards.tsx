"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  MessageSquare,
  PhoneCall,
  Users,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_ACTIONS } from "@/lib/contact";
import { t } from "@/lib/i18n";

const ACCENT_STYLES = {
  green: "bg-imus-green/15 text-imus-greenDark",
  blue: "bg-blue-100 text-blue-700",
  teal: "bg-teal-100 text-teal-700",
  violet: "bg-violet-100 text-violet-700",
};

const ICON_MAP = {
  feedback: MessageSquare,
  report: PhoneCall,
  info: BookOpen,
  directory: Users,
};

export default function ContactActionCards() {
  const { language } = useLanguage();
  const lang = language === "fil" ? "fil" : "en";

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {CONTACT_ACTIONS.map((action) => {
        const Icon = ICON_MAP[action.icon];
        const isExternal = action.href.startsWith("mailto:");

        return (
          <article
            key={action.id}
            className="flex flex-col rounded-xl bg-white p-5 shadow-card ring-1 ring-gray-100 transition-shadow hover:shadow-float"
          >
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${ACCENT_STYLES[action.accent]}`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="font-heading text-base font-bold text-imus-navy">
              {t(action.title, lang)}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
              {t(action.description, lang)}
            </p>
            {isExternal ? (
              <a
                href={action.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-imus-navy transition-colors hover:text-imus-red focus-ring rounded-sm"
              >
                {t(action.cta, lang)}
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                href={action.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-imus-navy transition-colors hover:text-imus-red focus-ring rounded-sm"
              >
                {t(action.cta, lang)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
}
