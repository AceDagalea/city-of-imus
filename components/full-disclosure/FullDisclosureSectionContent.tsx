"use client";

import { Suspense } from "react";
import PageHeader from "@/components/shared/PageHeader";
import BanaagSectionContent from "@/components/full-disclosure/BanaagSectionContent";
import DisclosureGridSection from "@/components/full-disclosure/DisclosureGridSection";
import GadSectionContent from "@/components/full-disclosure/GadSectionContent";
import OrdinanceGridSection from "@/components/full-disclosure/OrdinanceGridSection";
import ResolutionGridSection from "@/components/full-disclosure/ResolutionGridSection";
import FullDisclosureSidebar from "@/components/full-disclosure/FullDisclosureSidebar";
import { GRID_SECTION_CONFIG } from "@/lib/disclosure-grid";
import { DISCLOSURE_SECTIONS, getSectionById } from "@/lib/full-disclosure";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

interface FullDisclosureSectionContentProps {
  sectionId: string;
}

const GRID_SECTION_IDS = new Set(Object.keys(GRID_SECTION_CONFIG));

function SectionMain({ sectionId }: { sectionId: string }) {
  if (sectionId === "banaag") return <BanaagSectionContent />;
  if (sectionId === "gad-database") return <GadSectionContent />;
  if (sectionId === "ordinances") return <OrdinanceGridSection />;
  if (sectionId === "resolutions") return <ResolutionGridSection />;
  if (GRID_SECTION_IDS.has(sectionId)) {
    const config = GRID_SECTION_CONFIG[sectionId];
    return <DisclosureGridSection sectionId={sectionId} config={config} />;
  }
  return null;
}

function FullDisclosureSectionInner({ sectionId }: FullDisclosureSectionContentProps) {
  const { language } = useLanguage();
  const section = getSectionById(sectionId) ?? DISCLOSURE_SECTIONS[0];

  return (
    <>
      <PageHeader
        title="Full Disclosure"
        subtitle={
          language === "fil"
            ? "Transparency sa pamamahala — financial reports, executive orders, ordinances, at iba pang pampublikong dokumento ng Lungsod ng Imus."
            : "Governance transparency — financial reports, executive orders, ordinances, and other public documents of the City of Imus."
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Full Disclosure", href: "/full-disclosure/financial" },
          { label: t(section.label, language) },
        ]}
      />

      <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-10 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
          <FullDisclosureSidebar activeSectionId={sectionId} />
          <main className="min-w-0 max-w-full overflow-x-hidden">
            <SectionMain sectionId={sectionId} />
          </main>
        </div>
      </div>
    </>
  );
}

export default function FullDisclosureSectionContent(props: FullDisclosureSectionContentProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-tenant-gray pt-32" />}>
      <FullDisclosureSectionInner {...props} />
    </Suspense>
  );
}
