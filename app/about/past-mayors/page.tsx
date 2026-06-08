import type { Metadata } from "next";
import GovernmentPageHero from "@/components/government/GovernmentPageHero";
import GovernmentPageLayout from "@/components/government/GovernmentPageLayout";
import PastMayorsContent from "@/components/government/PastMayorsContent";
import { PAST_MAYORS_HERO } from "@/lib/past-mayors";

export const metadata: Metadata = {
  title: "Past Mayors",
  description:
    "Complete list of past municipal and city mayors who have served the City of Imus, Cavite.",
};

export default function PastMayorsPage() {
  return (
    <div className="bg-imus-gray">
      <GovernmentPageHero title={PAST_MAYORS_HERO.title} subtitle={PAST_MAYORS_HERO.subtitle} />
      <GovernmentPageLayout activeId="past-mayors">
        <PastMayorsContent />
      </GovernmentPageLayout>
    </div>
  );
}
