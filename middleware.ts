import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

/**
 * Route protection for /admin/*, /staff/*, /citizen/*.
 *
 * Uses the auth() wrapper (not the authorized callback) so the full JWT →
 * session mapping runs on every matched request — including when returning
 * from public pages like /, /forms, /about, etc.
 */
export default auth((req) => {
  const user = req.auth?.user;
  const path = req.nextUrl.pathname;

  if (!user) {
    const login = new URL("/login", req.nextUrl.origin);
    login.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(login);
  }

  const role = user.role;
  if (!role) {
    // Authenticated but custom claims not decoded on edge — let the server
    // page's auth() call enforce RBAC rather than forcing a false login.
    return NextResponse.next();
  }

  const allowed =
    (path.startsWith("/admin") && role === "ADMIN") ||
    (path.startsWith("/staff") && (role === "STAFF" || role === "ADMIN")) ||
    (path.startsWith("/citizen") && (role === "CITIZEN" || role === "ADMIN"));

  if (allowed) return NextResponse.next();

  const home =
    role === "ADMIN" ? "/admin" : role === "STAFF" ? "/staff/queue" : "/citizen/dashboard";
  return NextResponse.redirect(new URL(home, req.nextUrl.origin));
});

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*", "/citizen/:path*"],
};
