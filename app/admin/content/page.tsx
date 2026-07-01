import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { tenantConfig } from "@/config/tenant.config";
import ConsoleShell from "@/components/console/ConsoleShell";
import L from "@/components/console/L";
import { ADMIN_TABS } from "@/components/console/adminTabs";
import { STRINGS } from "@/lib/i18n";

export const dynamic = "force-dynamic";

/**
 * Read-only surface for the non-form tenant config (contact info, hero copy,
 * hotlines, branding). A full editing UI is later-phase scope — for now this
 * makes the active configuration visible to Admins in one place.
 */
export default async function AdminContentPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const sections: { title: string; data: unknown }[] = [
    { title: "Identity", data: {
      lguType: tenantConfig.lguType,
      lguName: tenantConfig.lguName,
      province: tenantConfig.province,
      region: tenantConfig.region,
      psgcCode: tenantConfig.psgcCode,
      motto: tenantConfig.motto,
    } },
    { title: "Branding", data: tenantConfig.brand },
    { title: "Executive", data: tenantConfig.executive },
    { title: "Contact", data: tenantConfig.contact },
    { title: "Hero", data: tenantConfig.hero },
    { title: "Hotlines", data: tenantConfig.hotlines },
    { title: "Modules", data: tenantConfig.modules },
  ];

  return (
    <ConsoleShell title={STRINGS.adminContentTitle} tabs={ADMIN_TABS}>
      <p className="mb-6 rounded-lg border border-gov-blue/15 bg-gov-blue/5 px-4 py-3 text-sm text-gov-blueDark">
        <L s={STRINGS.contentReadOnlyNote} />
      </p>

      <div className="space-y-4">
        {sections.map((section) => (
          <details key={section.title} className="group rounded-xl bg-white shadow-card">
            <summary className="cursor-pointer list-none px-6 py-4 text-sm font-bold text-tenant-navy focus-ring rounded-xl">
              {section.title}
            </summary>
            <pre className="overflow-x-auto border-t border-gray-100 px-6 py-4 text-xs leading-relaxed text-gray-700">
              {JSON.stringify(section.data, null, 2)}
            </pre>
          </details>
        ))}
      </div>
    </ConsoleShell>
  );
}
