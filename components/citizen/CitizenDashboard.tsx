"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FilePlus2,
  FileText,
  HelpCircle,
  LogOut,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SignOutButton from "@/components/auth/SignOutButton";
import { CONTACT } from "@/lib/constants";
import { STRINGS, t, type LocalizedString } from "@/lib/i18n";
import {
  STATUS_META,
  citizenBadgeTone,
  citizenProgress,
  isSubmissionStatus,
} from "@/lib/workflow";

export type CitizenApplicationRow = {
  id: string;
  referenceNo: string;
  formSlug: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  serviceName: LocalizedString;
  serviceDetail: LocalizedString;
};

type FilterId = "all" | "review" | "ready" | "received";

const FILTERS: { id: FilterId; labelKey: keyof typeof STRINGS; match: (s: string) => boolean }[] = [
  { id: "all", labelKey: "filterAll", match: () => true },
  {
    id: "review",
    labelKey: "filterUnderReview",
    match: (s) => s === "UNDER_REVIEW" || s === "NEEDS_INFO",
  },
  {
    id: "ready",
    labelKey: "filterReady",
    match: (s) => s === "APPROVED" || s === "READY_FOR_RELEASE",
  },
  {
    id: "received",
    labelKey: "filterReceived",
    match: (s) => s === "SUBMITTED",
  },
];

const BADGE_TONE: Record<ReturnType<typeof citizenBadgeTone>, string> = {
  review: "bg-[#fdf4e3] text-[#b7791f]",
  ready: "bg-[#e7f6ee] text-[#1f9d55]",
  received: "bg-[#eef2fb] text-[#2b57c4]",
  done: "bg-tenant-navy/10 text-tenant-navy",
  reject: "bg-red-50 text-red-700",
};

