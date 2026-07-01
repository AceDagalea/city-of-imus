"use client";

import { useState } from "react";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t } from "@/lib/i18n";

export default function RegisterPage() {
  const { language } = useLanguage();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors focus:border-tenant-navy focus:outline-none focus:ring-2 focus:ring-tenant-navy/20";

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, phone: form.phone || undefined }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Registration failed");
      setBusy(false);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-card">
        <MailCheck className="mx-auto h-12 w-12 text-tenant-green" aria-hidden="true" />
        <h1 className="mt-4 text-xl font-bold text-tenant-navy">
          {t(STRINGS.verifyEmailTitle, language)}
        </h1>
        <p className="mt-2 text-sm text-gray-600">{t(STRINGS.verifyEmailSent, language)}</p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-lg bg-tenant-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tenant-navyDark focus-ring"
        >
          {t(STRINGS.signIn, language)}
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-card">
      <h1 className="text-xl font-bold text-tenant-navy">{t(STRINGS.registerTitle, language)}</h1>
      <p className="mt-1 text-sm text-gray-500">{t(STRINGS.registerSubtitle, language)}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-tenant-navy">
              {t(STRINGS.firstNameLabel, language)}
            </label>
            <input id="firstName" required value={form.firstName} onChange={update("firstName")} className={inputClass} />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-tenant-navy">
              {t(STRINGS.lastNameLabel, language)}
            </label>
            <input id="lastName" required value={form.lastName} onChange={update("lastName")} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-tenant-navy">
            {t(STRINGS.emailLabel, language)}
          </label>
          <input id="email" type="email" required autoComplete="email" value={form.email} onChange={update("email")} className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-tenant-navy">
            {t(STRINGS.phoneLabel, language)}
          </label>
          <input id="phone" type="tel" value={form.phone} onChange={update("phone")} className={inputClass} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-tenant-navy">
            {t(STRINGS.passwordLabel, language)}
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={form.password}
            onChange={update("password")}
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
          {busy ? t(STRINGS.processing, language) : t(STRINGS.createAccount, language)}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        {t(STRINGS.alreadyHaveAccount, language)}{" "}
        <Link href="/login" className="font-semibold text-tenant-green hover:underline focus-ring rounded-sm">
          {t(STRINGS.signInHere, language)}
        </Link>
      </p>
    </div>
  );
}
