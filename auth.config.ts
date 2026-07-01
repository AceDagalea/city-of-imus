import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config (no Prisma/bcrypt imports) shared by the middleware
 * and the full server config in `auth.ts`. Providers are added in `auth.ts` —
 * this split keeps the middleware bundle free of Node-only dependencies.
 */
export const authConfig = {
  // Self-hosted deployments serve from their own host (not a known platform
  // proxy), so the request Host header is the source of truth for URLs.
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    // Persist role/permission claims in the JWT at sign-in.
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.canApprove = user.canApprove;
        token.officeIds = user.officeIds;
        token.verified = user.verified;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role;
        session.user.canApprove = token.canApprove;
        session.user.officeIds = token.officeIds;
        session.user.verified = token.verified;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
    // Route protection for /admin/*, /staff/*, /citizen/* (middleware matcher).
    authorized({ auth, request }) {
      const user = auth?.user;
      if (!user) return false; // → redirect to /login

      const path = request.nextUrl.pathname;
      const role = user.role;

      const allowed =
        (path.startsWith("/admin") && role === "ADMIN") ||
        (path.startsWith("/staff") && (role === "STAFF" || role === "ADMIN")) ||
        (path.startsWith("/citizen") && (role === "CITIZEN" || role === "ADMIN"));

      if (allowed) return true;

      // Authenticated but wrong role — send to their own home.
      const home =
        role === "ADMIN" ? "/admin" : role === "STAFF" ? "/staff/queue" : "/citizen/dashboard";
      return Response.redirect(new URL(home, request.nextUrl));
    },
  },
  providers: [], // filled in by auth.ts
} satisfies NextAuthConfig;
