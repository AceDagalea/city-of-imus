import type { Metadata } from "next";
import GovernmentExploreSidebar from "@/components/government/GovernmentExploreSidebar";
import MayorAgendaSection from "@/components/government/MayorAgendaSection";
import MayorBioSection from "@/components/government/MayorBioSection";
import MayorProfileHero from "@/components/government/MayorProfileHero";

export const metadata: Metadata = {
  title: "City Mayor",
  description:
    'Profile of Hon. Alex "AA" L. Advincula, City Mayor of Imus, Cavite — biography and Eight-Point Agenda.',
};

export default function MayorPage() {
  return (
    <div className="bg-imus-gray">
      <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
          <GovernmentExploreSidebar activeId="mayor" variant="mayor" />
          <main className="min-w-0 max-w-full">
            <MayorProfileHero />
            <MayorBioSection />
            <MayorAgendaSection />
          </main>
        </div>
      </div>
    </div>
  );
}
