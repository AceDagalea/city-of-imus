"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import StatusBadge from "@/components/console/StatusBadge";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t, type LocalizedString } from "@/lib/i18n";

export type AdminSubmissionRow = {
  id: string;
  referenceNo: string;
  formSlug: string;
  serviceName: LocalizedString;
  officeId: string;
  officeShort: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  citizenFirst: string;
  citizenLast: string;
};

const AVATAR = [
  "bg-[#eef2fb] text-[#2b57c4]",
  "bg-[#e7f6ee] text-[#1f9d55]",
  "bg-[#fdf4e3] text-[#b7791f]",
  "bg-[#fdecea] text-[#c0392b]",
  "bg-[#f0ecfb] text-[#6b46c1]",
];

function initials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function relativeTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return mins <= 1 ? "Just now" : `${mins} minutes ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return formatDate(iso);
}

function chipClass(active: boolean, green = false) {
  if (active) {
    return green
      ? "border-[#1f9d55] bg-[#1f9d55] text-white"
      : "border-[#12275c] bg-[#12275c] text-white";
  }
  return "border-[#e6e9f0] bg-white text-[#5f6a7d] hover:border-[#2b57c4] hover:text-[#2b57c4]";
}

export default function AdminSubmissionsPanel({
  rows,
  offices,
  statusFilter,
  officeFilter,
  statusOptions,
}: {
  rows: AdminSubmissionRow[];
  offices: { id: string; shortName: string }[];
  statusFilter?: string;
  officeFilter?: string;
  statusOptions: string[];
}) {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const total = rows.length;
    const underReview = rows.filter((r) => r.status === "UNDER_REVIEW").length;
    const needsInfo = rows.filter((r) => r.status === "NEEDS_INFO").length;
    const approved = rows.filter((r) => r.status === "APPROVED").length;
    const released = rows.filter((r) => r.status === "RELEASED").length;
    return { total, underReview, needsInfo, approved, released };
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const hay = `${r.referenceNo} ${r.citizenFirst} ${r.citizenLast} ${r.serviceName.en} ${r.serviceName.fil} ${r.formSlug}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, query]);

  function href(next: { status?: string | null; office?: string | null }) {
    const params = new URLSearchParams();
    const status = "status" in next ? next.status : statusFilter;
    const office = "office" in next ? next.office : officeFilter;
    if (status) params.set("status", status);
    if (office) params.set("office", office);
    const qs = params.toString();
    return `/admin/submissions${qs ? `?${qs}` : ""}`;
  }

  const statCards = [
    { n: stats.total, label: STRINGS.totalSubmissionsStat, border: "border-l-[3px] border-l-[#2b57c4]", color: "text-[#12275c]" },
    { n: stats.underReview, label: STRINGS.underReviewStat, border: "border-l-[3px] border-l-[#b7791f]", color: "text-[#b7791f]" },
    { n: stats.needsInfo, label: STRINGS.needsInfoStat, border: "border-l-[3px] border-l-[#e6e9f0]", color: "text-[#12275c]" },
    { n: stats.approved, label: STRINGS.approvedStat, border: "border-l-[3px] border-l-[#1f9d55]", color: "text-[#1f9d55]" },
    { n: stats.released, label: STRINGS.releasedStat, border: "border-l-[3px] border-l-[#0e7490]", color: "text-[#12275c]" },
  ];

  return (
    <div>
      <div className="mb-[22px] grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
        {statCards.map((s) => (
          <div
            key={s.label.en}
            className={`rounded-2xl border border-[#e6e9f0] bg-white px-[18px] py-4 shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)] ${s.border}`}
          >
            <div className={`text-[1.6rem] font-extrabold leading-none ${s.color}`}>{s.n}</div>
            <div className="mt-0.5 text-xs text-[#5f6a7d]">{t(s.label, language)}</div>
          </div>
        ))}
      </div>

      <div className="mb-[18px] rounded-2xl border border-[#e6e9f0] bg-white px-5 py-4 shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 shrink-0 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
            Status
          </span>
          <Link
            href={href({ status: null })}
            className={`rounded-[22px] border px-[15px] py-2 text-[13px] font-semibold transition-colors focus-ring ${chipClass(!statusFilter)}`}
          >
            {t(STRINGS.allStatusesLabel, language)}
          </Link>
          {statusOptions.map((status) => (
            <Link
              key={status}
              href={href({ status })}
              className={`rounded-[22px] border px-[15px] py-2 text-[13px] font-semibold transition-colors focus-ring ${chipClass(statusFilter === status)}`}
            >
              {status.replace(/_/g, " ")}
            </Link>
          ))}
          <label className="ml-auto flex min-w-[210px] items-center gap-2 rounded-[11px] border border-[#e6e9f0] bg-white px-3.5 py-2">
            <Search className="h-4 w-4 shrink-0 text-[#8b95a7]" aria-hidden="true" />
            <span className="sr-only">{t(STRINGS.searchSubmissions, language)}</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(STRINGS.searchSubmissions, language)}
              className="w-full border-0 bg-transparent text-[13.5px] outline-none placeholder:text-[#8b95a7]"
            />
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="w-16 shrink-0 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
            Office
          </span>
          <Link
            href={href({ office: null })}
            className={`rounded-[22px] border px-[15px] py-2 text-[13px] font-semibold transition-colors focus-ring ${chipClass(!officeFilter, true)}`}
          >
            {t(STRINGS.allOffices, language)}
          </Link>
          {offices.map((office) => (
            <Link
              key={office.id}
              href={href({ office: office.id })}
              className={`rounded-[22px] border px-[15px] py-2 text-[13px] font-semibold transition-colors focus-ring ${chipClass(officeFilter === office.id, true)}`}
            >
              {office.shortName}
            </Link>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e6e9f0] bg-white shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
        <div className="flex items-center justify-between border-b border-[#e6e9f0] px-[22px] py-[17px]">
          <h2 className="text-base font-extrabold text-[#12275c]">
            {t(STRINGS.submissionsPanelTitle, language)}
          </h2>
          <span className="text-[12.5px] text-[#5f6a7d]">
            {t(STRINGS.showingSubmissions, language)
              .replace("{shown}", String(filtered.length))
              .replace("{total}", String(rows.length))}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-5 py-11 text-center text-[#5f6a7d]">
            <div className="mb-2 text-3xl" aria-hidden="true">
              🗂️
            </div>
            {t(STRINGS.noSubmissionsMatch, language)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="bg-[#fafbfe]">
                  <th className="px-[22px] py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
                    {t(STRINGS.referenceNo, language)}
                  </th>
                  <th className="px-[22px] py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
                    {t(STRINGS.serviceLabel, language)}
                  </th>
                  <th className="px-[22px] py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
                    {t(STRINGS.officeLabel, language)}
                  </th>
                  <th className="px-[22px] py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
                    {t(STRINGS.applicantLabel, language)}
                  </th>
                  <th className="px-[22px] py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
                    {t(STRINGS.statusLabel, language)}
                  </th>
                  <th className="px-[22px] py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
                    {t(STRINGS.updatedLabel, language)}
                  </th>
                  <th className="px-[22px] py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id} className="border-t border-[#e6e9f0] transition-colors hover:bg-[#eef1f6]">
                    <td className="px-[22px] py-[15px] align-middle text-[13.5px]">
                      <Link
                        href={`/staff/submissions/${s.id}`}
                        className="font-bold text-[#2b57c4] hover:underline focus-ring rounded-sm"
                      >
                        {s.referenceNo}
                      </Link>
                      <div className="mt-0.5 text-xs text-[#5f6a7d]">
                        Submitted {formatDate(s.createdAt)}
                      </div>
                    </td>
                    <td className="px-[22px] py-[15px] align-middle text-[13.5px] font-bold text-[#141a29]">
                      {t(s.serviceName, language)}
                    </td>
                    <td className="px-[22px] py-[15px] align-middle">
                      <span className="inline-block rounded-md bg-[#eaf0fc] px-2 py-0.5 text-[10.5px] font-extrabold text-[#2b57c4]">
                        {s.officeShort}
                      </span>
                    </td>
                    <td className="px-[22px] py-[15px] align-middle text-[13.5px]">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${AVATAR[i % AVATAR.length]}`}
                        >
                          {initials(s.citizenFirst, s.citizenLast)}
                        </span>
                        <span className="font-medium">
                          {s.citizenFirst} {s.citizenLast}
                        </span>
                      </div>
                    </td>
                    <td className="px-[22px] py-[15px] align-middle">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-[22px] py-[15px] align-middle text-[13.5px]">
                      <span className="block text-[13px] font-bold text-[#141a29]">
                        {formatDate(s.updatedAt)}
                      </span>
                      <span className="mt-0.5 block text-xs text-[#5f6a7d]">
                        {relativeTime(s.updatedAt)}
                      </span>
                    </td>
                    <td className="px-[22px] py-[15px] align-middle text-right">
                      <Link
                        href={`/staff/submissions/${s.id}`}
                        aria-label={t(STRINGS.viewApplication, language)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-[9px] border border-[#e6e9f0] bg-white text-[#8b95a7] transition-all hover:translate-x-0.5 hover:border-[#2b57c4] hover:text-[#2b57c4] focus-ring"
                      >
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