function formatDate(iso: string, language: string) {
  return new Date(iso).toLocaleDateString(language === "fil" ? "fil-PH" : "en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ProgressTrack({ status }: { status: string }) {
  const { done, now } = citizenProgress(status);
  return (
    <div className="mt-2.5 flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => {
        const isDone = i < done;
        const isNow = i === now;
        return (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full ${
              isDone ? "bg-[#1f9d55]" : isNow ? "bg-[#b7791f]" : "bg-[#e7eaf0]"
            }`}
          />
        );
      })}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const { language } = useLanguage();
  const tone = citizenBadgeTone(status);
  const label = isSubmissionStatus(status)
    ? t(STATUS_META[status].label, language)
    : status;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${BADGE_TONE[tone]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}

export default function CitizenDashboard({
  applications,
  verified,
}: {
  applications: CitizenApplicationRow[];
  verified: boolean;
}) {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const [trackRef, setTrackRef] = useState("");
  const [trackMsg, setTrackMsg] = useState<string | null>(null);

  const stats = useMemo(() => {
    const total = applications.length;
    const underReview = applications.filter(
      (a) => a.status === "UNDER_REVIEW" || a.status === "NEEDS_INFO"
    ).length;
    const ready = applications.filter(
      (a) => a.status === "APPROVED" || a.status === "READY_FOR_RELEASE"
    ).length;
    const received = applications.filter((a) => a.status === "SUBMITTED").length;
    return { total, underReview, ready, received };
  }, [applications]);

  const filtered = useMemo(() => {
    const active = FILTERS.find((f) => f.id === filter) ?? FILTERS[0];
    const q = query.trim().toLowerCase();
    return applications.filter((a) => {
      if (!active.match(a.status)) return false;
      if (!q) return true;
      return (
        a.referenceNo.toLowerCase().includes(q) ||
        a.serviceName.en.toLowerCase().includes(q) ||
        a.serviceName.fil.toLowerCase().includes(q) ||
        a.formSlug.toLowerCase().includes(q)
      );
    });
  }, [applications, filter, query]);

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const ref = trackRef.trim().toUpperCase();
    if (!ref) return;
    if (ref.startsWith("IMUS-")) {
      window.location.assign(`/citizen/applications/${encodeURIComponent(ref)}`);
      return;
    }
    setTrackMsg(
      language === "fil"
        ? "Hindi mahanap ang reference number. Suriin ang format (hal. IMUS-20260508-ABC123)."
        : "Reference number not found. Please check the format (e.g. IMUS-20260508-ABC123)."
    );
  }

  return (
    <div className="bg-[#f4f6fa]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#12275c] to-[#1b3a86] text-white">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-end justify-between gap-5 px-6 py-8 md:py-9">
          <div>
            <nav className="mb-2.5 text-xs text-[#aebbe4]" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">
                {t(STRINGS.crumbsHome, language)}
              </Link>
              <span className="mx-1.5">›</span>
              <Link href="/forms" className="hover:text-white">
                {t(STRINGS.crumbsServices, language)}
              </Link>
              <span className="mx-1.5">›</span>
              <span className="text-white/90">{t(STRINGS.crumbsMyApplications, language)}</span>
            </nav>
            <h1 className="font-heading text-[1.75rem] font-bold tracking-tight md:text-[1.9rem]">
              {t(STRINGS.citizenDashboardTitle, language)}
            </h1>
            <p className="mt-1.5 max-w-xl text-sm text-[#b9c4e6]">
              {t(STRINGS.citizenDashboardSubtitle, language)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/forms"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#1f9d55] px-[18px] py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(31,157,85,.35)] transition-colors hover:bg-[#1a8748] focus-ring"
            >
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
              {t(STRINGS.newApplication, language)}
            </Link>
            <SignOutButton className="inline-flex items-center gap-2 rounded-[10px] border border-white/25 bg-white/10 px-[18px] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20 focus-ring disabled:opacity-60">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              {t(STRINGS.signOut, language)}
            </SignOutButton>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1220px] px-6 py-7 pb-16">
        {!verified && (
          <p className="mb-5 rounded-[14px] border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800">
            {t(STRINGS.verifyRequired, language)}
          </p>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_344px]">
          <div className="flex flex-col gap-[22px]">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
              {[
                {
                  n: stats.total,
                  label: t(STRINGS.totalApplications, language),
                  border: "border-l-[3px] border-l-[#2b57c4]",
                  color: "text-[#12275c]",
                },
                {
                  n: stats.underReview,
                  label: t(STRINGS.underReviewStat, language),
                  border: "border-l-[3px] border-l-[#b7791f]",
                  color: "text-[#b7791f]",
                },
                {
                  n: stats.ready,
                  label: t(STRINGS.readyForPickupStat, language),
                  border: "border-l-[3px] border-l-[#1f9d55]",
                  color: "text-[#1f9d55]",
                },
                {
                  n: stats.received,
                  label: t(STRINGS.receivedStat, language),
                  border: "border-l-[3px] border-l-[#0e7490]",
                  color: "text-[#12275c]",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl border border-[#e6e9f0] bg-white px-[18px] py-4 shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)] ${stat.border}`}
                >
                  <div className={`text-[1.6rem] font-extrabold leading-none ${stat.color}`}>
                    {stat.n}
                  </div>
                  <div className="mt-0.5 text-xs text-[#5f6a7d]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3.5">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Status filter">
                {FILTERS.map((f) => {
                  const on = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilter(f.id)}
                      className={`rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors focus-ring ${
                        on
                          ? "border-[#12275c] bg-[#12275c] text-white"
                          : "border-[#e6e9f0] bg-white text-[#5f6a7d] hover:border-[#2b57c4] hover:text-[#2b57c4]"
                      }`}
                    >
                      {t(STRINGS[f.labelKey] as LocalizedString, language)}
                    </button>
                  );
                })}
              </div>
              <label className="flex min-w-[250px] flex-1 items-center gap-2 rounded-[11px] border border-[#e6e9f0] bg-white px-3.5 py-2 sm:max-w-xs sm:flex-none">
                <Search className="h-4 w-4 shrink-0 text-[#8b95a7]" aria-hidden="true" />
                <span className="sr-only">{t(STRINGS.searchApplications, language)}</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t(STRINGS.searchApplications, language)}
                  className="w-full border-0 bg-transparent text-sm text-[#141a29] outline-none placeholder:text-[#8b95a7]"
                />
              </label>
            </div>

            {/* List */}
            {applications.length === 0 ? (
              <div className="rounded-2xl border border-[#e6e9f0] bg-white px-6 py-12 text-center shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
                <p className="text-sm text-[#5f6a7d]">{t(STRINGS.noApplications, language)}</p>
                <Link
                  href="/forms"
                  className="mt-4 inline-flex rounded-[10px] bg-[#12275c] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d1c45] focus-ring"
                >
                  {t(STRINGS.browseServices, language)}
                </Link>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#e6e9f0] bg-white shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
                {filtered.length === 0 ? (
                  <p className="px-6 py-11 text-center text-sm text-[#5f6a7d]">
                    {t(STRINGS.noApplications, language)}
                  </p>
                ) : (
                  filtered.map((app) => (
                    <div
                      key={app.id}
                      className="grid grid-cols-1 items-center gap-2.5 border-t border-[#e6e9f0] px-[22px] py-[18px] first:border-t-0 transition-colors hover:bg-[#eef1f6] md:grid-cols-[1.6fr_1.9fr_1.1fr_1fr_44px] md:gap-4"
                    >
                      <div>
                        <Link
                          href={`/citizen/applications/${app.referenceNo}`}
                          className="text-[14px] font-bold text-[#2b57c4] hover:underline focus-ring rounded-sm"
                        >
                          {app.referenceNo}
                        </Link>
                        <ProgressTrack status={app.status} />
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#eef2fb] text-[#2b57c4]">
                          <FileText className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <span className="block text-[13.5px] font-bold text-[#141a29]">
                            {t(app.serviceName, language)}
                          </span>
                          <span className="block text-xs text-[#5f6a7d]">
                            {t(app.serviceDetail, language)}
                          </span>
                        </div>
                      </div>

                      <div>
                        <StatusPill status={app.status} />
                      </div>

                      <div className="text-[13.5px] text-[#141a29]">
                        <span className="block text-[13.5px] font-bold">
                          {formatDate(app.createdAt, language)}
                        </span>
                        <span className="mt-0.5 block text-xs text-[#5f6a7d]">
                          {t(STRINGS.updatedPrefix, language)} {formatDate(app.updatedAt, language)}
                        </span>
                      </div>

                      <Link
                        href={`/citizen/applications/${app.referenceNo}`}
                        aria-label={t(STRINGS.viewApplication, language)}
                        className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-[#e6e9f0] bg-white text-[#8b95a7] transition-all hover:translate-x-0.5 hover:border-[#2b57c4] hover:text-[#2b57c4] focus-ring md:justify-self-end"
                      >
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-[22px] lg:sticky lg:top-24">
            <div className="rounded-2xl bg-gradient-to-br from-[#12275c] to-[#1b3a86] p-5 text-white shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
              <h2 className="text-[15.5px] font-extrabold">{t(STRINGS.trackAnApplication, language)}</h2>
              <p className="mb-3.5 mt-1 text-xs text-[#b9c4e6]">
                {t(STRINGS.trackApplicationHelp, language)}
              </p>
              <form onSubmit={handleTrack}>
                <div className="mb-3 flex items-center gap-2 rounded-[11px] border border-white/20 bg-white/10 px-3.5 py-2.5">
                  <Search className="h-4 w-4 shrink-0 text-[#93a2cd]" aria-hidden="true" />
                  <input
                    type="text"
                    value={trackRef}
                    onChange={(e) => {
                      setTrackRef(e.target.value);
                      setTrackMsg(null);
                    }}
                    placeholder={t(STRINGS.trackPlaceholder, language)}
                    className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-[#93a2cd]"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#1f9d55] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(31,157,85,.35)] transition hover:brightness-105 focus-ring"
                >
                  {t(STRINGS.trackNow, language)}
                </button>
              </form>
              {trackMsg && (
                <p className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-xs text-[#dfe6f7]">{trackMsg}</p>
              )}
            </div>

            <div className="rounded-2xl border border-[#e6e9f0] bg-white p-5 shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
              <h2 className="mb-3 text-[15.5px] font-extrabold text-[#12275c]">
                {t(STRINGS.needHelp, language)}
              </h2>
              <Link
                href="/contact"
                className="flex items-center gap-3 border-b border-[#e6e9f0] py-3 focus-ring rounded-sm"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#e7f6ee] text-[#1f9d55]">
                  <HelpCircle className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-bold text-[#141a29]">
                    {t(STRINGS.helpCenter, language)}
                  </span>
                  <span className="text-xs text-[#5f6a7d]">{t(STRINGS.helpCenterSub, language)}</span>
                </span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-3 border-b border-[#e6e9f0] py-3 focus-ring rounded-sm"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#e7f6ee] text-[#1f9d55]">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-bold text-[#141a29]">
                    {t(STRINGS.sendMessage, language)}
                  </span>
                  <span className="text-xs text-[#5f6a7d]">{t(STRINGS.sendMessageSub, language)}</span>
                </span>
              </Link>
              <a
                href={`tel:${CONTACT.mainLines[0].replace(/\D/g, "")}`}
                className="flex items-center gap-3 py-3 focus-ring rounded-sm"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#e7f6ee] text-[#1f9d55]">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-bold text-[#141a29]">{CONTACT.mainLines[0]}</span>
                  <span className="text-xs text-[#5f6a7d]">Mon–Thu, 7:00 AM – 6:00 PM</span>
                </span>
              </a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
