"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import GadDocumentCard from "@/components/full-disclosure/GadDocumentCard";
import {
  GAD_PAGE_SIZE,
  filterGadByCategory,
  filterGadByYear,
  getAllGadDocuments,
  getGadCategories,
  getGadYears,
  groupGadByYear,
  paginateGadDocuments,
  searchGadDocuments,
} from "@/lib/gad-generated";

function DatabaseIllustration() {
  return (
    <div className="relative hidden h-28 w-36 shrink-0 md:block" aria-hidden="true">
      <div className="absolute bottom-3 right-2 h-24 w-28 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
        <div className="mb-2 flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-imus-green" />
          <div className="h-1.5 flex-1 rounded bg-gray-200" />
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded bg-imus-sky" />
          <div className="h-2 w-4/5 rounded bg-imus-gray" />
          <div className="h-2 w-full rounded bg-imus-gray" />
          <div className="mt-2 grid grid-cols-3 gap-1">
            <div className="h-6 rounded bg-imus-navy/10" />
            <div className="h-6 rounded bg-imus-green/20" />
            <div className="h-6 rounded bg-imus-sky" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-10 h-16 w-16 rounded-full bg-imus-green/15 ring-4 ring-white" />
    </div>
  );
}

export default function GadSectionContent() {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);

  const years = useMemo(() => getGadYears(), []);
  const categories = useMemo(() => getGadCategories(), []);

  const filteredDocuments = useMemo(() => {
    let items = searchGadDocuments(getAllGadDocuments(), query);
    items = filterGadByYear(items, yearFilter);
    items = filterGadByCategory(items, categoryFilter);
    return items;
  }, [query, yearFilter, categoryFilter]);

  const flatForPagination = useMemo(() => filteredDocuments, [filteredDocuments]);

  const pagination = useMemo(
    () => paginateGadDocuments(flatForPagination, page, GAD_PAGE_SIZE),
    [flatForPagination, page]
  );

  const paginatedGrouped = useMemo(() => groupGadByYear(pagination.items), [pagination.items]);
  const paginatedYears = Object.keys(paginatedGrouped).sort((a, b) => Number(b) - Number(a));

  const resetPage = () => setPage(1);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-6 border-b border-gray-100 pb-8 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-imus-navy text-white shadow-md">
            <Users className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-imus-navy md:text-3xl">GAD Database</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
              {language === "fil"
                ? "Gender and Development programs, plans, accomplishment reports, at sex-disaggregated data ng Lungsod ng Imus."
                : "Gender and Development programs, plans, accomplishment reports, and sex-disaggregated data of the City of Imus."}
            </p>
          </div>
        </div>
        <DatabaseIllustration />
      </div>

      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPage();
            }}
            placeholder={
              language === "fil"
                ? "Maghanap ng mga dokumento ng GAD..."
                : "Search GAD documents..."
            }
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm transition-shadow focus:border-imus-navy focus:outline-none focus:ring-2 focus:ring-imus-navy/20"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="gad-year-filter">
            {language === "fil" ? "Salain ayon sa taon" : "Filter by year"}
          </label>
          <select
            id="gad-year-filter"
            value={yearFilter}
            onChange={(e) => {
              setYearFilter(e.target.value);
              resetPage();
            }}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-imus-navy shadow-sm focus:border-imus-navy focus:outline-none focus:ring-2 focus:ring-imus-navy/20 sm:min-w-[140px]"
          >
            <option value="all">{language === "fil" ? "Lahat ng Taon" : "All Years"}</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="gad-category-filter">
            {language === "fil" ? "Salain ayon sa kategorya" : "Filter by category"}
          </label>
          <select
            id="gad-category-filter"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              resetPage();
            }}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-imus-navy shadow-sm focus:border-imus-navy focus:outline-none focus:ring-2 focus:ring-imus-navy/20 sm:min-w-[160px]"
          >
            <option value="all">{language === "fil" ? "Lahat ng Kategorya" : "All Categories"}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {pagination.totalItems === 0 ? (
        <p className="py-16 text-center text-gray-500">
          {language === "fil" ? "Walang dokumentong nahanap." : "No documents found."}
        </p>
      ) : (
        <div className="space-y-10">
          {paginatedYears.map((year) => (
            <section key={year} aria-labelledby={`gad-year-${year}`}>
              <h3
                id={`gad-year-${year}`}
                className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-imus-navy/50"
              >
                {year} {language === "fil" ? "Mga Dokumento" : "Documents"}
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {paginatedGrouped[year].map((doc) => (
                  <GadDocumentCard key={doc.id} document={doc} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <nav
          className="mt-10 flex items-center justify-end gap-2"
          aria-label={language === "fil" ? "Pagination ng GAD" : "GAD pagination"}
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pagination.currentPage === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-imus-navy transition-colors hover:bg-imus-gray disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
          >
            <ChevronLeft className="h-4 w-4" />
            {language === "fil" ? "Nakaraan" : "Previous"}
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => setPage(pageNum)}
              aria-current={pageNum === pagination.currentPage ? "page" : undefined}
              className={`min-w-[2.5rem] rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-ring ${
                pageNum === pagination.currentPage
                  ? "bg-imus-navy text-white shadow-sm"
                  : "border border-gray-200 bg-white text-imus-navy hover:bg-imus-gray"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={pagination.currentPage === pagination.totalPages}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-imus-navy transition-colors hover:bg-imus-gray disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
          >
            {language === "fil" ? "Susunod" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
