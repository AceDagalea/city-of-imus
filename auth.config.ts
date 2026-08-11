import type { NextAuthConfig } from "next-auth";

/** Secure cookies require HTTPS — plain http://localhost must stay non-secure. */
const useSecureCookies =
  process.env.AUTH_URL?.startsWith("https://") === true ||
  process.env.NEXTAUTH_URL?.startsWith("https://") === true;

/**
 * Edge-safe Auth.js config (no Prisma/bcrypt imports) shared by the middleware
 * and the full server config in `auth.ts`. Providers are added in `auth.ts` —
 * this split keeps the middleware bundle free of Node-only dependencies.
 */
export const authConfig = {
  // Self-hosted deployments serve from their own host (not a known platform
  // proxy), so the request Host header is the source of truth for URLs.
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: useSecureCookies ? "__Secure-authjs.session-token" : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax" as const,
        path: "/",
        secure: useSecureCookies,
        // Explicit maxAge so the browser keeps the cookie across navigations.
        maxAge: 30 * 24 * 60 * 60,
      },
    },
  },
  callbacks: {
    // Persist role/permission claims in the JWT at sign-in AND on every refresh.
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
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
        session.user.id = (token.sub as string) ?? "";
        session.user.role = (token.role as string) ?? "";
        session.user.canApprove = Boolean(token.canApprove);
        session.user.officeIds = (token.officeIds as string[]) ?? [];
        session.user.verified = Boolean(token.verified);
        session.user.firstName = (token.firstName as string) ?? "";
        session.user.lastName = (token.lastName as string) ?? "";
      }
      return session;
    },
  },
  providers: [], // filled in by auth.ts
} satisfies NextAuthConfig;
