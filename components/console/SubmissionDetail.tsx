import Link from "next/link";
import { Download } from "lucide-react";
import StatusBadge from "@/components/console/StatusBadge";
import L from "@/components/console/L";
import { STRINGS } from "@/lib/i18n";
import { isSubmissionStatus, STATUS_META } from "@/lib/workflow";

interface EventRow {
  id: string;
  fromStatus: string | null;
  toStatus: string;
  note: string | null;
  createdAt: Date;
  actorName?: string;
}

interface AttachmentRow {
  id: string;
  filename: string;
  uploadedAt: Date;
}

function formatDateTime(date: Date) {
  return date.toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Shared read-only submission detail blocks (fields, attachments, timeline). */
export default function SubmissionDetail({
  fields,
  attachments,
  events,
}: {
  fields: Record<string, string>;
  attachments: AttachmentRow[];
  events: EventRow[];
}) {
  const fieldEntries = Object.entries(fields).filter(([, v]) => v !== "");

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-white p-6 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-tenant-navy">
          <L s={STRINGS.detailsLabel} />
        </h2>
        {fieldEntries.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">—</p>
        ) : (
          <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {fieldEntries.map(([key, value]) => (
              <div key={key}>
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {key.replace(/[-_]/g, " ")}
                </dt>
                <dd className="mt-0.5 break-words text-sm text-gray-800">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      <section className="rounded-xl bg-white p-6 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-tenant-navy">
          <L s={STRINGS.attachmentsLabel} />
        </h2>
        {attachments.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">—</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {attachments.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/api/attachments/${a.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-tenant-navy underline decoration-tenant-navy/30 underline-offset-2 hover:text-tenant-green focus-ring rounded-sm"
                >
                  <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {a.filename}
                </Link>
                <span className="ml-2 text-xs text-gray-400">{formatDateTime(a.uploadedAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl bg-white p-6 shadow-card">
        <h2 className="text-sm font-bold uppercase tracking-wider text-tenant-navy">
          <L s={STRINGS.timelineLabel} />
        </h2>
        <ol className="mt-4 space-y-0">
          {events.map((event, i) => {
            const meta = isSubmissionStatus(event.toStatus) ? STATUS_META[event.toStatus] : null;
            const last = i === events.length - 1;
            return (
              <li key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-4 h-full w-px bg-gray-200"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={`relative mt-1 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-white ring-2 ${
                    last ? "bg-tenant-green ring-tenant-green/40" : "bg-gray-300 ring-gray-200"
                  }`}
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {meta ? <StatusBadge status={event.toStatus} /> : <span>{event.toStatus}</span>}
                    <span className="text-xs text-gray-400">{formatDateTime(event.createdAt)}</span>
                    {event.actorName && (
                      <span className="text-xs text-gray-400">· {event.actorName}</span>
                    )}
                  </div>
                  {event.note && <p className="mt-1 text-sm text-gray-600">{event.note}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
