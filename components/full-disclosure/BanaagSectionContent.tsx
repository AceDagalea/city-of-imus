"use client";

import { useMemo, useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import BanaagIssueCard from "@/components/full-disclosure/BanaagIssueCard";
import {
  BANAAG_PAGE_SIZE,
  filterBanaagByYear,
  getAllBanaagIssues,
  getBanaagYears,
  groupBanaagByYear,
  paginateBanaagIssues,
  searchBanaagIssues,
} from "@/lib/banaag-generated";

function MagazineIllustration() {
  return (
    <div className="relative hidden h-28 w-36 shrink-0 md:block" aria-hidden="true">
      <div className="absolute bottom-2 right-6 h-20 w-14 rotate-[-8deg] rounded-md border border-gray-200 bg-white shadow-md" />
      <div className="absolute bottom-4 right-3 h-20 w-14 rotate-[6deg] rounded-md border border-gray-200 bg-gradient-to-br from-tenant-sky to-white shadow-md" />
      <div className="absolute bottom-6 right-9 h-20 w-14 rounded-md border border-tenant-navy/10 bg-white shadow-lg ring-1 ring-tenant-navy/5">
        <div className="h-1.5 w-full rounded-t-md bg-tenant-navy" />
        <div className="space-y-1.5 p-2">
          <div className="h-1 w-full rounded bg-gray-200" />
          <div className="h-1 w-4/5 rounded bg-gray-100" />
          <div className="mt-2 h-8 w-full rounded bg-tenant-gray" />
        </div>
      </div>
    </div>
  );
}

export default function BanaagSectionContent() {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [page, setPage] = useState(1);

  const years = useMemo(() => getBanaagYears(), []);

  const filteredIssues = useMemo(() => {
    const searched = searchBanaagIssues(getAllBanaagIssues(), query);
    return filterBanaagByYear(searched, yearFilter);
  }, [query, yearFilter]);

  const grouped = useMemo(() => groupBanaagByYear(filteredIssues), [filteredIssues]);
  const sortedYears = useMemo(
    () => Object.keys(grouped).sort((a, b) => Number(b) - Number(a)),
    [grouped]
  );

  const flatForPagination = useMemo(() => {
    return sortedYears.flatMap((year) => grouped[year]);
  }, [sortedYears, grouped]);

  const pagination = useMemo(
    () => paginateBanaagIssues(flatForPagination, page, BANAAG_PAGE_SIZE),
    [flatForPagination, page]
  );

  const paginatedGrouped = useMemo(() => groupBanaagByYear(pagination.items), [pagination.items]);
  const paginatedYears = Object.keys(paginatedGrouped).sort((a, b) => Number(b) - Number(a));

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handleYearChange = (value: string) => {
    setYearFilter(value);
    setPage(1);
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-6 border-b border-gray-100 pb-8 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-tenant-navy text-white shadow-md">
            <BookOpen className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-tenant-navy md:text-3xl">BanAAg</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
              {language === "fil"
                ? "BanAAg publication — opisyal na balita, updates, accomplishments, at mga kwento tungkol sa Imus."
                : "BanAAg publication — official city government news, updates, accomplishments and stories about Imus."}
            </p>
          </div>
        </div>
        <MagazineIllustration />
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={
              language === "fil" ? "Maghanap ng mga isyu ng BanAAg..." : "Search BanAAg issues..."
            }
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm transition-shadow focus:border-tenant-navy focus:outline-none focus:ring-2 focus:ring-tenant-navy/20"
          />
        </div>
        <label className="sr-only" htmlFor="banaag-year-filter">
          {language === "fil" ? "Salain ayon sa taon" : "Filter by year"}
        </label>
        <select
          id="banaag-year-filter"
          value={yearFilter}
          onChange={(e) => handleYearChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-tenant-navy shadow-sm focus:border-tenant-navy focus:outline-none focus:ring-2 focus:ring-tenant-navy/20 sm:min-w-[160px]"
        >
          <option value="all">{language === "fil" ? "Lahat ng Taon" : "All Years"}</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {pagination.totalItems === 0 ? (
        <p className="py-16 text-center text-gray-500">
          {language === "fil" ? "Walang isyu na nahanap." : "No issues found."}
        </p>
      ) : (
        <div className="space-y-10">
          {paginatedYears.map((year) => (
            <section key={year} aria-labelledby={`banaag-year-${year}`}>
              <h3
                id={`banaag-year-${year}`}
                className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-tenant-navy/50"
              >
                {year} {language === "fil" ? "Mga Isyu" : "Issues"}
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {paginatedGrouped[year].map((issue) => (
                  <BanaagIssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <nav
          className="mt-10 flex items-center justify-end gap-2"
          aria-label={language === "fil" ? "Pagination ng BanAAg" : "BanAAg pagination"}
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={pagination.currentPage === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-tenant-navy transition-colors hover:bg-tenant-gray disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
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
                  ? "bg-tenant-navy text-white shadow-sm"
                  : "border border-gray-200 bg-white text-tenant-navy hover:bg-tenant-gray"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={pagination.currentPage === pagination.totalPages}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-tenant-navy transition-colors hover:bg-tenant-gray disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
          >
            {language === "fil" ? "Susunod" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
