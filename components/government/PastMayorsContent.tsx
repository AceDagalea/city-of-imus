"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { PAST_MAYORS, PAST_MAYORS_IMAGE, PAST_MAYORS_SOURCE } from "@/lib/past-mayors";

export default function PastMayorsContent() {
  const { language } = useLanguage();

  return (
    <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card">
      <div className="border-b border-gray-100 px-6 py-5 md:px-8">
        <h2 className="font-heading text-xl font-bold text-imus-green md:text-2xl">
          {language === "fil" ? "Mga Dating Mayor" : "Past Mayors"}
        </h2>
      </div>

      <div className="relative aspect-[16/6] w-full bg-imus-gray">
        <Image
          src={PAST_MAYORS_IMAGE}
          alt="List of mayors of Imus"
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 70vw"
        />
      </div>

      <div className="overflow-x-auto p-4 md:p-6">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="bg-imus-navy text-left text-white">
              <th className="px-4 py-3 font-semibold">{language === "fil" ? "Pangalan" : "Name"}</th>
              <th className="px-4 py-3 font-semibold">
                {language === "fil" ? "Uri ng Pagkakatalaga" : "Status of Appointment"}
              </th>
              <th className="px-4 py-3 font-semibold">{language === "fil" ? "Taon" : "Year"}</th>
            </tr>
          </thead>
          <tbody>
            {PAST_MAYORS.map((row, index) => (
              <tr
                key={`${row.year}-${index}`}
                className={index % 2 === 0 ? "bg-white" : "bg-imus-gray/60"}
              >
                <td className="border-t border-gray-100 px-4 py-2.5 text-imus-navy">
                  {row.name ?? "—"}
                </td>
                <td className="border-t border-gray-100 px-4 py-2.5 text-gray-700">
                  {row.status ?? "—"}
                </td>
                <td className="border-t border-gray-100 px-4 py-2.5 text-gray-700">{row.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-xs text-gray-500">{PAST_MAYORS_SOURCE}</p>
      </div>
    </article>
  );
}
