"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, MailCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t } from "@/lib/i18n";

function VerifyContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState<"pending" | "success" | "error" | "no-token">(
    token ? "pending" : "no-token"
  );

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (!cancelled) setState(res.ok ? "success" : "error");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-card">
      {state === "pending" && <p className="text-sm text-gray-600">{t(STRINGS.processing, language)}</p>}

      {state === "no-token" && (
        <>
          <MailCheck className="mx-auto h-12 w-12 text-tenant-green" aria-hidden="true" />
          <h1 className="mt-4 text-xl font-bold text-tenant-navy">
            {t(STRINGS.verifyEmailTitle, language)}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{t(STRINGS.verifyEmailSent, language)}</p>
        </>
      )}

      {state === "success" && (
        <>
          <CheckCircle2 className="mx-auto h-12 w-12 text-tenant-green" aria-hidden="true" />
          <h1 className="mt-4 text-xl font-bold text-tenant-navy">
            {t(STRINGS.verifyEmailTitle, language)}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{t(STRINGS.verifySuccess, language)}</p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-tenant-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tenant-navyDark focus-ring"
          >
            {t(STRINGS.signIn, language)}
          </Link>
        </>
      )}

      {state === "error" && (
        <>
          <XCircle className="mx-auto h-12 w-12 text-red-500" aria-hidden="true" />
          <h1 className="mt-4 text-xl font-bold text-tenant-navy">
            {t(STRINGS.verifyEmailTitle, language)}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{t(STRINGS.verifyFailed, language)}</p>
        </>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
