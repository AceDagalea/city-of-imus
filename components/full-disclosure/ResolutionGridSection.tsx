"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import DisclosureGridSection from "@/components/full-disclosure/DisclosureGridSection";
import YearFilterTabs from "@/components/full-disclosure/YearFilterTabs";
import {
  GRID_SECTION_CONFIG,
  getResolutionGridDocuments,
  RESOLUTION_ARCHIVE_OPTIONS,
  searchGridDocuments,
} from "@/lib/disclosure-grid";
import { getResolutionsByArchive } from "@/lib/disclosure-generated";

export default function ResolutionGridSection() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const resolutionArchive = searchParams.get("archive") || "current";
  const activeArchiveLabel =
    RESOLUTION_ARCHIVE_OPTIONS.find((a) => a.id === resolutionArchive)?.label ?? "Archive";

  const items = useMemo(() => {
    return searchGridDocuments(getResolutionGridDocuments(resolutionArchive), query);
  }, [resolutionArchive, query]);

  return (
    <DisclosureGridSection
      sectionId="resolutions"
      config={GRID_SECTION_CONFIG.resolutions}
      items={items}
      controlledQuery={query}
      onQueryChange={setQuery}
      toolbar={
        <>
          <YearFilterTabs
            basePath="/full-disclosure/resolutions"
            paramName="archive"
            activeValue={resolutionArchive}
            options={RESOLUTION_ARCHIVE_OPTIONS.map((archive) => ({
              value: archive.id,
              label: archive.label,
              count: getResolutionsByArchive(archive.id).length,
            })).filter((archive) => archive.count > 0)}
          />
          <p className="mt-4 text-sm text-gray-500">
            {language === "fil"
              ? `Ipinapakita ang mga resolusyon mula sa ${activeArchiveLabel}.`
              : `Showing resolutions from ${activeArchiveLabel}.`}
          </p>
        </>
      }
    />
  );
}
