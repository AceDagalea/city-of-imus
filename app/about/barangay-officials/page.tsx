import type { Metadata } from "next";
import BarangayOfficialsContent from "@/components/government/BarangayOfficialsContent";
import GovernmentPageHero from "@/components/government/GovernmentPageHero";
import GovernmentPageLayout from "@/components/government/GovernmentPageLayout";
import { BARANGAY_HERO } from "@/lib/barangay";

export const metadata: Metadata = {
  title: "Barangay Officials",
  description:
    "Directory of barangay captains across all clusters in the City of Imus, Cavite.",
};

export default function BarangayOfficialsPage() {
  return (
    <div className="bg-tenant-gray">
      <GovernmentPageHero title={BARANGAY_HERO.title} subtitle={BARANGAY_HERO.subtitle} />
      <GovernmentPageLayout activeId="barangay">
        <BarangayOfficialsContent />
      </GovernmentPageLayout>
    </div>
  );
}
