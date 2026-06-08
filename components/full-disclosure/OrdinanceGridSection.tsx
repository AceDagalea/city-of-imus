"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import DisclosureGridSection from "@/components/full-disclosure/DisclosureGridSection";
import YearFilterTabs from "@/components/full-disclosure/YearFilterTabs";
import {
  GRID_SECTION_CONFIG,
  getOrdinanceGridDocuments,
  ORDINANCE_RANGES,
  searchGridDocuments,
} from "@/lib/disclosure-grid";
import { getOrdinanceRangeCounts } from "@/lib/disclosure-generated";

export default function OrdinanceGridSection() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const ordinanceRange = searchParams.get("range") || "2011-2024";
  const rangeCounts = useMemo(() => getOrdinanceRangeCounts(), []);

  const items = useMemo(() => {
    return searchGridDocuments(getOrdinanceGridDocuments(ordinanceRange), query);
  }, [ordinanceRange, query]);

  return (
    <DisclosureGridSection
      sectionId="ordinances"
      config={GRID_SECTION_CONFIG.ordinances}
      items={items}
      controlledQuery={query}
      onQueryChange={setQuery}
      toolbar={
        <YearFilterTabs
          basePath="/full-disclosure/ordinances"
          paramName="range"
          activeValue={ordinanceRange}
          options={ORDINANCE_RANGES.map((range) => ({
            value: range.id,
            label: range.label,
            count: rangeCounts[range.id] ?? 0,
          })).filter((range) => range.count > 0)}
        />
      }
    />
  );
}
