"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Youtube, Phone, Mail, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ImusWordmark } from "@/components/shared/ImusLogo";
import { CONTACT, FOOTER_COLUMNS } from "@/lib/constants";
import { STRINGS, t } from "@/lib/i18n";

export default function Footer() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-imus-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <ImusWordmark size="lg" onDark />
            <p className="mt-3 text-xs text-imus-green">{STRINGS.tagline[language]}</p>
            <address className="mt-5 space-y-2.5 text-sm not-italic text-white/70">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-imus-green" aria-hidden="true" />
                {CONTACT.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-imus-green" aria-hidden="true" />
                <a
                  href={`tel:${CONTACT.mainLines[0].replace(/[^0-9]/g, "")}`}
                  className="hover:text-imus-green"
                >
                  {CONTACT.mainLines[0]}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-imus-green" aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-imus-green">
                  {CONTACT.email}
                </a>
              </p>
            </address>
            <div className="mt-5 flex gap-3">
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2.5 transition-colors hover:bg-imus-green hover:text-imus-navy focus-ring"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://www.youtube.com/watch?v=${CONTACT.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2.5 transition-colors hover:bg-imus-green hover:text-imus-navy focus-ring"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.values(FOOTER_COLUMNS).map((column) => (
            <div key={column.title.en}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-imus-green">
                {t(column.title, language)}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 transition-colors hover:text-white focus-ring rounded-sm"
                      >
                        {t(link.label, language)}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-white/70 transition-colors hover:text-white focus-ring rounded-sm"
                      >
                        {t(link.label, language)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-imus-green">
              {language === "fil" ? "Mag-subscribe sa Updates" : "Subscribe to Updates"}
            </h3>
            <p className="mb-4 text-sm text-white/60">
              {language === "fil"
                ? "Makatanggap ng mga balita at anunsyo mula sa Lungsod ng Imus."
                : "Get the latest news and announcements from the City of Imus."}
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === "fil" ? "Email address" : "Email address"}
                required
                className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-imus-green"
              />
              <button
                type="submit"
                className="flex shrink-0 items-center justify-center rounded-lg bg-imus-green px-3 py-2.5 text-imus-navy transition-colors hover:bg-white focus-ring"
                aria-label={language === "fil" ? "Mag-subscribe" : "Subscribe"}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-white/50 sm:flex-row md:px-6">
          <p>
            © {currentYear} {STRINGS.copyright[language]}
          </p>
          <p>
            {language === "fil"
              ? "Proudly powered by Imus. Built for Imuseños."
              : "Proudly powered by Imus. Built for Imuseños."}
          </p>
        </div>
      </div>
    </footer>
  );
}
