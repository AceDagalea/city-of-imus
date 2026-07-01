"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { STRINGS, t, type LocalizedString } from "@/lib/i18n";

interface ConsoleShellProps {
  title: LocalizedString;
  subtitle?: LocalizedString;
  /** Section nav tabs (admin console). */
  tabs?: { label: LocalizedString; href: string }[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function ConsoleShell({ title, subtitle, tabs, actions, children }: ConsoleShellProps) {
  const { language } = useLanguage();
  const pathname = usePathname();

  return (
    <div className="bg-tenant-gray">
      <div className="bg-tenant-navy pb-10 pt-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 md:px-6">
          <div>
            <h1 className="font-heading text-2xl font-bold md:text-3xl">{t(title, language)}</h1>
            {subtitle && (
              <p className="mt-1.5 max-w-2xl text-sm text-white/75">{t(subtitle, language)}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {actions}
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-3 py-2 text-xs font-semibold text-white/85 transition-colors hover:bg-white/10 focus-ring"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              {t(STRINGS.signOut, language)}
            </button>
          </div>
        </div>
        {tabs && tabs.length > 0 && (
          <nav className="mx-auto mt-6 max-w-7xl px-4 md:px-6" aria-label="Console sections">
            <ul className="flex flex-wrap gap-1">
              {tabs.map((tab) => {
                const active = pathname === tab.href;
                return (
                  <li key={tab.href}>
                    <Link
                      href={tab.href}
                      className={`inline-block rounded-t-lg px-4 py-2 text-sm font-medium transition-colors focus-ring ${
                        active
                          ? "bg-tenant-gray text-tenant-navy"
                          : "text-white/75 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {t(tab.label, language)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">{children}</div>
    </div>
  );
}
