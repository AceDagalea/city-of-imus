"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, MessageCircle, Phone, HelpCircle } from "lucide-react";
import { ANNOUNCEMENTS, CONTACT } from "@/lib/constants";
import { t } from "@/lib/i18n";

export default function FormsSidebar() {
  const [referenceNo, setReferenceNo] = useState("");
  const [trackMessage, setTrackMessage] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceNo.trim()) return;
    setTrackMessage(
      referenceNo.startsWith("IMUS-")
        ? "Your application is being processed. For updates, contact the issuing office or call the City Hall hotline."
        : "Reference number not found. Please check the format (e.g. IMUS-20260508-ABC123) from your confirmation email."
    );
  };

  const announcements = ANNOUNCEMENTS.slice(0, 2);

  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      <div id="track" className="rounded-xl border border-gray-100 bg-white p-5 shadow-card">
        <h2 className="font-heading text-lg font-bold text-tenant-navy">Track Application</h2>
        <p className="mt-1 text-sm text-gray-500">Enter your reference number from the confirmation email.</p>
        <form onSubmit={handleTrack} className="mt-4 space-y-3">
          <label htmlFor="reference-no" className="sr-only">
            Reference number
          </label>
          <input
            id="reference-no"
            type="text"
            value={referenceNo}
            onChange={(e) => {
              setReferenceNo(e.target.value);
              setTrackMessage(null);
            }}
            placeholder="e.g. IMUS-20260508-XXXXXX"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-tenant-navy focus:ring-2 focus:ring-tenant-navy/15"
          />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-tenant-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tenant-navyDark focus-ring"
          >
            <Search className="h-4 w-4" />
            Track Now
          </button>
        </form>
        {trackMessage && (
          <p className="mt-3 rounded-lg bg-tenant-sky px-3 py-2 text-xs text-tenant-navy">{trackMessage}</p>
        )}
      </div>

      <div className="rounded-xl border border-gray-100 bg-tenant-sky/50 p-5">
        <h2 className="font-semibold text-tenant-navy">Registered Already?</h2>
        <p className="mt-1 text-sm text-gray-600">Sign in to view your applications and saved drafts.</p>
        <Link
          href="/login"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-tenant-navy bg-white px-4 py-2.5 text-sm font-semibold text-tenant-navy transition-colors hover:bg-tenant-navy hover:text-white focus-ring"
        >
          <User className="h-4 w-4" />
          Login / Register
        </Link>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-tenant-navy">Announcements</h2>
          <Link href="/news" className="text-xs font-semibold text-tenant-red hover:underline focus-ring rounded-sm">
            View all
          </Link>
        </div>
        <ul className="space-y-4">
          {announcements.map((item) => (
            <li key={item.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
              <h3 className="text-sm font-semibold text-tenant-navy line-clamp-2">{t(item.title)}</h3>
              <p className="mt-1 text-xs text-gray-500 line-clamp-2">{t(item.excerpt)}</p>
              <time className="mt-1 block text-[10px] text-gray-400">{item.date}</time>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-card">
        <h2 className="mb-4 font-heading text-lg font-bold text-tenant-navy">Need Help?</h2>
        <ul className="space-y-3">
          <li>
            <Link
              href="/contact"
              className="flex items-center gap-3 rounded-lg p-2 text-sm text-tenant-navy transition-colors hover:bg-tenant-gray focus-ring"
            >
              <HelpCircle className="h-5 w-5 shrink-0 text-tenant-red" />
              Help Center
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="flex items-center gap-3 rounded-lg p-2 text-sm text-tenant-navy transition-colors hover:bg-tenant-gray focus-ring"
            >
              <MessageCircle className="h-5 w-5 shrink-0 text-tenant-red" />
              Send us a Message
            </Link>
          </li>
          <li>
            <a
              href={`tel:${CONTACT.mainLines[0].replace(/\D/g, "")}`}
              className="flex items-start gap-3 rounded-lg p-2 text-sm text-tenant-navy transition-colors hover:bg-tenant-gray focus-ring"
            >
              <Phone className="h-5 w-5 shrink-0 text-tenant-red" />
              <span>
                <span className="block font-semibold">Call Us</span>
                <span className="text-gray-500">{CONTACT.mainLines[0]}</span>
                <span className="block text-xs text-gray-400">{CONTACT.hours}</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
