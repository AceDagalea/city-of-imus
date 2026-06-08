import { notFound } from "next/navigation";
import FullDisclosureSectionContent from "@/components/full-disclosure/FullDisclosureSectionContent";
import { DISCLOSURE_SECTION_IDS, getSectionById } from "@/lib/full-disclosure";

interface PageProps {
  params: { section: string };
}

export function generateStaticParams() {
  return DISCLOSURE_SECTION_IDS.map((section) => ({ section }));
}

export function generateMetadata({ params }: PageProps) {
  const section = getSectionById(params.section);
  if (!section) return { title: "Full Disclosure" };
  return {
    title: `${section.label.en} — Full Disclosure`,
    description: section.description.en,
  };
}

export default function FullDisclosureSectionPage({ params }: PageProps) {
  const section = getSectionById(params.section);
  if (!section) notFound();
  return <FullDisclosureSectionContent sectionId={params.section} />;
}
