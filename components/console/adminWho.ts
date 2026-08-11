import type { Session } from "next-auth";

/** Shared “Signed in as …” bits for admin console pages. */
export function adminWho(session: Session | null) {
  const user = session?.user;
  if (!user) return { whoName: undefined as string | undefined, whoMeta: undefined as string | undefined };

  const whoName =
    user.firstName || user.lastName
      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
      : user.role === "ADMIN"
        ? "Administrator"
        : (user.email ?? "Admin");

  return {
    whoName,
    whoMeta: user.role === "ADMIN" ? "Administrator" : user.role,
  };
}
