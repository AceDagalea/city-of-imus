"use client";

import Link from "next/link";

interface YearFilterTabsProps {
  basePath: string;
  paramName: string;
  activeValue: string;
  options: { value: string; label: string; count?: number }[];
}

export default function YearFilterTabs({
  basePath,
  paramName,
  activeValue,
  options,
}: YearFilterTabsProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = activeValue === option.value;
        const href =
          option.value === options[0]?.value
            ? basePath
            : `${basePath}?${paramName}=${encodeURIComponent(option.value)}`;

        return (
          <Link
            key={option.value}
            href={href}
            scroll={false}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors focus-ring ${
              isActive
                ? "bg-tenant-navy font-semibold text-white"
                : "border border-tenant-navy text-tenant-navy hover:bg-tenant-gray"
            }`}
          >
            {option.label}
            {option.count !== undefined ? ` (${option.count})` : ""}
          </Link>
        );
      })}
    </div>
  );
}
