"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import DigitalServiceCard from "@/components/forms/digital/DigitalServiceCard";
import FormsSidebar from "@/components/forms/digital/FormsSidebar";
import DigitalFeaturesBar from "@/components/forms/digital/DigitalFeaturesBar";
import ServiceMiniLogo from "@/components/forms/digital/ServiceMiniLogo";
import {
  AUDIENCE_TABS,
  getFormsForAudience,
  type AudienceTabId,
} from "@/lib/digital-services";
import { AUDIENCE_ICON_STYLES } from "@/lib/service-icons";
import { HERO_IMAGE_URL } from "@/lib/constants";

export default function FormsPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as AudienceTabId | null;

  const [activeTab, setActiveTab] = useState<AudienceTabId>("citizens");

  useEffect(() => {
    if (tabParam && AUDIENCE_TABS.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const audienceForms = useMemo(() => getFormsForAudience(activeTab), [activeTab]);

  const activeTabMeta = AUDIENCE_TABS.find((t) => t.id === activeTab)!;
  const onlineCount = audienceForms.filter((f) => f.mode === "online").length;

  return (
    <div id="main-content">
      <section className="relative overflow-hidden bg-gradient-to-br from-imus-sky via-white to-imus-sky/40">
        <div className="absolute inset-0 opacity-[0.12]">
          <Image src={HERO_IMAGE_URL} alt="" fill className="object-cover" sizes="100vw" aria-hidden="true" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-imus-green">City Government of Imus</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-imus-navy md:text-5xl lg:text-[3.25rem]">
            Digital Services
          </h1>
          <p className="mt-4 max-w-xl text-base text-gray-600 md:text-lg">
            Skip the lines. Access government services online anytime, anywhere.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-4">
                <h2 className="font-heading text-xl font-bold text-imus-navy">Browse by Category</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Select a category to view available services.
                </p>
              </div>
              <div
                className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
                role="tablist"
                aria-label="Service categories"
              >
                {AUDIENCE_TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 text-center transition-all focus-ring ${
                        isActive
                          ? "border-imus-navy bg-imus-navy text-white shadow-card"
                          : "border-gray-100 bg-white text-imus-navy hover:border-imus-skyDark hover:bg-imus-sky/40"
                      }`}
                    >
                      <ServiceMiniLogo
                        style={AUDIENCE_ICON_STYLES[tab.id]}
                        size="sm"
                        active={isActive}
                        className={isActive ? "ring-white/40" : ""}
                      />
                      <span className="text-xs font-semibold leading-tight sm:text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div id="services-grid">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-imus-navy">
                      Services for {activeTabMeta.label.replace("For ", "")}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {audienceForms.length} services · {onlineCount} available online
                    </p>
                  </div>
                </div>

                {audienceForms.length > 0 ? (
                  <div className="grid gap-5 sm:grid-cols-2">
                    {audienceForms.map((form) => (
                      <DigitalServiceCard key={form.id} form={form} />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-gray-500">
                    No services found in this category.
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-4">
              <FormsSidebar />
            </div>
          </div>
        </div>
      </section>

      <DigitalFeaturesBar />
    </div>
  );
}
