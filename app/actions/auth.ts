"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/db";

/**
 * Server actions for auth.
 *
 * Uses `redirect: false` then `redirect()` so the session cookie is committed
 * before navigation. Client-side useTransition around signIn was dropping
 * Set-Cookie, which forced users to log in again after leaving the console.
 */
export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "").trim();

  const user = await prisma.user.findUnique({ where: { email } });
  const home =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "STAFF"
        ? "/staff/queue"
        : "/citizen/dashboard";

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result || result.error) {
      redirect("/login?error=credentials");
    }
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=credentials");
    }
    throw error;
  }

  redirect(callbackUrl || home);
}

/**
 * Clears the session cookie only. Callers should hard-navigate
 * (e.g. `window.location.assign("/")`) so Next soft navigation
 * does not remount lazy chunks after sign-out.
 */
export async function logoutAction() {
  await signOut({ redirect: false });
}
