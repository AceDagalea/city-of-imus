"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, FileText, Briefcase, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { searchForms } from "@/lib/forms";
import { NAV_ITEMS, QUICK_SERVICES } from "@/lib/constants";
import { t } from "@/lib/i18n";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const QUICK_LINKS = [
  { icon: FileText, label: { en: "Services", fil: "Serbisyo" }, href: "/forms" },
  { icon: Briefcase, label: { en: "eBOSS Business Permits", fil: "eBOSS" }, href: "https://egovcityofimus.ph/ebpls/", external: true },
  { icon: Phone, label: { en: "Contact & Hotlines", fil: "Kontak at Hotlines" }, href: "/contact#hotlines" },
  { icon: MapPin, label: { en: "Full Disclosure", fil: "Full Disclosure" }, href: "/full-disclosure" },
];

export default function SearchModal({ open, onClose, initialQuery = "" }: SearchModalProps) {
  const { language } = useLanguage();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setQuery(initialQuery);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, initialQuery]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const formResults = useMemo(() => searchForms(query).slice(0, 5), [query]);
  const serviceResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return QUICK_SERVICES.filter((s) => t(s.label, language).toLowerCase().includes(q)).slice(0, 3);
  }, [query, language]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 pt-20 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl" role="dialog" aria-label="Search">
        <div className="flex items-center gap-3 border-b border-gray-100 p-4">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === "fil" ? "Maghanap ng serbisyo, form, o pahina..." : "Search services, forms, or pages..."}
            className="flex-1 text-base outline-none"
            aria-label="Search"
          />
          <button onClick={onClose} className="rounded-md p-1 hover:bg-gray-100 focus-ring" aria-label="Close search">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {!query.trim() ? (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                {language === "fil" ? "Mabilis na Link" : "Quick Links"}
              </p>
              <ul className="space-y-1">
                {QUICK_LINKS.map((link) => {
                  const Icon = link.icon;
                  const content = (
                    <span className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-imus-navy hover:bg-imus-gray">
                      <Icon className="h-4 w-4 text-imus-red" />
                      {t(link.label, language)}
                    </span>
                  );
                  return (
                    <li key={link.href}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                          {content}
                        </a>
                      ) : (
                        <Link href={link.href} onClick={onClose}>{content}</Link>
                      )}
                    </li>
                  );
                })}
                {NAV_ITEMS.filter((n) => n.label.en !== "Home").map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={onClose}>
                      <span className="block rounded-lg px-3 py-2.5 text-sm text-imus-navy hover:bg-imus-gray">
                        {t(item.label, language)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="space-y-4">
              {formResults.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Forms</p>
                  <ul className="space-y-1">
                    {formResults.map((form) => (
                      <li key={form.id}>
                        <Link
                          href={form.mode === "online" ? `/forms/${form.slug}` : "/forms"}
                          onClick={onClose}
                          className="block rounded-lg px-3 py-2 text-sm hover:bg-imus-gray"
                        >
                          <span className="font-medium text-imus-navy">{t(form.name, language)}</span>
                          <span className="ml-2 text-xs text-gray-400">{form.mode}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {serviceResults.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Services</p>
                  <ul className="space-y-1">
                    {serviceResults.map((s) => (
                      <li key={s.label.en}>
                        <Link href={s.href} onClick={onClose} className="block rounded-lg px-3 py-2 text-sm text-imus-navy hover:bg-imus-gray">
                          {t(s.label, language)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {formResults.length === 0 && serviceResults.length === 0 && (
                <p className="py-4 text-center text-sm text-gray-500">
                  {language === "fil" ? "Walang resulta." : "No results found."}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
