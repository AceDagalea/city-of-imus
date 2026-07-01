"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, MessageCircleQuestion, PlayCircle, PackageCheck, PackageOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t } from "@/lib/i18n";

interface StaffActionsProps {
  submissionId: string;
  status: string;
  /** Actor may approve/reject (role/permission check done server-side too). */
  canDecide: boolean;
  /** Segregation of duties blocks this actor from deciding this submission. */
  sodBlocked: boolean;
}

export default function StaffActions({ submissionId, status, canDecide, sodBlocked }: StaffActionsProps) {
  const { language } = useLanguage();
  const router = useRouter();
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function act(action: string) {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/staff/submissions/${submissionId}/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, note: note.trim() || undefined }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Action failed");
      setBusy(false);
      return;
    }
    setNote("");
    setBusy(false);
    router.refresh();
  }

  const primaryBtn =
    "inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors focus-ring disabled:opacity-60";

  const showDecisions = status === "UNDER_REVIEW" && canDecide && !sodBlocked;

  return (
    <div className="space-y-4">
      {(status === "UNDER_REVIEW" || showDecisions) && (
        <div>
          <label htmlFor="action-note" className="mb-1.5 block text-sm font-medium text-tenant-navy">
            {t(STRINGS.noteLabel, language)}
          </label>
          <textarea
            id="action-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-tenant-navy outline-none transition-colors focus:border-tenant-navy focus:ring-2 focus:ring-tenant-navy/15"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {status === "SUBMITTED" && (
          <button type="button" disabled={busy} onClick={() => act("start_review")} className={`${primaryBtn} bg-tenant-navy hover:bg-tenant-navyDark`}>
            <PlayCircle className="h-4 w-4" aria-hidden="true" />
            {t(STRINGS.startReview, language)}
          </button>
        )}

        {status === "UNDER_REVIEW" && (
          <button type="button" disabled={busy} onClick={() => act("request_info")} className={`${primaryBtn} bg-orange-500 hover:bg-orange-600`}>
            <MessageCircleQuestion className="h-4 w-4" aria-hidden="true" />
            {t(STRINGS.requestInfo, language)}
          </button>
        )}

        {showDecisions && (
          <>
            <button type="button" disabled={busy} onClick={() => act("approve")} className={`${primaryBtn} bg-tenant-green hover:bg-tenant-greenDark`}>
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {t(STRINGS.approveLabel, language)}
            </button>
            <button type="button" disabled={busy} onClick={() => act("reject")} className={`${primaryBtn} bg-tenant-red hover:bg-red-700`}>
              <XCircle className="h-4 w-4" aria-hidden="true" />
              {t(STRINGS.rejectLabel, language)}
            </button>
          </>
        )}

        {status === "APPROVED" && canDecide && !sodBlocked && (
          <button type="button" disabled={busy} onClick={() => act("ready")} className={`${primaryBtn} bg-teal-600 hover:bg-teal-700`}>
            <PackageCheck className="h-4 w-4" aria-hidden="true" />
            {t(STRINGS.markReady, language)}
          </button>
        )}

        {status === "READY_FOR_RELEASE" && (
          <button type="button" disabled={busy} onClick={() => act("release")} className={`${primaryBtn} bg-tenant-navy hover:bg-tenant-navyDark`}>
            <PackageOpen className="h-4 w-4" aria-hidden="true" />
            {t(STRINGS.markReleased, language)}
          </button>
        )}
      </div>

      {status === "UNDER_REVIEW" && canDecide && sodBlocked && (
        <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {t(STRINGS.segregationNotice, language)}
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
