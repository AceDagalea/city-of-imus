"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

/**
 * Keeps the Auth.js session alive across client-side navigations site-wide.
 * Without this wrapper, signIn/signOut from next-auth/react and session
 * cookies can fall out of sync when moving between public pages and consoles.
 */
export default function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider refetchOnWindowFocus={true} refetchInterval={5 * 60}>
      {children}
    </NextAuthSessionProvider>
  );
}
