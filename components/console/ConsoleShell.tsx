"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SignOutButton from "@/components/auth/SignOutButton";
import { STRINGS, t, type LocalizedString } from "@/lib/i18n";

interface ConsoleShellProps {
  title: LocalizedString;
  /** Display name shown after “Signed in as”. */
  whoName?: string;
  /** Optional office / role meta after the name. */
  whoMeta?: string;
  subtitle?: LocalizedString;
  tabs?: { label: LocalizedString; href: string }[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function ConsoleShell({
  title,
  whoName,
  whoMeta,
  subtitle,
  tabs,
  actions,
  children,
}: ConsoleShellProps) {
  const { language } = useLanguage();
  const pathname = usePathname();

  return (
    <div className="bg-[#f4f6fa]">
      <section className="bg-gradient-to-br from-[#12275c] to-[#1b3a86] text-white">
        <div className="mx-auto max-w-[1200px] px-6 pt-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[28px] font-bold tracking-tight">{t(title, language)}</h1>
              {whoName ? (
                <p className="mt-1 text-[13px] text-[#aebbe4]">
                  {t(STRINGS.adminSignedInAs, language)}
                  <b className="text-white">{whoName}</b>
                  {whoMeta ? <> · {whoMeta}</> : null}
                </p>
              ) : subtitle ? (
                <p className="mt-1.5 max-w-2xl text-sm text-white/75">{t(subtitle, language)}</p>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              {actions}
              <SignOutButton className="inline-flex items-center gap-1.5 rounded-[9px] border border-white/25 bg-white/8 px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-white/16 focus-ring disabled:opacity-60">
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                {t(STRINGS.signOut, language)}
              </SignOutButton>
            </div>
          </div>

          {tabs && tabs.length > 0 && (
            <nav className="mt-[22px] flex gap-1 overflow-x-auto" aria-label="Console sections">
              {tabs.map((tab) => {
                const active =
                  tab.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`whitespace-nowrap px-5 py-3 text-[13.5px] font-semibold transition-colors focus-ring ${
                      active
                        ? "rounded-t-[10px] border-b-[3px] border-[#1f9d55] bg-[#f4f6fa] text-[#12275c]"
                        : "rounded-t-lg border-b-[3px] border-transparent text-[#aebbe4] hover:text-white"
                    }`}
                  >
                    {t(tab.label, language)}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-6 py-[26px] pb-[50px]">{children}</div>
    </div>
  );
}
