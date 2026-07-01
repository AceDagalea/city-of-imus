import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getFormBySlug, getCategoryById } from "@/lib/forms";
import ConsoleShell from "@/components/console/ConsoleShell";
import StatusBadge from "@/components/console/StatusBadge";
import L from "@/components/console/L";
import { STRINGS } from "@/lib/i18n";
import { SUBMISSION_STATUSES, isSubmissionStatus } from "@/lib/workflow";

export const dynamic = "force-dynamic";

function ageInDays(date: Date) {
  return Math.floor((Date.now() - date.getTime()) / (24 * 60 * 60 * 1000));
}

export default async function StaffQueuePage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) redirect("/login");

  // Office scoping: staff only see submissions for their assigned offices;
  // admins see everything.
  const officeFilter =
    user.role === "ADMIN" ? {} : { officeId: { in: user.officeIds.length ? user.officeIds : ["–none–"] } };
  const statusFilter =
    searchParams.status && isSubmissionStatus(searchParams.status)
      ? { status: searchParams.status }
      : {};

  const submissions = await prisma.submission.findMany({
    where: { ...officeFilter, ...statusFilter },
    include: { citizen: { select: { firstName: true, lastName: true } } },
    orderBy: [{ status: "asc" }, { createdAt: "asc" }],
  });

  // Group by status, oldest first within each group (queue discipline).
  const groups = SUBMISSION_STATUSES.map((status) => ({
    status,
    items: submissions.filter((s) => s.status === status),
  })).filter((g) => g.items.length > 0);

  return (
    <ConsoleShell title={STRINGS.staffQueueTitle} subtitle={STRINGS.staffQueueSubtitle}>
      {/* Status filter */}
      <nav aria-label="Status filter" className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/staff/queue"
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-ring ${
            !searchParams.status ? "bg-tenant-navy text-white" : "bg-white text-tenant-navy shadow-sm hover:bg-tenant-sky"
          }`}
        >
          <L s={STRINGS.allStatusesLabel} />
        </Link>
        {SUBMISSION_STATUSES.filter((s) => s !== "DRAFT").map((status) => (
          <Link
            key={status}
            href={`/staff/queue?status=${status}`}
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

      {groups.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-card">
          <p className="text-sm text-gray-600">
            <L s={STRINGS.queueEmpty} />
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.status}>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-tenant-navy">
                <StatusBadge status={group.status} />
                <span className="text-gray-400">({group.items.length})</span>
              </h2>
              <div className="overflow-x-auto rounded-xl bg-white shadow-card">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                      <th className="px-5 py-3.5"><L s={STRINGS.referenceNo} /></th>
                      <th className="px-5 py-3.5"><L s={STRINGS.serviceLabel} /></th>
                      <th className="px-5 py-3.5"><L s={STRINGS.officeLabel} /></th>
                      <th className="px-5 py-3.5"><L s={STRINGS.applicantLabel} /></th>
                      <th className="px-5 py-3.5"><L s={STRINGS.ageLabel} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((s) => {
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
                          <td className="px-5 py-3.5 text-gray-700">
                            {form ? <L s={form.name} /> : s.formSlug}
                          </td>
                          <td className="px-5 py-3.5 text-gray-500">{office?.shortName ?? s.officeId}</td>
                          <td className="px-5 py-3.5 text-gray-700">
                            {s.citizen.firstName} {s.citizen.lastName}
                          </td>
                          <td className="px-5 py-3.5 text-gray-500">
                            {ageInDays(s.createdAt)} <L s={STRINGS.daysLabel} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}
    </ConsoleShell>
  );
}
