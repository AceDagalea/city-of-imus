"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BARANGAY_CLUSTERS } from "@/lib/barangay";

export default function BarangayOfficialsContent() {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");

  const filteredClusters = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BARANGAY_CLUSTERS;
    return BARANGAY_CLUSTERS.map((cluster) => ({
      ...cluster,
      officials: cluster.officials.filter(
        (o) =>
          o.barangay.toLowerCase().includes(q) || o.captain.toLowerCase().includes(q)
      ),
    })).filter((cluster) => cluster.officials.length > 0);
  }, [query]);

  return (
    <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card">
      <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <h2 className="font-heading text-xl font-bold text-tenant-green md:text-2xl">
          {language === "fil" ? "Mga Opisyal ng Barangay" : "Barangay Officials"}
        </h2>
        <label className="relative w-full sm:max-w-xs">
          <span className="sr-only">{language === "fil" ? "Maghanap" : "Search"}</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === "fil" ? "Maghanap ng barangay..." : "Search barangay..."}
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-tenant-green focus:outline-none focus:ring-2 focus:ring-tenant-green/20"
          />
        </label>
      </div>

      <div className="overflow-x-auto p-4 md:p-6">
        {filteredClusters.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            {language === "fil" ? "Walang resulta." : "No results found."}
          </p>
        ) : (
          filteredClusters.map((cluster) => (
            <div key={cluster.id} className="mb-8 last:mb-0">
              <p className="rounded-t-lg bg-tenant-navy px-4 py-2.5 text-center text-sm font-semibold text-white">
                {cluster.name}
              </p>
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="bg-tenant-green text-left text-white">
                    <th className="px-4 py-2.5 font-semibold">
                      {language === "fil" ? "Barangay" : "Barangay"}
                    </th>
                    <th className="px-4 py-2.5 font-semibold">
                      {language === "fil" ? "Kapitan ng Barangay" : "Barangay Captain"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cluster.officials.map((official) => (
                    <tr key={`${cluster.id}-${official.barangay}`} className="odd:bg-white even:bg-tenant-gray/50">
                      <td className="border-t border-gray-100 px-4 py-2.5 font-medium text-tenant-navy">
                        {official.barangay}
                      </td>
                      <td className="border-t border-gray-100 px-4 py-2.5 text-gray-700">
                        {official.captain}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </article>
  );
}
