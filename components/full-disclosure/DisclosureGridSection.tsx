"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import GridPagination from "@/components/full-disclosure/GridPagination";
import { useLanguage } from "@/context/LanguageContext";
import DisclosureGridCard from "@/components/full-disclosure/DisclosureGridCard";
import {
  GRID_PAGE_SIZE,
  filterGridByCategory,
  filterGridByYear,
  getGridCategories,
  getGridDocuments,
  getGridYears,
  groupGridByYear,
  paginateGrid,
  searchGridDocuments,
  type GridDocument,
  type GridSectionConfig,
} from "@/lib/disclosure-grid";

interface DisclosureGridSectionProps {
  sectionId: string;
  config: GridSectionConfig;
  illustration?: ReactNode;
  toolbar?: ReactNode;
  items?: GridDocument[];
  initialYearFilter?: string;
  controlledQuery?: string;
  onQueryChange?: (value: string) => void;
}

export default function DisclosureGridSection({
  sectionId,
  config,
  illustration,
  toolbar,
  items: itemsOverride,
  initialYearFilter = "all",
  controlledQuery,
  onQueryChange,
}: DisclosureGridSectionProps) {
  const { language } = useLanguage();
  const lang = language === "fil" ? "fil" : "en";
  const [internalQuery, setInternalQuery] = useState("");
  const query = controlledQuery ?? internalQuery;
  const setQuery = onQueryChange ?? setInternalQuery;
  const [yearFilter, setYearFilter] = useState(initialYearFilter);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);

  const allItems = useMemo(
    () => itemsOverride ?? getGridDocuments(sectionId),
    [itemsOverride, sectionId]
  );
  const years = useMemo(() => getGridYears(allItems), [allItems]);
  const categories = useMemo(() => getGridCategories(allItems), [allItems]);

  const filteredItems = useMemo(() => {
    let items = searchGridDocuments(allItems, query);
    items = filterGridByYear(items, yearFilter);
    if (config.categoryFilter) items = filterGridByCategory(items, categoryFilter);
    return items;
  }, [allItems, query, yearFilter, categoryFilter, config.categoryFilter]);

  const pagination = useMemo(
    () => paginateGrid(filteredItems, page, config.pageSize ?? GRID_PAGE_SIZE),
    [filteredItems, page, config.pageSize]
  );

  const paginatedGrouped = useMemo(() => groupGridByYear(pagination.items), [pagination.items]);
  const paginatedYears = Object.keys(paginatedGrouped).sort((a, b) => Number(b) - Number(a));

  const resetPage = () => setPage(1);
  const Icon = config.icon;

  return (
    <div className="min-w-0 max-w-full overflow-x-hidden">
      <div className="mb-8 flex flex-col gap-6 border-b border-gray-100 pb-8 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-imus-navy text-white shadow-md">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-imus-navy md:text-3xl">
              {config.title[lang]}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
              {config.subtitle[lang]}
            </p>
          </div>
        </div>
        {illustration}
      </div>

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPage();
            }}
            placeholder={config.searchPlaceholder[lang]}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm transition-shadow focus:border-imus-navy focus:outline-none focus:ring-2 focus:ring-imus-navy/20"
          />
        </div>
        <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row">
          {years.length > 1 && (
            <>
              <label className="sr-only" htmlFor={`${sectionId}-year-filter`}>
                {language === "fil" ? "Salain ayon sa taon" : "Filter by year"}
              </label>
              <select
                id={`${sectionId}-year-filter`}
                value={yearFilter}
                onChange={(e) => {
                  setYearFilter(e.target.value);
                  resetPage();
                }}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-imus-navy shadow-sm focus:border-imus-navy focus:outline-none focus:ring-2 focus:ring-imus-navy/20 sm:w-auto sm:min-w-[140px]"
              >
                <option value="all">{language === "fil" ? "Lahat ng Taon" : "All Years"}</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </>
          )}
          {config.categoryFilter && categories.length > 1 && (
            <>
              <label className="sr-only" htmlFor={`${sectionId}-category-filter`}>
                {language === "fil" ? "Salain ayon sa kategorya" : "Filter by category"}
              </label>
              <select
                id={`${sectionId}-category-filter`}
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  resetPage();
                }}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-imus-navy shadow-sm focus:border-imus-navy focus:outline-none focus:ring-2 focus:ring-imus-navy/20 sm:w-auto sm:min-w-[160px]"
              >
                <option value="all">{language === "fil" ? "Lahat ng Kategorya" : "All Categories"}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>

      {toolbar && <div className="mb-6">{toolbar}</div>}

      {pagination.totalItems === 0 ? (
        <p className="py-16 text-center text-gray-500">
          {language === "fil" ? "Walang dokumentong nahanap." : "No documents found."}
        </p>
      ) : (
        <div className="space-y-10">
          {paginatedYears.map((year) => (
            <section key={year} aria-labelledby={`${sectionId}-year-${year}`}>
              <h3
                id={`${sectionId}-year-${year}`}
                className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-imus-navy/50"
              >
                {year} {config.groupLabel[lang]}
              </h3>
              <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {paginatedGrouped[year].map((doc) => (
                  <DisclosureGridCard
                    key={doc.id}
                    sectionId={sectionId}
                    document={doc}
                    readLabel={config.readLabel}
                    showPages={Boolean(doc.pages?.length)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <GridPagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
        label={`${config.title[lang]} pagination`}
      />
    </div>
  );
}
