import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getFormBySlug, getCategoryById, FORM_CATEGORIES } from "@/lib/forms";
import ConsoleShell from "@/components/console/ConsoleShell";
import StatusBadge from "@/components/console/StatusBadge";
import L from "@/components/console/L";
import { ADMIN_TABS } from "@/components/console/adminTabs";
import { STRINGS } from "@/lib/i18n";
import { SUBMISSION_STATUSES, isSubmissionStatus } from "@/lib/workflow";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
}

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: { status?: string; office?: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const officeIds = new Set(FORM_CATEGORIES.map((c) => c.id));
  const where = {
    ...(searchParams.status && isSubmissionStatus(searchParams.status)
      ? { status: searchParams.status }
      : {}),
    ...(searchParams.office && officeIds.has(searchParams.office)
      ? { officeId: searchParams.office }
      : {}),
  };

  const submissions = await prisma.submission.findMany({
    where,
    include: { citizen: { select: { firstName: true, lastName: true } } },
    orderBy: { updatedAt: "desc" },
    take: 200,
  });

  function filterHref(next: { status?: string; office?: string }) {
    const params = new URLSearchParams();
    const status = "status" in next ? next.status : searchParams.status;
    const office = "office" in next ? next.office : searchParams.office;
    if (status) params.set("status", status);
    if (office) params.set("office", office);
    const qs = params.toString();
    return `/admin/submissions${qs ? `?${qs}` : ""}`;
  }

  return (
    <ConsoleShell title={STRINGS.adminSubmissionsTitle} tabs={ADMIN_TABS}>
      {/* Filters */}
      <div className="mb-6 space-y-3">
        <nav aria-label="Status filter" className="flex flex-wrap gap-2">
          <Link
            href={filterHref({ status: undefined })}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-ring ${
              !searchParams.status ? "bg-tenant-navy text-white" : "bg-white text-tenant-navy shadow-sm hover:bg-tenant-sky"
            }`}
          >
            <L s={STRINGS.allStatusesLabel} />
          </Link>
          {SUBMISSION_STATUSES.filter((s) => s !== "DRAFT").map((status) => (
            <Link
              key={status}
              href={filterHref({ status })}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-ring ${
                searchParams.status === status
                  ? "bg-tenant-navy text-white"
                  : "bg-white text-tenant-navy shadow-sm hover:bg-tenant-sky"
              }`}
            >
              {status.replace(/_/g, " ")}
            </Link>
          ))}
        </nav>
        <nav aria-label="Office filter" className="flex flex-wrap gap-2">
          <Link
            href={filterHref({ office: undefined })}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-ring ${
              !searchParams.office ? "bg-tenant-green text-white" : "bg-white text-tenant-navy shadow-sm hover:bg-tenant-sky"
            }`}
          >
            <L s={STRINGS.allOffices} />
          </Link>
          {FORM_CATEGORIES.map((office) => (
            <Link
              key={office.id}
              href={filterHref({ office: office.id })}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-ring ${
                searchParams.office === office.id
                  ? "bg-tenant-green text-white"
                  : "bg-white text-tenant-navy shadow-sm hover:bg-tenant-sky"
              }`}
            >
              {office.shortName}
            </Link>
          ))}
        </nav>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
              <th className="px-5 py-3.5"><L s={STRINGS.referenceNo} /></th>
              <th className="px-5 py-3.5"><L s={STRINGS.serviceLabel} /></th>
              <th className="px-5 py-3.5"><L s={STRINGS.officeLabel} /></th>
              <th className="px-5 py-3.5"><L s={STRINGS.applicantLabel} /></th>
              <th className="px-5 py-3.5"><L s={STRINGS.statusLabel} /></th>
              <th className="px-5 py-3.5"><L s={STRINGS.updatedLabel} /></th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-gray-500">
                  <L s={STRINGS.queueEmpty} />
                </td>
              </tr>
            ) : (
              submissions.map((s) => {
                const form = getFormBySlug(s.formSlug);
                const office = getCategoryById(s.officeId);
                return (
                  <tr key={s.id} className="border-b border-gray-50 transition-colors hover:bg-tenant-sky/30">
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/staff/submissions/${s.id}`}
                        className="font-semibold text-tenant-navy underline decoration-tenant-navy/30 underline-offset-2 hover:text-tenant-green focus-ring rounded-sm"
                      >
                        {s.referenceNo}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-gray-700">{form ? <L s={form.name} /> : s.formSlug}</td>
                    <td className="px-5 py-3.5 text-gray-500">{office?.shortName ?? s.officeId}</td>
                    <td className="px-5 py-3.5 text-gray-700">
                      {s.citizen.firstName} {s.citizen.lastName}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{formatDate(s.updatedAt)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </ConsoleShell>
  );
}
