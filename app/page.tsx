import HeroSection from "@/components/home/HeroSection";
import QuickAccessBar from "@/components/home/QuickAccessBar";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import MayorMessageSection from "@/components/home/MayorMessageSection";
import NewsEventsSection from "@/components/home/NewsEventsSection";
import ProgressAnnouncementsRow from "@/components/home/ProgressAnnouncementsRow";
import WhyInvestSection from "@/components/home/WhyInvestSection";
import CityHallMap from "@/components/home/CityHallMap";
import TransparencySealBadge from "@/components/shared/TransparencySealBadge";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickAccessBar />
      <div className="border-b border-gray-100 bg-tenant-sky/30">
        <div className="mx-auto flex max-w-7xl justify-center px-4 py-6 md:px-6">
          <TransparencySealBadge />
        </div>
      </div>
      <AnnouncementsSection />
      <NewsEventsSection />
      <MayorMessageSection />
      <ProgressAnnouncementsRow />
      <WhyInvestSection />
      <CityHallMap />
    </>
  );
}
