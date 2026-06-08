"use client";

import Link from "next/link";
import {
  Eye,
  ScrollText,
  Gavel,
  FileCheck,
  BadgeDollarSign,
  Briefcase,
  Users,
  Newspaper,
  Package,
  Landmark,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/lib/constants";
import { DISCLOSURE_SECTIONS } from "@/lib/full-disclosure";
import { t } from "@/lib/i18n";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  eye: Eye,
  "scroll-text": ScrollText,
  gavel: Gavel,
  "file-check": FileCheck,
  "badge-dollar-sign": BadgeDollarSign,
  briefcase: Briefcase,
  users: Users,
  newspaper: Newspaper,
  package: Package,
  landmark: Landmark,
};

interface FullDisclosureSidebarProps {
  activeSectionId: string;
}

export default function FullDisclosureSidebar({ activeSectionId }: FullDisclosureSidebarProps) {
  const { language } = useLanguage();

  return (
    <aside className="lg:sticky lg:top-32 lg:self-start">
      <p className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.2em] text-imus-navy/45">
        {language === "fil" ? "Transparency" : "Transparency"}
      </p>

      <nav aria-label="Full disclosure sections" className="space-y-1 rounded-xl bg-white p-3 shadow-md">
        {DISCLOSURE_SECTIONS.map((section) => {
          const Icon = ICON_MAP[section.icon] || Eye;
          const isActive = activeSectionId === section.id;
          const href = `/full-disclosure/${section.id}`;

          return (
            <Link
              key={section.id}
              href={href}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus-ring ${
                isActive
                  ? "bg-imus-navy font-medium text-white"
                  : "text-imus-navy hover:bg-imus-gray"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-imus-green" : "text-imus-red"}`} />
              {t(section.label, language)}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 rounded-xl bg-imus-sky/60 p-4 text-sm ring-1 ring-imus-navy/5">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-imus-navy" aria-hidden="true" />
          <div>
            <p className="font-semibold text-imus-navy">Full Disclosure Policy</p>
            <p className="mt-1 text-gray-600">
              {language === "fil"
                ? "Alinsunod sa DILG Memorandum Circular at Local Government Code."
                : "In compliance with DILG Memorandum Circular and the Local Government Code."}
            </p>
            <Link
              href="/full-disclosure/financial"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-imus-navy transition-colors hover:text-imus-red focus-ring rounded-sm"
            >
              {language === "fil" ? "Alamin pa" : "Learn more"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4 text-sm shadow-sm">
        <p className="font-semibold text-imus-navy">
          {language === "fil" ? "Kailangan ng Tulong?" : "Need Help?"}
        </p>
        <p className="mt-1 text-gray-600">
          {language === "fil"
            ? "Makipag-ugnayan sa aming tanggapan para sa mga katanungan tungkol sa transparency."
            : "Contact our office for questions about transparency documents."}
        </p>
        <a
          href={`tel:${CONTACT.mainLines[0].replace(/\D/g, "")}`}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-imus-navy transition-colors hover:text-imus-red focus-ring rounded-sm"
        >
          <Phone className="h-4 w-4 shrink-0 text-imus-red" />
          {CONTACT.mainLines[0]}
        </a>
        <a
          href={`mailto:${CONTACT.email}`}
          className="mt-2 flex items-center gap-2 text-sm font-medium text-imus-navy transition-colors hover:text-imus-red focus-ring rounded-sm"
        >
          <Mail className="h-4 w-4 shrink-0 text-imus-red" />
          {CONTACT.email}
        </a>
        <Link
          href="/contact"
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-imus-navy transition-colors hover:text-imus-red focus-ring rounded-sm"
        >
          {language === "fil" ? "Bisitahin ang Help Center" : "Visit Help Center"}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
