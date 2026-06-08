import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import DisclosureDocumentView from "@/components/full-disclosure/DisclosureDocumentView";
import TextDisclosureView from "@/components/full-disclosure/TextDisclosureView";
import FullDisclosureSidebar from "@/components/full-disclosure/FullDisclosureSidebar";
import {
  findOrdinanceById,
  findResolutionById,
  getAllGridDocumentParams,
  getGridDocumentById,
  GRID_SECTION_CONFIG,
  PDF_SECTION_IDS,
} from "@/lib/disclosure-grid";
import { getSectionById } from "@/lib/full-disclosure";
import { t } from "@/lib/i18n";

interface PageProps {
  params: { section: string; id: string };
}

export function generateStaticParams() {
  return getAllGridDocumentParams();
}

export function generateMetadata({ params }: PageProps) {
  const section = getSectionById(params.section);
  const doc = getGridDocumentById(params.section, params.id);
  if (!doc && params.section !== "ordinances" && params.section !== "resolutions") {
    return { title: "Full Disclosure" };
  }
  const title =
    doc?.title ??
    findOrdinanceById(params.id)?.item.title ??
    findResolutionById(params.id)?.item.title ??
    "Document";
  return {
    title: `${title} — ${section?.label.en ?? "Full Disclosure"}`,
  };
}

export default function DisclosureDocumentPage({ params }: PageProps) {
  const section = getSectionById(params.section);
  if (!section) notFound();

  const config = GRID_SECTION_CONFIG[params.section];
  const pdfDoc = PDF_SECTION_IDS.includes(params.section)
    ? getGridDocumentById(params.section, params.id)
    : undefined;

  if (pdfDoc) {
    return (
      <>
        <PageHeader
          title="Full Disclosure"
          subtitle={config?.subtitle.en ?? section.description.en}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Full Disclosure", href: "/full-disclosure/financial" },
            { label: t(section.label, "en"), href: `/full-disclosure/${params.section}` },
            { label: pdfDoc.title },
          ]}
        />
        <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-10 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
            <FullDisclosureSidebar activeSectionId={params.section} />
            <main className="min-w-0 max-w-full overflow-x-hidden">
              <DisclosureDocumentView sectionId={params.section} document={pdfDoc} />
            </main>
          </div>
        </div>
      </>
    );
  }

  if (params.section === "ordinances") {
    const result = findOrdinanceById(params.id);
    if (!result) notFound();
    return (
      <>
        <PageHeader
          title="Full Disclosure"
          subtitle={section.description.en}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Full Disclosure", href: "/full-disclosure/financial" },
            { label: "City Ordinances", href: "/full-disclosure/ordinances" },
            { label: result.item.number },
          ]}
        />
        <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-10 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
            <FullDisclosureSidebar activeSectionId="ordinances" />
            <main className="min-w-0 max-w-full overflow-x-hidden">
              <TextDisclosureView
                sectionId="ordinances"
                document={result.grid}
                enacted={result.item.enacted}
                approved={result.item.approved}
              />
            </main>
          </div>
        </div>
      </>
    );
  }

  if (params.section === "resolutions") {
    const result = findResolutionById(params.id);
    if (!result) notFound();
    return (
      <>
        <PageHeader
          title="Full Disclosure"
          subtitle={section.description.en}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Full Disclosure", href: "/full-disclosure/financial" },
            { label: "Resolutions", href: "/full-disclosure/resolutions" },
            { label: result.item.number },
          ]}
        />
        <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-10 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
            <FullDisclosureSidebar activeSectionId="resolutions" />
            <main className="min-w-0 max-w-full overflow-x-hidden">
              <TextDisclosureView sectionId="resolutions" document={result.grid} />
            </main>
          </div>
        </div>
      </>
    );
  }

  notFound();
}
