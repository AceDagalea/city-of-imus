import type { Metadata } from "next";
import GovernmentPageHero from "@/components/government/GovernmentPageHero";
import GovernmentPageLayout from "@/components/government/GovernmentPageLayout";
import HistoryContent from "@/components/government/HistoryContent";
import { HISTORY_HERO } from "@/lib/history";

export const metadata: Metadata = {
  title: "History",
  description:
    "History of Imus, Cavite — from its roots as a visita of Cavite Viejo to the Flag Capital of the Philippines.",
};

export default function HistoryPage() {
  return (
    <div className="bg-tenant-gray">
      <GovernmentPageHero title={HISTORY_HERO.title} subtitle={HISTORY_HERO.subtitle} />
      <GovernmentPageLayout activeId="history">
        <HistoryContent />
      </GovernmentPageLayout>
    </div>
  );
}
