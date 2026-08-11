"use client";

import { useLanguage } from "@/context/LanguageContext";
import { STATUS_META, isSubmissionStatus } from "@/lib/workflow";
import { t } from "@/lib/i18n";

/** Soft pill tones matching the admin mock. */
const TONE: Record<string, string> = {
  DRAFT: "bg-[#f1f3f8] text-[#7a8398]",
  SUBMITTED: "bg-[#fdf4e3] text-[#b7791f]",
  UNDER_REVIEW: "bg-[#eef2fb] text-[#2b57c4]",
  NEEDS_INFO: "bg-[#fdf4e3] text-[#b7791f]",
  APPROVED: "bg-[#e7f6ee] text-[#1f9d55]",
  REJECTED: "bg-[#fdecea] text-[#c0392b]",
  READY_FOR_RELEASE: "bg-[#e7f6ee] text-[#1f9d55]",
  RELEASED: "bg-[#eef2fb] text-[#2b57c4]",
};

export default function StatusBadge({ status }: { status: string }) {
  const { language } = useLanguage();
  if (!isSubmissionStatus(status)) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
        {status}
      </span>
    );
  }
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${TONE[status] ?? meta.badgeClass}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {t(meta.label, language)}
    </span>
  );
}
