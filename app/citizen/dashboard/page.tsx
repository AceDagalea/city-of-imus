import Link from "next/link";
import { redirect } from "next/navigation";
import { FilePlus2 } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getFormBySlug } from "@/lib/forms";
import ConsoleShell from "@/components/console/ConsoleShell";
import StatusBadge from "@/components/console/StatusBadge";
import L from "@/components/console/L";
import { STRINGS } from "@/lib/i18n";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
}

export default async function CitizenDashboardPage() {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) redirect("/login");

  const submissions = await prisma.submission.findMany({
    where: { citizenId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <ConsoleShell
      title={STRINGS.citizenDashboardTitle}
      subtitle={STRINGS.citizenDashboardSubtitle}
      actions={
        <Link
          href="/forms"
          className="inline-flex items-center gap-1.5 rounded-lg bg-tenant-green px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-tenant-greenDark focus-ring"
        >
          <FilePlus2 className="h-3.5 w-3.5" aria-hidden="true" />
          <L s={STRINGS.newApplication} />
        </Link>
      }
    >
      {!user.verified && (
        <p className="mb-6 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800">
          <L s={STRINGS.verifyRequired} />
        </p>
      )}

      {submissions.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-card">
          <p className="text-sm text-gray-600">
            <L s={STRINGS.noApplications} />
          </p>
          <Link
            href="/forms"
            className="mt-4 inline-block rounded-lg bg-tenant-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tenant-navyDark focus-ring"
          >
            <L s={STRINGS.browseServices} />
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3.5"><L s={STRINGS.referenceNo} /></th>
                <th className="px-5 py-3.5"><L s={STRINGS.serviceLabel} /></th>
                <th className="px-5 py-3.5"><L s={STRINGS.statusLabel} /></th>
                <th className="px-5 py-3.5"><L s={STRINGS.submittedLabel} /></th>
                <th className="px-5 py-3.5"><L s={STRINGS.updatedLabel} /></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => {
                const form = getFormBySlug(s.formSlug);
                return (
                  <tr key={s.id} className="border-b border-gray-50 transition-colors hover:bg-tenant-sky/30">
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/citizen/applications/${s.referenceNo}`}
                        className="font-semibold text-tenant-navy underline decoration-tenant-navy/30 underline-offset-2 hover:text-tenant-green focus-ring rounded-sm"
                      >
                        {s.referenceNo}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-gray-700">
                      {form ? <L s={form.name} /> : s.formSlug}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{formatDate(s.createdAt)}</td>
                    <td className="px-5 py-3.5 text-gray-500">{formatDate(s.updatedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </ConsoleShell>
  );
}
