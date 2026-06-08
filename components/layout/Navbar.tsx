"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SearchModal from "@/components/layout/SearchModal";
import ImusLogo, { ImusWordmark } from "@/components/shared/ImusLogo";
import { NAV_ITEMS } from "@/lib/constants";
import { STRINGS, t } from "@/lib/i18n";

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="border-b border-gray-100 bg-white shadow-sm"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
          <ImusLogo href="/" size="lg" />

          <ul className="hidden items-center justify-center gap-0.5 lg:flex xl:gap-1">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.href + item.label.en}
                className="group relative"
                onMouseEnter={() => item.children.length > 0 && setOpenDropdown(item.label.en)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-0.5 px-2.5 py-2 text-sm font-medium transition-colors duration-200 focus-ring rounded-md xl:px-3 ${
                    isNavActive(pathname, item.href)
                      ? "border-b-2 border-imus-green text-imus-navy"
                      : "text-imus-navy hover:text-imus-red"
                  }`}
                  aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
                >
                  {t(item.label, language)}
                  {item.children.length > 0 && (
                    <ChevronDown className="h-3.5 w-3.5 text-imus-navy/50" aria-hidden="true" />
                  )}
                </Link>
                {item.children.length > 0 && (
                  <ul
                    className={`absolute left-0 top-full min-w-[220px] rounded-lg border border-gray-100 bg-white py-2 shadow-float transition-all duration-200 ${
                      openDropdown === item.label.en
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    }`}
                    role="menu"
                  >
                    {item.children.map((child) => (
                      <li key={child.href} role="none">
                        {child.external ? (
                          <a
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block border-l-4 border-transparent px-4 py-2 text-sm text-imus-navy transition-colors hover:border-imus-green hover:bg-imus-gray focus-ring"
                            role="menuitem"
                          >
                            {t(child.label, language)}
                          </a>
                        ) : (
                          <Link
                            href={child.href}
                            className="block border-l-4 border-transparent px-4 py-2 text-sm text-imus-navy transition-colors hover:border-imus-green hover:bg-imus-gray focus-ring"
                            role="menuitem"
                          >
                            {t(child.label, language)}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-imus-navy text-white transition-colors hover:bg-imus-navyDark focus-ring"
              aria-label={STRINGS.search[language]}
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              className="rounded-md p-2 text-imus-navy lg:hidden focus-ring"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[70] lg:hidden ${mobileOpen ? "visible" : "invisible"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 p-4">
            <ImusWordmark size="md" />
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-md p-2 text-imus-navy focus-ring"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="overflow-y-auto p-4" aria-label="Mobile navigation">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href + item.label.en}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-3 font-medium text-imus-navy hover:bg-imus-gray focus-ring"
                  >
                    {t(item.label, language)}
                  </Link>
                  {item.children.length > 0 && (
                    <ul className="ml-4 space-y-1 border-l border-gray-200 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          {child.external ? (
                            <a
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm text-imus-navy/70 hover:text-imus-red focus-ring"
                            >
                              {t(child.label, language)}
                            </a>
                          ) : (
                            <Link
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm text-imus-navy/70 hover:text-imus-red focus-ring"
                            >
                              {t(child.label, language)}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
