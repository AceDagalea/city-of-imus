"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, DoorOpen, Landmark, Search } from "lucide-react";
import GridPagination from "@/components/full-disclosure/GridPagination";
import { useLanguage } from "@/context/LanguageContext";
import {
  DEPARTMENT_FLOOR_ORDER,
  DEPARTMENT_PAGE_SIZE,
  DEPARTMENTS,
  filterDepartments,
  getDepartmentIconStyle,
  type DepartmentFloorFilter,
} from "@/lib/departments";

export default function DepartmentsTableSection() {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [floor, setFloor] = useState<DepartmentFloorFilter>("All Floors");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterDepartments(DEPARTMENTS, query, floor),
    [query, floor]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / DEPARTMENT_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * DEPARTMENT_PAGE_SIZE,
    currentPage * DEPARTMENT_PAGE_SIZE
  );

  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * DEPARTMENT_PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * DEPARTMENT_PAGE_SIZE, filtered.length);

  return (
    <div className="min-w-0">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-imus-green/15 text-imus-greenDark">
          <Building2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-imus-navy">
            {language === "fil" ? "Mga Departamento at Yunit" : "Departments and Units"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {language === "fil"
              ? "Mag-click sa isang tanggapan upang tingnan ang mga function at citizen's charter nito."
              : "Click an office to view its functions and citizen's charter."}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">
            {language === "fil" ? "Maghanap ng tanggapan" : "Search office, department, or official"}
          </span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={
              language === "fil"
                ? "Maghanap ng tanggapan, departamento, o opisyal..."
                : "Search office, department, or official..."
            }
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-imus-navy shadow-sm outline-none focus:border-imus-green focus:ring-2 focus:ring-imus-green/20"
          />
        </label>

        <label className="sm:w-48">
          <span className="sr-only">{language === "fil" ? "I-filter ayon sa palapag" : "Filter by floor"}</span>
          <select
            value={floor}
            onChange={(e) => {
              setFloor(e.target.value as DepartmentFloorFilter);
              setPage(1);
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-imus-navy shadow-sm focus:border-imus-green focus:outline-none focus:ring-2 focus:ring-imus-green/20"
          >
            {DEPARTMENT_FLOOR_ORDER.map((option) => (
              <option key={option} value={option}>
                {option === "All Floors"
                  ? language === "fil"
                    ? "Lahat ng Palapag"
                    : "All Floors"
                  : option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {DEPARTMENT_FLOOR_ORDER.map((option) => {
          const isActive = floor === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                setFloor(option);
                setPage(1);
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-ring ${
                isActive
                  ? "bg-imus-navy text-white shadow-sm"
                  : "border border-gray-200 bg-white text-imus-navy hover:border-imus-green/40 hover:bg-imus-gray"
              }`}
            >
              {option === "All Floors"
                ? language === "fil"
                  ? "Lahat ng Palapag"
                  : "All Floors"
                : option}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-imus-navy text-xs font-bold uppercase tracking-wider text-white">
                <th className="px-4 py-3 md:px-5">
                  {language === "fil" ? "Departamento / Yunit" : "Department / Unit"}
                </th>
                <th className="px-4 py-3 md:px-5">
                  {language === "fil" ? "Pinuno ng Tanggapan" : "Head of Office"}
                </th>
                <th className="px-4 py-3 md:px-5">
                  {language === "fil" ? "Room No." : "Room No."}
                </th>
                <th className="px-4 py-3 md:px-5">{language === "fil" ? "Palapag" : "Floor"}</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-gray-500">
                    {language === "fil"
                      ? "Walang tumugmang tanggapan sa iyong hinahanap."
                      : "No departments match your search."}
                  </td>
                </tr>
              ) : (
                pageItems.map((dept, index) => {
                  const iconStyle = getDepartmentIconStyle(dept.id);
                  const rowBg = index % 2 === 0 ? "bg-white" : "bg-imus-gray/60";

                  return (
                    <tr key={dept.id} className={`${rowBg} border-t border-gray-100`}>
                      <td className="px-4 py-3.5 md:px-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconStyle.bg}`}
                          >
                            <Landmark className={`h-4 w-4 ${iconStyle.color}`} aria-hidden="true" />
                          </div>
                          {dept.detailUrl ? (
                            <a
                              href={dept.detailUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-imus-navy hover:text-imus-green focus-ring rounded-sm"
                            >
                              {dept.name}
                            </a>
                          ) : (
                            <span className="font-semibold text-imus-navy">{dept.name}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-700 md:px-5">{dept.headOfOffice}</td>
                      <td className="px-4 py-3.5 text-gray-700 md:px-5">
                        <span className="inline-flex items-center gap-1.5">
                          <DoorOpen className="h-3.5 w-3.5 text-imus-navy/50" aria-hidden="true" />
                          {dept.room}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-gray-700 md:px-5">
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-imus-green" aria-hidden="true" />
                          {dept.floor}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="border-t border-gray-100 px-4 py-3 md:px-5">
            <p className="mb-3 text-sm text-gray-500">
              {language === "fil"
                ? `Ipinapakita ang ${rangeStart}–${rangeEnd} ng ${filtered.length} departamento`
                : `Showing ${rangeStart} to ${rangeEnd} of ${filtered.length} departments`}
            </p>
            <GridPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              label={language === "fil" ? "Pagination ng departamento" : "Departments pagination"}
            />
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-gray-400">
        {language === "fil" ? "Source: " : "Source: "}
        <Link
          href="https://www.cityofimus.gov.ph/departments-and-units.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-imus-green hover:underline focus-ring rounded-sm"
        >
          cityofimus.gov.ph/departments-and-units
        </Link>
      </p>
    </div>
  );
}
