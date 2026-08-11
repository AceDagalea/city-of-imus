"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";

type SessionUser = {
  role?: string;
  firstName?: string;
} | null;

function consoleHome(role?: string) {
  if (role === "ADMIN") return "/admin";
  if (role === "STAFF") return "/staff/queue";
  return "/citizen/dashboard";
}

/**
 * Shows Login/Register when signed out, or a console link when signed in —
 * so navigating Home → Services no longer looks like the session was lost.
 */
export default function PortalAuthButton({
  className = "hidden items-center gap-2 rounded-full bg-tenant-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tenant-navyDark focus-ring sm:inline-flex",
  variant = "header",
}: {
  className?: string;
  variant?: "header" | "sidebar";
}) {
  const [user, setUser] = useState<SessionUser>(undefined as unknown as SessionUser);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setUser(data?.user ?? null);
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null);
          setReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <span className={`${className} opacity-50`} aria-hidden="true">
        <User className="h-4 w-4" />
        …
      </span>
    );
  }

  if (user) {
    const href = consoleHome(user.role);
    const label =
      variant === "sidebar"
        ? "Go to My Dashboard"
        : user.role === "ADMIN"
          ? "Admin Console"
          : user.role === "STAFF"
            ? "Staff Queue"
            : "My Dashboard";

    return (
      <Link href={href} className={className}>
        <User className="h-4 w-4" />
        {label}
      </Link>
    );
  }

  return (
    <Link href="/login" className={className}>
      <User className="h-4 w-4" />
      {variant === "sidebar" ? "Login / Register" : "Login / Register"}
    </Link>
  );
}
