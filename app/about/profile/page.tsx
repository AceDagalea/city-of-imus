import type { Metadata } from "next";
import CityProfileContent from "@/components/government/CityProfileContent";
import GovernmentPageHero from "@/components/government/GovernmentPageHero";
import GovernmentPageLayout from "@/components/government/GovernmentPageLayout";
import { CITY_PROFILE_HERO } from "@/lib/city-profile";

export const metadata: Metadata = {
  title: "City Profile",
  description:
    "City profile of Imus, Cavite — population, vision, mission, and heritage as the Flag Capital of the Philippines.",
};

export default function CityProfilePage() {
  return (
    <div className="bg-imus-gray">
      <GovernmentPageHero
        title={CITY_PROFILE_HERO.title}
        subtitle={CITY_PROFILE_HERO.subtitle}
      />
      <GovernmentPageLayout activeId="profile">
        <CityProfileContent />
      </GovernmentPageLayout>
    </div>
  );
}
