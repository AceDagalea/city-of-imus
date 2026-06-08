import HeroSection from "@/components/home/HeroSection";
import QuickAccessBar from "@/components/home/QuickAccessBar";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import MayorMessageSection from "@/components/home/MayorMessageSection";
import NewsEventsSection from "@/components/home/NewsEventsSection";
import ProgressAnnouncementsRow from "@/components/home/ProgressAnnouncementsRow";
import WhyInvestSection from "@/components/home/WhyInvestSection";
import CityHallMap from "@/components/home/CityHallMap";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickAccessBar />
      <AnnouncementsSection />
      <NewsEventsSection />
      <MayorMessageSection />
      <ProgressAnnouncementsRow />
      <WhyInvestSection />
      <CityHallMap />
    </>
  );
}
