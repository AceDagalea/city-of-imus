import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutIntroSection from "@/components/about/AboutIntroSection";
import AboutStatsSection from "@/components/about/AboutStatsSection";
import AboutVisionMission from "@/components/about/AboutVisionMission";
import AboutNewsSection from "@/components/about/AboutNewsSection";

export const metadata: Metadata = {
  title: "About Imus",
  description:
    "Learn about the City of Imus, Cavite — Flag Capital of the Philippines. Population, vision, mission, and latest news.",
};

export default function AboutPage() {
  return (
    <div className="bg-tenant-gray">
      <AboutHero />
      <AboutIntroSection />
      <AboutStatsSection />
      <AboutVisionMission />
      <AboutNewsSection />
    </div>
  );
}
