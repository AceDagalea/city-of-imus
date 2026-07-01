"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getPaginationPages } from "@/lib/pagination";

interface GridPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  label: string;
}

export default function GridPagination({
  currentPage,
  totalPages,
  onPageChange,
  label,
}: GridPaginationProps) {
  const { language } = useLanguage();

  if (totalPages <= 1) return null;

  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <nav
      className="mt-10 flex w-full max-w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      aria-label={label}
    >
      <p className="text-sm text-gray-500">
        {language === "fil"
          ? `Pahina ${currentPage} ng ${totalPages}`
          : `Page ${currentPage} of ${totalPages}`}
      </p>

      <div className="flex max-w-full flex-wrap items-center justify-end gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-sm font-medium text-tenant-navy transition-colors hover:bg-tenant-gray disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{language === "fil" ? "Nakaraan" : "Previous"}</span>
        </button>

        {pages.map((token, index) =>
          token === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-sm text-gray-400"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={token}
              type="button"
              onClick={() => onPageChange(token)}
              aria-current={token === currentPage ? "page" : undefined}
              className={`min-w-[2.25rem] rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors focus-ring ${
                token === currentPage
                  ? "bg-tenant-navy text-white shadow-sm"
                  : "border border-gray-200 bg-white text-tenant-navy hover:bg-tenant-gray"
              }`}
            >
              {token}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-sm font-medium text-tenant-navy transition-colors hover:bg-tenant-gray disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
        >
          <span className="hidden sm:inline">{language === "fil" ? "Susunod" : "Next"}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}
