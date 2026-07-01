import type { Metadata } from "next";
import DepartmentsHero from "@/components/government/DepartmentsHero";
import GovernmentExploreSidebar from "@/components/government/GovernmentExploreSidebar";
import DepartmentsTableSection from "@/components/government/DepartmentsTableSection";

export const metadata: Metadata = {
  title: "Departments and Units",
  description:
    "Directory of city departments, offices, and units of the City Government of Imus — heads of office, room numbers, and floor locations.",
};

export default function DepartmentsPage() {
  return (
    <div className="bg-tenant-gray">
      <DepartmentsHero />
      <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
          <GovernmentExploreSidebar activeId="departments" />
          <main className="min-w-0 max-w-full">
            <DepartmentsTableSection />
          </main>
        </div>
      </div>
    </div>
  );
}
