"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MessageCircle, Phone, HelpCircle, ArrowRight } from "lucide-react";
import { ANNOUNCEMENTS, CONTACT } from "@/lib/constants";
import { STRINGS, t } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageContext";
import PortalAuthButton from "@/components/forms/digital/PortalAuthButton";

function formatAnnDate(iso: string, language: string) {
  const d = new Date(iso);
  return {
    day: String(d.getDate()),
    month: d.toLocaleDateString(language === "fil" ? "fil-PH" : "en-PH", { month: "short" }),
  };
}

export default function FormsSidebar() {
  const { language } = useLanguage();
  const [referenceNo, setReferenceNo] = useState("");
  const [trackMessage, setTrackMessage] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = referenceNo.trim().toUpperCase();
    if (!ref) return;

    if (ref.startsWith("IMUS-")) {
      window.location.assign(`/citizen/applications/${encodeURIComponent(ref)}`);
      return;
    }

    setTrackMessage(
      language === "fil"
        ? "Hindi mahanap ang reference number. Suriin ang format (hal. IMUS-20260508-ABC123) mula sa confirmation email."
        : "Reference number not found. Please check the format (e.g. IMUS-20260508-ABC123) from your confirmation email."
    );
  };

  const announcements = ANNOUNCEMENTS.slice(0, 2);

  return (
    <aside className="flex flex-col gap-[18px] lg:sticky lg:top-[90px]">
      <div id="track" className="rounded-[14px] bg-gradient-to-br from-[#12275c] to-[#1b3a86] p-5 text-white shadow-[0_1px_2px_rgba(16,24,64,.04),0_8px_24px_rgba(16,24,64,.06)]">
        <h2 className="text-[15px] font-bold">{t(STRINGS.trackApplication, language)}</h2>
        <p className="mt-1 mb-3.5 text-[12.5px] text-[#b9c4e6]">
          {t(STRINGS.trackApplicationHelp, language)}
        </p>
        <form onSubmit={handleTrack}>
          <label htmlFor="reference-no" className="sr-only">
            {t(STRINGS.trackApplication, language)}
          </label>
          <div className="mb-3 flex items-center gap-2 rounded-[10px] border border-white/18 bg-white/10 px-3.5 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-[#93a2cd]" aria-hidden="true" />
            <input
              id="reference-no"
              type="text"
              value={referenceNo}
              onChange={(e) => {
                setReferenceNo(e.target.value);
                setTrackMessage(null);
              }}
              placeholder={t(STRINGS.trackPlaceholder, language)}
              className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-[#93a2cd]"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#1f9d55] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(31,157,85,.3)] transition-colors hover:bg-[#1a8748] focus-ring"
          >
            {t(STRINGS.trackNow, language)}
          </button>
        </form>
        {trackMessage && (
          <p className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-xs text-[#dfe6f7]">{trackMessage}</p>
        )}
      </div>

      <div className="rounded-[14px] border border-[#e7eaf0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,64,.04),0_8px_24px_rgba(16,24,64,.06)]">
        <h2 className="text-[15px] font-bold text-[#1c2333]">{t(STRINGS.registeredAlready, language)}</h2>
        <p className="mt-1 mb-3.5 text-[12.5px] text-[#6b7280]">
          {t(STRINGS.registeredAlreadyHelp, language)}
        </p>
        <PortalAuthButton
          variant="sidebar"
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#e7eaf0] bg-white px-4 py-2.5 text-sm font-semibold text-[#12275c] transition-colors hover:border-[#2b57c4] hover:text-[#2b57c4] focus-ring"
        />
      </div>

      <div className="rounded-[14px] border border-[#e7eaf0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,64,.04),0_8px_24px_rgba(16,24,64,.06)]">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-[#1c2333]">{t(STRINGS.announcementsTitle, language)}</h2>
          <Link
            href="/news"
            className="inline-flex items-center gap-0.5 text-[12.5px] font-semibold text-[#2b57c4] hover:underline focus-ring rounded-sm"
          >
            {t(STRINGS.viewAll, language)}
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
        <ul>
          {announcements.map((item, idx) => {
            const { day, month } = formatAnnDate(item.date, language);
            return (
              <li
                key={item.id}
                className={`flex gap-3 ${idx === 0 ? "pt-2" : "border-t border-[#e7eaf0] py-3.5"} ${
                  idx === announcements.length - 1 ? "pb-0" : ""
                }`}
              >
                <div className="w-11 shrink-0 rounded-[9px] bg-[#eef2fb] py-1.5 text-center">
                  <span className="block text-base font-bold leading-none text-[#12275c]">{day}</span>
                  <span className="text-[10px] uppercase text-[#2b57c4]">{month}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-bold leading-snug text-[#1c2333] line-clamp-2">
                    {t(item.title, language)}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-[#6b7280] line-clamp-2">
                    {t(item.excerpt, language)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-[14px] border border-[#e7eaf0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,64,.04),0_8px_24px_rgba(16,24,64,.06)]">
        <h2 className="mb-3 text-[15px] font-bold text-[#1c2333]">{t(STRINGS.needHelp, language)}</h2>
        <ul>
          <li>
            <Link
              href="/contact"
              className="flex items-center gap-2.5 border-b border-[#e7eaf0] py-2.5 focus-ring rounded-sm"
            >
              <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#e7f6ee] text-[#1f9d55]">
                <HelpCircle className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13.5px] font-bold text-[#1c2333]">
                  {t(STRINGS.helpCenter, language)}
                </span>
                <span className="text-[11.5px] text-[#6b7280]">{t(STRINGS.helpCenterSub, language)}</span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="flex items-center gap-2.5 border-b border-[#e7eaf0] py-2.5 focus-ring rounded-sm"
            >
              <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#e7f6ee] text-[#1f9d55]">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13.5px] font-bold text-[#1c2333]">
                  {t(STRINGS.sendMessage, language)}
                </span>
                <span className="text-[11.5px] text-[#6b7280]">{t(STRINGS.sendMessageSub, language)}</span>
              </span>
            </Link>
          </li>
          <li>
            <a
              href={`tel:${CONTACT.mainLines[0].replace(/\D/g, "")}`}
              className="flex items-center gap-2.5 py-2.5 focus-ring rounded-sm"
            >
              <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#e7f6ee] text-[#1f9d55]">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13.5px] font-bold text-[#1c2333]">{CONTACT.mainLines[0]}</span>
                <span className="text-[11.5px] text-[#6b7280]">Mon–Thu, 7:00 AM – 6:00 PM</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
