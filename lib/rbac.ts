import { prisma } from "@/lib/db";

/**
 * Role system + permission matrix (master plan §6.1, §6.2).
 *
 * Roles are stored as Strings in SQLite (Prisma enums unsupported); this module
 * is the single source of truth for the allowed values and the permission
 * checks. Every mutating API route must call these server-side — never trust a
 * client-side role check alone.
 */

export const ROLES = ["CITIZEN", "STAFF", "ADMIN"] as const;
export type Role = (typeof ROLES)[number];

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}

/** `User.officeIds` is a JSON-encoded string array (SQLite has no scalar lists). */
export function parseOfficeIds(officeIds: string): string[] {
  try {
    const parsed = JSON.parse(officeIds);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function serializeOfficeIds(officeIds: string[]): string {
  return JSON.stringify(officeIds);
}

export interface SessionActor {
  id: string;
  role: Role;
  canApprove: boolean;
  officeIds: string[];
}

// ── Permission matrix (§6.2) ────────────────────────────────────────────────

export function canCreateRequest(actor: SessionActor): boolean {
  return actor.role === "CITIZEN";
}

export function canViewSubmission(
  actor: SessionActor,
  submission: { citizenId: string; officeId: string }
): boolean {
  if (actor.role === "ADMIN") return true;
  if (actor.role === "STAFF") return actor.officeIds.includes(submission.officeId);
  return submission.citizenId === actor.id;
}

/** Move to under-review / request info — Staff (own offices) and Admin. */
export function canProcessSubmission(
  actor: SessionActor,
  submission: { officeId: string }
): boolean {
  if (actor.role === "ADMIN") return true;
  return actor.role === "STAFF" && actor.officeIds.includes(submission.officeId);
}

/**
 * Approve / reject — Staff with `canApprove` (own offices) and Admin, subject
 * to the segregation-of-duties rule checked separately via
 * `violatesSegregationOfDuties`.
 */
export function canDecideSubmission(
  actor: SessionActor,
  submission: { officeId: string }
): boolean {
  if (actor.role === "ADMIN") return true;
  return (
    actor.role === "STAFF" && actor.canApprove && actor.officeIds.includes(submission.officeId)
  );
}

export function canReassign(actor: SessionActor): boolean {
  return actor.role === "ADMIN";
}

export function canManageUsers(actor: SessionActor): boolean {
  return actor.role === "ADMIN";
}

export function canManageCatalog(actor: SessionActor): boolean {
  return actor.role === "ADMIN";
}

// ── Segregation of duties (§6.1 note, CURSOR_PROMPT Phase 3.3) ──────────────

/**
 * A staff member with `canApprove` cannot approve/reject a submission they
 * themselves moved to UNDER_REVIEW. Admins are exempt (they can override).
 */
export async function violatesSegregationOfDuties(
  actor: SessionActor,
  submissionId: string
): Promise<boolean> {
  if (actor.role === "ADMIN") return false;
  const reviewEvent = await prisma.submissionEvent.findFirst({
    where: { submissionId, toStatus: "UNDER_REVIEW" },
    orderBy: { createdAt: "desc" },
  });
  return reviewEvent?.actorId === actor.id;
}
