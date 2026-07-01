import { auth } from "@/auth";
import type { Role, SessionActor } from "@/lib/rbac";
import { isRole } from "@/lib/rbac";

/** The authenticated actor for the current request, or null. */
export async function getSession(): Promise<SessionActor | null> {
  const session = await auth();
  const user = session?.user;
  if (!user?.id || !isRole(user.role)) return null;
  return {
    id: user.id,
    role: user.role,
    canApprove: user.canApprove,
    officeIds: user.officeIds,
  };
}

/**
 * Require an authenticated session with one of the given roles.
 * Returns the actor, or null when the requirement isn't met — API routes should
 * translate null into a 401/403 response.
 */
export async function requireRole(role: Role | Role[]): Promise<SessionActor | null> {
  const actor = await getSession();
  if (!actor) return null;
  const allowed = Array.isArray(role) ? role : [role];
  return allowed.includes(actor.role) ? actor : null;
}

/** Whether the current session's email address is verified. */
export async function isEmailVerified(): Promise<boolean> {
  const session = await auth();
  return Boolean(session?.user?.verified);
}
