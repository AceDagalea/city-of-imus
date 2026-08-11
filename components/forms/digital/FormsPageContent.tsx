"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import DigitalServiceCard from "@/components/forms/digital/DigitalServiceCard";
import FormsSidebar from "@/components/forms/digital/FormsSidebar";
import {
  AUDIENCE_TABS,
  getFormsForAudience,
  sortForms,
  type AudienceTabId,
  type ServiceSort,
} from "@/lib/digital-services";
import { AUDIENCE_ICON_STYLES } from "@/lib/service-icons";
import { STRINGS, t } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageContext";

const SORT_OPTIONS: { id: ServiceSort; labelKey: keyof typeof STRINGS }[] = [
  { id: "most-used", labelKey: "sortMostUsed" },
  { id: "az", labelKey: "sortAZ" },
  { id: "online", labelKey: "sortOnlineFirst" },
];

export default function FormsPageContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as AudienceTabId | null;
  const qParam = searchParams.get("q") ?? "";

  const [activeTab, setActiveTab] = useState<AudienceTabId>("citizens");
  const [query, setQuery] = useState(qParam);
  const [sort, setSort] = useState<ServiceSort>("most-used");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    if (tabParam && AUDIENCE_TABS.some((tab) => tab.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  const tabCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const tab of AUDIENCE_TABS) {
      map[tab.id] = getFormsForAudience(tab.id).length;
    }
    return map;
  }, []);

  const audienceForms = useMemo(() => {
    const base = getFormsForAudience(activeTab);
    const trimmed = query.trim().toLowerCase();
    const filtered = trimmed
      ? base.filter((f) => {
          const hay =
            `${f.name.en} ${f.name.fil} ${f.description.en} ${f.description.fil} ${f.slug}`.toLowerCase();
          return hay.includes(trimmed);
        })
      : base;
    return sortForms(filtered, sort);
  }, [activeTab, query, sort]);

  const activeTabMeta = AUDIENCE_TABS.find((tab) => tab.id === activeTab)!;
  const onlineCount = audienceForms.filter((f) => f.mode === "online").length;
  const listTitleAudience = activeTabMeta.label.replace(/^For\s+/i, "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="main-content" className="bg-[#f4f6fa]">
      <section className="bg-gradient-to-br from-[#12275c] to-[#1b3a86] text-white">
        <div className="mx-auto max-w-[1200px] px-6 pb-[30px] pt-[34px]">
          <nav className="mb-2.5 text-[12.5px] text-[#aebbe4]" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white focus-ring rounded-sm">
                  {t(STRINGS.crumbsHome, language)}
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-white/90">{t(STRINGS.crumbsServices, language)}</li>
            </ol>
          </nav>
          <h1 className="text-[30px] font-bold tracking-tight">{t(STRINGS.servicesTitle, language)}</h1>
          <p className="mt-1.5 text-[14.5px] text-[#b9c4e6]">{t(STRINGS.servicesSubtitle, language)}</p>

          <form
            onSubmit={handleSearch}
            className="mt-5 flex max-w-[560px] rounded-xl bg-white p-1.5 shadow-[0_10px_30px_rgba(6,15,45,.25)]"
          >
            <label htmlFor="service-search" className="sr-only">
              {t(STRINGS.search, language)}
            </label>
            <div className="flex flex-1 items-center gap-2 px-3.5">
              <Search className="h-4 w-4 shrink-0 text-[#6b7280]" aria-hidden="true" />
              <input
                id="service-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(STRINGS.servicesSearchPlaceholder, language)}
                className="w-full bg-transparent py-2.5 text-[14.5px] text-[#1c2333] outline-none placeholder:text-[#9ca3af]"
              />
            </div>
            <button
              type="submit"
              className="rounded-[9px] bg-[#1f9d55] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1a8748] focus-ring"
            >
              {t(STRINGS.search, language)}
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-7 px-6 py-7 pb-[50px] lg:grid-cols-[1fr_340px]">
        <div>
          <div>
            <h2 className="text-[19px] font-bold text-[#12275c]">
              {t(STRINGS.browseByCategory, language)}
            </h2>
            <p className="mt-0.5 text-[13px] text-[#6b7280]">
              {t(STRINGS.browseByCategorySub, language)}
            </p>
          </div>

          <div
            className="mb-6 mt-4 flex flex-wrap gap-3"
            role="tablist"
            aria-label={t(STRINGS.browseByCategory, language)}
          >
            {AUDIENCE_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const count = tabCounts[tab.id] ?? 0;
              const Icon = AUDIENCE_ICON_STYLES[tab.id]?.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-w-[120px] flex-1 rounded-xl border px-3.5 py-4 text-center transition-all duration-150 focus-ring ${
                    isActive
                      ? "border-[#12275c] bg-[#12275c] text-white shadow-[0_10px_22px_rgba(18,39,92,.28)]"
                      : "border-[#e7eaf0] bg-white hover:-translate-y-0.5 hover:border-[#2b57c4]"
                  }`}
                >
                  <span
                    className={`mx-auto mb-2.5 inline-flex h-[42px] w-[42px] items-center justify-center rounded-[11px] ${
                      isActive ? "bg-white/14 text-white" : "bg-[#eef2fb] text-[#2b57c4]"
                    }`}
                    aria-hidden="true"
                  >
                    {Icon ? <Icon className="h-5 w-5" strokeWidth={2.25} /> : null}
                  </span>
                  <span
                    className={`block text-[13.5px] font-semibold ${
                      isActive ? "text-white" : "text-[#1c2333]"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`mt-0.5 block text-[11.5px] ${
                      isActive ? "text-white/80" : "text-[#6b7280]"
                    }`}
                  >
                    {t(STRINGS.serviceCountLabel, language).replace("{count}", String(count))}
                  </span>
                </button>
              );
            })}
          </div>

          <div id="services-grid" className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-[19px] font-bold text-[#12275c]">
                {t(STRINGS.servicesForPrefix, language)} {listTitleAudience}
              </h3>
              <p className="mt-0.5 text-[13px] text-[#6b7280]">
                {t(STRINGS.servicesMetaLine, language).replace(
                  "{total}",
                  String(audienceForms.length)
                )}
                {" · "}
                <b className="font-semibold text-[#1f9d55]">
                  {t(STRINGS.servicesAvailableOnline, language).replace(
                    "{count}",
                    String(onlineCount)
                  )}
                </b>
              </p>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((o) => !o)}
                className="inline-flex items-center gap-1.5 rounded-[9px] border border-[#e7eaf0] bg-white px-3 py-2 text-[13px] text-[#4b5563] focus-ring"
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
              >
                {t(STRINGS[SORT_OPTIONS.find((o) => o.id === sort)!.labelKey], language)}
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              {sortOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 z-10 mt-1 min-w-[180px] overflow-hidden rounded-[9px] border border-[#e7eaf0] bg-white py-1 shadow-lg"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <li key={opt.id} role="option" aria-selected={sort === opt.id}>
                      <button
                        type="button"
                        className={`block w-full px-3 py-2 text-left text-[13px] hover:bg-[#eef2fb] ${
                          sort === opt.id ? "font-semibold text-[#12275c]" : "text-[#4b5563]"
                        }`}
                        onClick={() => {
                          setSort(opt.id);
                          setSortOpen(false);
                        }}
                      >
                        {t(STRINGS[opt.labelKey], language)}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {audienceForms.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {audienceForms.map((form) => (
                <DigitalServiceCard key={form.id} form={form} />
              ))}
            </div>
          ) : (
            <p className="rounded-[14px] border border-dashed border-[#e7eaf0] bg-white py-16 text-center text-[#6b7280]">
              {t(STRINGS.noServicesFound, language)}
              {query.trim() ? ` (“${query.trim()}”)` : ""}
            </p>
          )}
        </div>

        <FormsSidebar />
      </div>
    </div>
  );
}
