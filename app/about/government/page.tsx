import type { Metadata } from "next";
import AboutGovernmentSection from "@/components/about/AboutGovernmentSection";
import GovernmentPageHero from "@/components/government/GovernmentPageHero";
import GovernmentPageLayout from "@/components/government/GovernmentPageLayout";
import { GOVERNMENT_HERO } from "@/lib/about";

export const metadata: Metadata = {
  title: "The City Government",
  description:
    "Meet the City Mayor and Sangguniang Panlungsod of Imus, Cavite — leadership committed to good governance and public service.",
};

export default function AboutGovernmentPage() {
  return (
    <div className="bg-imus-gray">
      <GovernmentPageHero
        title={GOVERNMENT_HERO.title}
        subtitle={GOVERNMENT_HERO.subtitle}
      />
      <GovernmentPageLayout activeId="government">
        <AboutGovernmentSection embedded />
      </GovernmentPageLayout>
    </div>
  );
}
