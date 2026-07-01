import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { FORM_CATEGORIES, CITY_FORMS } from "@/lib/forms";
import ConsoleShell from "@/components/console/ConsoleShell";
import L from "@/components/console/L";
import { ADMIN_TABS } from "@/components/console/adminTabs";
import { STRINGS } from "@/lib/i18n";

export const dynamic = "force-dynamic";

/**
 * Read-only view of the office/category catalog. Offices are still
 * config-seeded (master plan §5.1) — full DB-backed CRUD is Phase 7 scope.
 */
export default async function AdminOfficesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <ConsoleShell title={STRINGS.adminOfficesTitle} tabs={ADMIN_TABS}>
      <p className="mb-6 rounded-lg border border-gov-blue/15 bg-gov-blue/5 px-4 py-3 text-sm text-gov-blueDark">
        <L s={STRINGS.officesReadOnlyNote} />
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FORM_CATEGORIES.map((office) => {
          const formCount = CITY_FORMS.filter((f) => f.categoryId === office.id).length;
          return (
            <div key={office.id} className="rounded-xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-tenant-navy/10 px-2.5 py-0.5 text-xs font-bold text-tenant-navy">
                  {office.shortName}
                </span>
                <span className="text-xs text-gray-400">
                  {formCount} <L s={{ en: "form(s)", fil: "form(s)" }} />
                </span>
              </div>
              <h2 className="mt-3 font-bold text-tenant-navy">
                <L s={office.name} />
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                <L s={office.description} />
              </p>
              <p className="mt-3 text-xs text-gray-400">
                <L s={office.office} />
              </p>
            </div>
          );
        })}
      </div>
    </ConsoleShell>
  );
}
