"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ClipboardList,
  Download,
  FileText,
  Mail,
  MessageCircle,
  Paperclip,
  Phone,
  Clock,
} from "lucide-react";
import StatusBadge from "@/components/console/StatusBadge";
import RespondForm from "@/components/console/RespondForm";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/lib/constants";
import { STRINGS, t, type LocalizedString } from "@/lib/i18n";
import {
  STATUS_META,
  citizenDetailProgress,
  isSubmissionStatus,
} from "@/lib/workflow";

export type CitizenAppEvent = {
  id: string;
  fromStatus: string | null;
  toStatus: string;
  note: string | null;
  createdAt: string;
};

export type CitizenAppAttachment = {
  id: string;
  filename: string;
  uploadedAt: string;
};

export type CitizenApplicationDetailProps = {
  referenceNo: string;
  status: string;
  formSlug: string;
  title: LocalizedString;
  serviceShort: string;
  officeShort: string;
  officeName: LocalizedString;
  processingTime: string;
  createdAt: string;
  fields: Record<string, string>;
  attachments: CitizenAppAttachment[];
  events: CitizenAppEvent[];
};

const STEPS: { key: string; labelKey: keyof typeof STRINGS; match: string[] }[] = [
  { key: "submitted", labelKey: "stepSubmitted", match: ["SUBMITTED"] },
  { key: "review", labelKey: "stepUnderReview", match: ["UNDER_REVIEW", "NEEDS_INFO"] },
  { key: "approved", labelKey: "stepApproved", match: ["APPROVED"] },
  { key: "ready", labelKey: "stepReady", match: ["READY_FOR_RELEASE"] },
  { key: "released", labelKey: "stepReleased", match: ["RELEASED"] },
];

