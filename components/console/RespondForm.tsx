"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Paperclip } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t } from "@/lib/i18n";

/**
 * Citizen response to a NEEDS_INFO request: reply text and/or additional
 * documents. Reuses the digital-forms input styling for a consistent UX.
 */
export default function RespondForm({ referenceNo }: { referenceNo: string }) {
  const { language } = useLanguage();
  const router = useRouter();
  const [reply, setReply] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const formData = new FormData();
    formData.append("reply", reply);
    if (files) {
      Array.from(files).forEach((file, i) => formData.append(`document-${i}`, file));
    }

    const res = await fetch(`/api/citizen/applications/${referenceNo}/respond`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to send response");
      setBusy(false);
      return;
    }
    setSent(true);
    router.refresh();
  }

  if (sent) {
    return (
      <p className="rounded-lg bg-tenant-green/10 px-4 py-3 text-sm font-medium text-tenant-greenDark">
        {t(STRINGS.responseSent, language)}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-600">{t(STRINGS.respondHelp, language)}</p>
      <div>
        <label htmlFor="reply" className="mb-1.5 block text-sm font-medium text-tenant-navy">
          {t(STRINGS.replyLabel, language)}
        </label>
        <textarea
          id="reply"
          rows={4}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-tenant-navy outline-none transition-colors focus:border-tenant-navy focus:ring-2 focus:ring-tenant-navy/15"
        />
      </div>
      <div>
        <label htmlFor="documents" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-tenant-navy">
          <Paperclip className="h-4 w-4" aria-hidden="true" />
          {t(STRINGS.uploadDocs, language)}
        </label>
        <input
          id="documents"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setFiles(e.target.files)}
          className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-tenant-navy file:px-4 file:py-1.5 file:text-sm file:font-medium file:text-white"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy || (!reply.trim() && !files?.length)}
        className="inline-flex items-center gap-2 rounded-lg bg-tenant-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tenant-navyDark focus-ring disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {busy ? t(STRINGS.processing, language) : t(STRINGS.sendResponse, language)}
      </button>
    </form>
  );
}
