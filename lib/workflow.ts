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

/**
 * Mini progress track for the citizen dashboard (4 steps matching the mock):
 * Received → Under Review → Approved → Ready/Released
 */
export function citizenProgress(status: string): { done: number; now: number } {
  switch (status) {
    case "DRAFT":
      return { done: 0, now: 0 };
    case "SUBMITTED":
      return { done: 1, now: -1 };
    case "UNDER_REVIEW":
    case "NEEDS_INFO":
      return { done: 1, now: 1 };
    case "APPROVED":
      return { done: 2, now: 2 };
    case "READY_FOR_RELEASE":
      return { done: 3, now: 3 };
    case "RELEASED":
      return { done: 4, now: -1 };
    case "REJECTED":
      return { done: 1, now: 1 };
    default:
      return { done: 0, now: 0 };
  }
}

/**
 * 5-step application detail tracker (Submitted → Under Review → Approved →
 * Ready for Release → Released). `done` = completed steps, `now` = active
 * step index (0-based), or -1 when fully complete.
 */
export function citizenDetailProgress(status: string): { done: number; now: number } {
  switch (status) {
    case "DRAFT":
      return { done: 0, now: 0 };
    case "SUBMITTED":
      return { done: 0, now: 0 };
    case "UNDER_REVIEW":
    case "NEEDS_INFO":
      return { done: 1, now: 1 };
    case "APPROVED":
      return { done: 2, now: 2 };
    case "READY_FOR_RELEASE":
      return { done: 3, now: 3 };
    case "RELEASED":
      return { done: 5, now: -1 };
    case "REJECTED":
      return { done: 1, now: 1 };
    default:
      return { done: 0, now: 0 };
  }
}

/** Citizen-facing badge tone classes (dot + soft pill). */
export function citizenBadgeTone(status: string): "review" | "ready" | "received" | "done" | "reject" {
  switch (status) {
    case "UNDER_REVIEW":
    case "NEEDS_INFO":
      return "review";
    case "APPROVED":
    case "READY_FOR_RELEASE":
      return "ready";
    case "RELEASED":
      return "done";
    case "REJECTED":
      return "reject";
    default:
      return "received";
  }
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
