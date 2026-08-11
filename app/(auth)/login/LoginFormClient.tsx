"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t } from "@/lib/i18n";
import { loginAction } from "@/app/actions/auth";

function SubmitButton() {
  const { language } = useLanguage();
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-tenant-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tenant-navyDark focus-ring disabled:opacity-60"
    >
      {pending ? t(STRINGS.processing, language) : t(STRINGS.signIn, language)}
    </button>
  );
}

function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-tenant-navy focus:outline-none focus:ring-2 focus:ring-tenant-navy/20";

  return (
    <div className="rounded-2xl bg-white p-8 shadow-card">
      <h1 className="text-xl font-bold text-tenant-navy">{t(STRINGS.loginTitle, language)}</h1>
      <p className="mt-1 text-sm text-gray-500">{t(STRINGS.loginSubtitle, language)}</p>

      <form action={loginAction} className="mt-6 space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-tenant-navy">
            {t(STRINGS.emailLabel, language)}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-tenant-navy">
            {t(STRINGS.passwordLabel, language)}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={inputClass}
          />
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {t(STRINGS.invalidCredentials, language)}
          </p>
        )}

        <SubmitButton />
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

export default function LoginFormClient({ callbackUrl = "" }: { callbackUrl?: string }) {
  return (
    <Suspense>
      <LoginForm callbackUrl={callbackUrl} />
    </Suspense>
  );
}