function formatDateTime(iso: string, language: string) {
  return new Date(iso).toLocaleString(language === "fil" ? "fil-PH" : "en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(iso: string, language: string) {
  return new Date(iso).toLocaleDateString(language === "fil" ? "fil-PH" : "en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateShort(iso: string, language: string) {
  return new Date(iso).toLocaleString(language === "fil" ? "fil-PH" : "en-PH", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function labelize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function isConsentKey(key: string) {
  const k = key.toLowerCase();
  return k.includes("privacy") || k.includes("consent") || k.includes("agree");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isTruthyConsent(value: string) {
  return ["true", "on", "1", "yes", "agreed"].includes(value.trim().toLowerCase());
}

function heroBadgeClass(status: string) {
  switch (status) {
    case "UNDER_REVIEW":
    case "NEEDS_INFO":
      return "border border-[rgba(224,169,74,.35)] bg-[rgba(224,169,74,.22)] text-[#ffd48a]";
    case "APPROVED":
    case "READY_FOR_RELEASE":
    case "RELEASED":
      return "border border-white/20 bg-[rgba(31,157,85,.25)] text-[#b8f0cf]";
    case "REJECTED":
      return "border border-white/20 bg-[rgba(192,57,43,.3)] text-[#ffc9c3]";
    default:
      return "border border-white/20 bg-white/12 text-[#e6ecfb]";
  }
}

function eventDotClass(status: string) {
  if (status === "UNDER_REVIEW" || status === "APPROVED" || status === "RELEASED") {
    return "bg-[#2b57c4] shadow-[0_0_0_4px_#eaf0fc]";
  }
  if (status === "SUBMITTED" || status === "NEEDS_INFO" || status === "READY_FOR_RELEASE") {
    return "bg-[#b7791f] shadow-[0_0_0_1px_#b7791f]";
  }
  if (status === "REJECTED") return "bg-[#c0392b]";
  return "bg-[#e6e9f0] shadow-[0_0_0_1px_#8b95a7]";
}

function timelineDesc(
  status: string,
  language: "en" | "fil",
  office: string,
  attachCount: number,
  note: string | null
) {
  if (note) return note;
  if (status === "SUBMITTED") {
    const attach =
      attachCount > 0
        ? t(STRINGS.withAttachments, language).replace("{count}", String(attachCount))
        : "";
    return t(STRINGS.timelineSubmittedDesc, language).replace("{attach}", attach);
  }
  if (status === "UNDER_REVIEW") {
    return t(STRINGS.timelineReviewDesc, language).replace("{office}", office);
  }
  if (status === "NEEDS_INFO") return t(STRINGS.timelineNeedsInfoDesc, language);
  if (status === "APPROVED") return t(STRINGS.timelineApprovedDesc, language);
  if (status === "READY_FOR_RELEASE") return t(STRINGS.timelineReadyDesc, language);
  if (status === "RELEASED") return t(STRINGS.timelineReleasedDesc, language);
  if (status === "REJECTED") return t(STRINGS.timelineRejectedDesc, language);
  return status;
}

function findStepDate(events: CitizenAppEvent[], match: string[]) {
  const ev = events.find((e) => match.includes(e.toStatus));
  return ev?.createdAt;
}

export default function CitizenApplicationDetail(props: CitizenApplicationDetailProps) {
  const { language } = useLanguage();
  const { done, now } = citizenDetailProgress(props.status);
  const refTail = props.referenceNo.split("-").pop() ?? props.referenceNo;
  const fieldEntries = Object.entries(props.fields).filter(([, v]) => v !== "");
  const officeLabel = t(props.officeName, language);
  const statusLabel = isSubmissionStatus(props.status)
    ? t(STATUS_META[props.status].label, language)
    : props.status;

  const sortedEvents = [...props.events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-[#f3f5f9]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#12275c] to-[#1b3a86] text-white">
        <div
          className="pointer-events-none absolute -right-20 -top-[90px] h-80 w-80 rounded-full bg-white/5"
          aria-hidden="true"
        />
        <div className="relative z-[1] mx-auto max-w-[1120px] px-6 pb-[30px] pt-[26px]">
          <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-[#a9b6de]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              {t(STRINGS.crumbsHome, language)}
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/citizen/dashboard" className="hover:text-white">
              {t(STRINGS.crumbsMyApplications, language)}
            </Link>
            <span aria-hidden="true">›</span>
            <span className="font-mono text-[#c7d2f0]">{props.referenceNo}</span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[1.9rem] font-extrabold tracking-tight">
                {t(props.title, language)}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="rounded-lg border border-white/18 bg-white/12 px-2.5 py-1 font-mono text-xs text-[#e6ecfb]">
                  {props.referenceNo}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${heroBadgeClass(props.status)}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                  {statusLabel}
                </span>
              </div>
            </div>
            <Link
              href="/citizen/dashboard"
              className="inline-flex items-center gap-2 rounded-[10px] border border-white/25 bg-white/10 px-[18px] py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/20 focus-ring"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t(STRINGS.backLabel, language)}
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-[22px] px-6 py-6 pb-14 lg:grid-cols-[1fr_320px]">
        {/* Progress tracker */}
        <div className="rounded-2xl border border-[#e6e9f0] bg-white px-[26px] py-[22px] shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)] lg:col-span-2">
          <h2 className="mb-[18px] text-[11.5px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
            {t(STRINGS.applicationProgress, language)}
          </h2>
          <ol className="flex items-start">
            {STEPS.map((step, i) => {
              const isDone = i < done || (done === 5 && i < 5);
              const isNow = i === now;
              const isPending = !isDone && !isNow;
              const dateIso = findStepDate(props.events, step.match);
              return (
                <li
                  key={step.key}
                  className={`relative flex flex-1 flex-col items-center text-center ${
                    isPending ? "text-[#8b95a7]" : "text-[#141a29]"
                  }`}
                >
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className={`absolute left-[-50%] top-[16px] z-[1] h-[3px] w-full ${
                        isDone || isNow ? "bg-[#1f9d55]" : "bg-[#e6e9f0]"
                      }`}
                    />
                  )}
                  <span
                    className={`relative z-[2] flex h-[34px] w-[34px] items-center justify-center rounded-full border-[3px] border-white text-sm font-extrabold ${
                      isDone
                        ? "bg-[#1f9d55] text-white shadow-[0_0_0_1px_#1f9d55]"
                        : isNow
                          ? "bg-[#b7791f] text-white shadow-[0_0_0_4px_#fdf4e3]"
                          : "bg-[#e6e9f0] text-[#8b95a7] shadow-[0_0_0_1px_#e6e9f0]"
                    }`}
                  >
                    {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="mt-2 text-xs font-bold">{t(STRINGS[step.labelKey], language)}</span>
                  <span className="mt-0.5 text-[11px] text-[#8b95a7]">
                    {dateIso
                      ? formatDateShort(dateIso, language)
                      : t(STRINGS.pendingStep, language)}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex flex-col gap-[22px]">
          {props.status === "NEEDS_INFO" && (
            <section
              id="respond"
              className="overflow-hidden rounded-2xl border border-[#f5d9a8] bg-[#fdf4e3]/60 shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]"
            >
              <div className="flex items-center gap-2.5 border-b border-[#f5d9a8] px-6 py-[18px]">
                <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#fdf4e3] text-[#b7791f]">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 className="text-[15.5px] font-extrabold text-[#12275c]">
                  {t(STRINGS.respondTitle, language)}
                </h2>
              </div>
              <div className="px-6 py-5">
                <RespondForm referenceNo={props.referenceNo} />
              </div>
            </section>
          )}

          {/* Submitted info */}
          <section className="overflow-hidden rounded-2xl border border-[#e6e9f0] bg-white shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
            <div className="flex items-center gap-2.5 border-b border-[#e6e9f0] px-6 py-[18px]">
              <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#eaf0fc] text-[#2b57c4]">
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="text-[15.5px] font-extrabold text-[#12275c]">
                {t(STRINGS.detailsLabel, language)}
              </h2>
            </div>
            {fieldEntries.length === 0 ? (
              <p className="px-6 py-8 text-sm text-[#5f6a7d]">—</p>
            ) : (
              <dl className="grid grid-cols-1 gap-x-10 px-6 pb-[22px] pt-2 sm:grid-cols-2">
                {fieldEntries.map(([key, value]) => {
                  const consent = isConsentKey(key) && isTruthyConsent(value);
                  const email = isEmail(value);
                  const full = value.length > 60;
                  return (
                    <div
                      key={key}
                      className={`border-b border-[#eef1f6] py-3.5 ${full ? "sm:col-span-2" : ""}`}
                    >
                      <dt className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[#8b95a7]">
                        {labelize(key)}
                      </dt>
                      <dd className="text-sm font-semibold text-[#141a29]">
                        {consent ? (
                          <span className="inline-flex items-center gap-1.5 text-[#1f9d55]">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                            {t(STRINGS.agreedLabel, language)}
                          </span>
                        ) : email ? (
                          <a href={`mailto:${value}`} className="text-[#2b57c4] hover:underline">
                            {value}
                          </a>
                        ) : key.toLowerCase().includes("type") ||
                          key.toLowerCase().includes("request") ? (
                          <span className="inline-block rounded-md bg-[#eaf0fc] px-2.5 py-0.5 text-xs font-bold text-[#2b57c4]">
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </section>

          {/* Attachments */}
          <section className="overflow-hidden rounded-2xl border border-[#e6e9f0] bg-white shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
            <div className="flex items-center gap-2.5 border-b border-[#e6e9f0] px-6 py-[18px]">
              <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#fdf4e3] text-[#b7791f]">
                <Paperclip className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="text-[15.5px] font-extrabold text-[#12275c]">
                {t(STRINGS.attachmentsLabel, language)}
              </h2>
              <span className="ml-auto text-xs text-[#8b95a7]">
                {t(STRINGS.filesCount, language).replace(
                  "{count}",
                  String(props.attachments.length)
                )}
              </span>
            </div>
            <div className="flex flex-col gap-2.5 px-6 py-4">
              {props.attachments.length === 0 ? (
                <p className="py-4 text-sm text-[#5f6a7d]">—</p>
              ) : (
                props.attachments.map((a) => (
                  <a
                    key={a.id}
                    href={`/api/attachments/${a.id}`}
                    className="flex items-center gap-3.5 rounded-xl border border-[#e6e9f0] px-4 py-3.5 transition-colors hover:border-[#2b57c4] hover:bg-[#eaf0fc] focus-ring"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#fdecea] text-xs font-extrabold text-[#c0392b]">
                      PDF
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-[#141a29]">
                        {a.filename}
                      </span>
                      <span className="block text-xs text-[#5f6a7d]">
                        Uploaded {formatDateTime(a.uploadedAt, language)}
                      </span>
                    </span>
                    <Download className="h-4 w-4 shrink-0 text-[#8b95a7]" aria-hidden="true" />
                  </a>
                ))
              )}
            </div>
          </section>

          {/* Timeline */}
          <section className="overflow-hidden rounded-2xl border border-[#e6e9f0] bg-white shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
            <div className="flex items-center gap-2.5 border-b border-[#e6e9f0] px-6 py-[18px]">
              <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#e7f6ee] text-[#1f9d55]">
                <Clock className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="text-[15.5px] font-extrabold text-[#12275c]">
                {t(STRINGS.timelineLabel, language)}
              </h2>
            </div>
            <ol className="px-6 pb-2 pt-[18px]">
              {sortedEvents.length === 0 ? (
                <li className="pb-4 text-sm text-[#5f6a7d]">—</li>
              ) : (
                sortedEvents.map((event, i) => {
                  const last = i === sortedEvents.length - 1;
                  const attachForSubmit =
                    event.toStatus === "SUBMITTED" ? props.attachments.length : 0;
                  return (
                    <li key={event.id} className="relative flex gap-3.5 pb-[22px] last:pb-2">
                      {!last && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-[6px] top-3.5 w-0.5 bg-[#e6e9f0]"
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className={`relative z-[2] mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-[3px] border-white ${eventDotClass(event.toStatus)}`}
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <StatusBadge status={event.toStatus} />
                          <span className="text-xs text-[#8b95a7]">
                            {formatDateTime(event.createdAt, language)}
                          </span>
                        </div>
                        <p className="mt-1 text-[13.5px] text-[#5f6a7d]">
                          {timelineDesc(
                            event.toStatus,
                            language,
                            officeLabel,
                            attachForSubmit,
                            event.note
                          )}
                        </p>
                      </div>
                    </li>
                  );
                })
              )}
            </ol>
          </section>
        </div>

        <aside className="flex flex-col gap-[18px] lg:sticky lg:top-[22px]">
          <div className="rounded-2xl border border-[#e6e9f0] bg-white p-5 shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
            <h3 className="mb-3.5 text-[11.5px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
              {t(STRINGS.summaryLabel, language)}
            </h3>
            {[
              {
                k: t(STRINGS.referenceShort, language),
                v: refTail,
                mono: true,
              },
              { k: t(STRINGS.serviceLabel, language), v: props.serviceShort },
              { k: t(STRINGS.handlingOffice, language), v: props.officeShort },
              {
                k: t(STRINGS.submittedOn, language),
                v: formatDate(props.createdAt, language),
              },
              { k: t(STRINGS.estCompletion, language), v: props.processingTime },
            ].map((row) => (
              <div
                key={row.k}
                className="flex items-center justify-between border-b border-[#eef1f6] py-2.5 text-[13.5px] last:border-b-0"
              >
                <span className="text-[#5f6a7d]">{row.k}</span>
                <span
                  className={`font-bold text-[#141a29] ${row.mono ? "font-mono text-xs" : ""}`}
                >
                  {row.v}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#e6e9f0] bg-white p-5 shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
            <h3 className="mb-3.5 text-[11.5px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
              {t(STRINGS.actionsLabel, language)}
            </h3>
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-[11px] bg-[#1f9d55] px-4 py-3 text-sm font-bold text-white shadow-[0_8px_18px_rgba(31,157,85,.3)] transition hover:brightness-105 focus-ring"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t(STRINGS.downloadReceipt, language)}
              </button>
              {props.status === "NEEDS_INFO" ? (
                <a
                  href="#respond"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[11px] border border-[#e6e9f0] bg-white px-4 py-3 text-sm font-bold text-[#12275c] transition-colors hover:border-[#2b57c4] hover:text-[#2b57c4] focus-ring"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  {t(STRINGS.editSubmission, language)}
                </a>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-[#e6e9f0] bg-white p-5 shadow-[0_2px_6px_rgba(16,24,64,.05),0_12px_28px_rgba(16,24,64,.07)]">
            <h3 className="mb-3.5 text-[11.5px] font-extrabold uppercase tracking-wide text-[#8b95a7]">
              {t(STRINGS.needHelp, language)}
            </h3>
            <a
              href={`tel:${CONTACT.mainLines[0].replace(/\D/g, "")}`}
              className="flex items-center gap-2.5 py-2.5 focus-ring rounded-sm"
            >
              <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-[#e7f6ee] text-[#1f9d55]">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13px] font-bold text-[#141a29]">{CONTACT.mainLines[0]}</span>
                <span className="text-xs text-[#5f6a7d]">Mon–Thu, 7 AM – 6 PM</span>
              </span>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2.5 border-t border-[#eef1f6] py-2.5 focus-ring rounded-sm"
            >
              <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-[#e7f6ee] text-[#1f9d55]">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13px] font-bold text-[#141a29]">
                  {t(STRINGS.sendMessage, language)}
                </span>
                <span className="text-xs text-[#5f6a7d]">{t(STRINGS.sendMessageSub, language)}</span>
              </span>
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
}
