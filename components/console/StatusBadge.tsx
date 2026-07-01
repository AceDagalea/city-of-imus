"use client";

import { useLanguage } from "@/context/LanguageContext";
import { STATUS_META, isSubmissionStatus } from "@/lib/workflow";
import { t } from "@/lib/i18n";

export default function StatusBadge({ status }: { status: string }) {
  const { language } = useLanguage();
  if (!isSubmissionStatus(status)) {
    return (
      <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
        {status}
      </span>
    );
  }
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.badgeClass}`}
    >
      {t(meta.label, language)}
    </span>
  );
}
