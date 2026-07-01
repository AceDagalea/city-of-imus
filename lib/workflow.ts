/**
 * Request lifecycle (master plan §5.2):
 *
 * DRAFT → SUBMITTED → UNDER_REVIEW → (NEEDS_INFO ⇄ UNDER_REVIEW) → APPROVED
 *                                   ↘ REJECTED       → READY_FOR_RELEASE → RELEASED
 *
 * Statuses are stored as Strings in SQLite (Prisma enums unsupported); this
 * module is the single source of truth for the allowed values and transitions.
 */

export const SUBMISSION_STATUSES = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "NEEDS_INFO",
  "APPROVED",
  "REJECTED",
  "READY_FOR_RELEASE",
  "RELEASED",
] as const;

export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export function isSubmissionStatus(value: string): value is SubmissionStatus {
  return (SUBMISSION_STATUSES as readonly string[]).includes(value);
}

/** Allowed forward transitions, keyed by current status. */
export const STATUS_TRANSITIONS: Record<SubmissionStatus, SubmissionStatus[]> = {
  DRAFT: ["SUBMITTED"],
  SUBMITTED: ["UNDER_REVIEW"],
  UNDER_REVIEW: ["NEEDS_INFO", "APPROVED", "REJECTED"],
  NEEDS_INFO: ["UNDER_REVIEW"],
  APPROVED: ["READY_FOR_RELEASE"],
  READY_FOR_RELEASE: ["RELEASED"],
  REJECTED: [],
  RELEASED: [],
};

export function canTransition(from: SubmissionStatus, to: SubmissionStatus): boolean {
  return STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

/** Display metadata for status badges (labels have en/fil pairs). */
export const STATUS_META: Record<
  SubmissionStatus,
  { label: { en: string; fil: string }; badgeClass: string }
> = {
  DRAFT: {
    label: { en: "Draft", fil: "Draft" },
    badgeClass: "bg-gray-100 text-gray-700",
  },
  SUBMITTED: {
    label: { en: "Submitted", fil: "Naisumite" },
    badgeClass: "bg-gov-blue/10 text-gov-blueDark",
  },
  UNDER_REVIEW: {
    label: { en: "Under Review", fil: "Sinusuri" },
    badgeClass: "bg-amber-100 text-amber-800",
  },
  NEEDS_INFO: {
    label: { en: "Needs Info", fil: "Kailangan ng Impormasyon" },
    badgeClass: "bg-orange-100 text-orange-800",
  },
  APPROVED: {
    label: { en: "Approved", fil: "Aprubado" },
    badgeClass: "bg-tenant-green/15 text-tenant-greenDark",
  },
  REJECTED: {
    label: { en: "Rejected", fil: "Tinanggihan" },
    badgeClass: "bg-red-100 text-red-700",
  },
  READY_FOR_RELEASE: {
    label: { en: "Ready for Release", fil: "Handa nang Kunin" },
    badgeClass: "bg-teal-100 text-teal-800",
  },
  RELEASED: {
    label: { en: "Released", fil: "Nailabas" },
    badgeClass: "bg-tenant-navy/10 text-tenant-navy",
  },
};
