"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t } from "@/lib/i18n";

const CONSOLE_HOME: Record<string, string> = {
  ADMIN: "/admin",
  STAFF: "/staff/queue",
  CITIZEN: "/citizen/dashboard",
};

function LoginForm() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-tenant-navy focus:outline-none focus:ring-2 focus:ring-tenant-navy/20";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setError(t(STRINGS.invalidCredentials, language));
      setBusy(false);
      return;
    }

    // Full page navigation ensures the session cookie is committed before the
    // middleware runs on the destination (router.push can race the Set-Cookie).
    const session = await fetch("/api/auth/session").then((r) => r.json());
    const role: string = session?.user?.role ?? "CITIZEN";
    const callbackUrl = searchParams.get("callbackUrl");
    window.location.assign(callbackUrl ?? CONSOLE_HOME[role] ?? "/citizen/dashboard");
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-card">
      <h1 className="text-xl font-bold text-tenant-navy">{t(STRINGS.loginTitle, language)}</h1>
      <p className="mt-1 text-sm text-gray-500">{t(STRINGS.loginSubtitle, language)}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-tenant-navy">
            {t(STRINGS.emailLabel, language)}
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-tenant-navy">
            {t(STRINGS.passwordLabel, language)}
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-tenant-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tenant-navyDark focus-ring disabled:opacity-60"
        >
          {busy ? t(STRINGS.processing, language) : t(STRINGS.signIn, language)}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        {t(STRINGS.noAccountYet, language)}{" "}
        <Link href="/register" className="font-semibold text-tenant-green hover:underline focus-ring rounded-sm">
          {t(STRINGS.registerHere, language)}
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
