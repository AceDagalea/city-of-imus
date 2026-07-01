"use client";

import ContactActionCards from "@/components/contact/ContactActionCards";
import ContactDirectoryCta from "@/components/contact/ContactDirectoryCta";
import ContactHero from "@/components/contact/ContactHero";
import ContactMap from "@/components/contact/ContactMap";
import GetInTouchPanel from "@/components/contact/GetInTouchPanel";
import HotlinesSection from "@/components/contact/HotlinesSection";

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <div className="bg-tenant-gray">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-stretch">
            <GetInTouchPanel />
            <ContactMap />
          </div>

          <div className="mt-8">
            <ContactActionCards />
          </div>

          <div className="mt-12">
            <HotlinesSection />
          </div>

          <div className="mt-12">
            <ContactDirectoryCta />
          </div>
        </div>
      </div>
    </>
  );
}
