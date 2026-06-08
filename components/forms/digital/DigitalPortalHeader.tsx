"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, User, Menu, X } from "lucide-react";
import ImusLogo from "@/components/shared/ImusLogo";
import { CONTACT } from "@/lib/constants";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/forms", children: [{ label: "All Services", href: "/forms" }, { label: "Business Permits", href: "/forms?tab=businesses" }] },
  { label: "Track Application", href: "/forms#track" },
  { label: "My Dashboard", href: "/forms#dashboard" },
];

export default function DigitalPortalHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-imus-navy text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs md:px-6">
          <p className="text-white/85">
            Official Website of the{" "}
            <span className="font-semibold text-imus-green-light">City Government of Imus</span>, Cavite
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white/75">
            <a href="#main-content" className="hover:text-white focus-ring rounded-sm">
              Accessibility
            </a>
            <Link href="/contact" className="hover:text-white focus-ring rounded-sm">
              Help Center
            </Link>
            <Link href="/contact#hotlines" className="hover:text-white focus-ring rounded-sm">
              FAQs
            </Link>
          </div>
        </div>
      </div>

      <nav className="border-b border-gray-100 shadow-sm" aria-label="Digital services navigation">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
          <ImusLogo href="/forms" size="lg" />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-imus-navy transition-colors hover:text-imus-red focus-ring rounded-md"
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-50" />}
                </Link>
                {item.children && openMenu === item.label && (
                  <ul className="absolute left-0 top-full min-w-[180px] rounded-lg border border-gray-100 bg-white py-2 shadow-float">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-sm text-imus-navy hover:bg-imus-gray focus-ring"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={CONTACT.eboss}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-imus-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-imus-navyDark focus-ring sm:inline-flex"
            >
              <User className="h-4 w-4" />
              Login / Register
            </a>
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

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white p-4 shadow-xl">
            <div className="mb-4 flex justify-end">
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="focus-ring rounded-md p-2">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 font-medium text-imus-navy hover:bg-imus-gray"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
