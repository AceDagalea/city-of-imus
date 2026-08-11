import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getFormBySlug, getCategoryById, FORM_CATEGORIES } from "@/lib/forms";
import ConsoleShell from "@/components/console/ConsoleShell";
import AdminSubmissionsPanel from "@/components/console/AdminSubmissionsPanel";
import { ADMIN_TABS } from "@/components/console/adminTabs";
import { adminWho } from "@/components/console/adminWho";
import { STRINGS } from "@/lib/i18n";
import { SUBMISSION_STATUSES, isSubmissionStatus } from "@/lib/workflow";

export const dynamic = "force-dynamic";

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
      : { status: { not: "DRAFT" } }),
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

  const rows = submissions.map((s) => {
    const form = getFormBySlug(s.formSlug);
    const office = getCategoryById(s.officeId);
    return {
      id: s.id,
      referenceNo: s.referenceNo,
      formSlug: s.formSlug,
      serviceName: form?.name ?? { en: s.formSlug, fil: s.formSlug },
      officeId: s.officeId,
      officeShort: office?.shortName ?? s.officeId.toUpperCase(),
      status: s.status,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
      citizenFirst: s.citizen.firstName,
      citizenLast: s.citizen.lastName,
    };
  });

  return (
    <ConsoleShell title={STRINGS.adminSubmissionsTitle} tabs={ADMIN_TABS} {...adminWho(session)}>
      <AdminSubmissionsPanel
        rows={rows}
        offices={FORM_CATEGORIES.map((c) => ({ id: c.id, shortName: c.shortName }))}
        statusFilter={searchParams.status}
        officeFilter={searchParams.office}
        statusOptions={SUBMISSION_STATUSES.filter(
          (s) => !["DRAFT", "READY_FOR_RELEASE"].includes(s)
        )}
      />
    </ConsoleShell>
  );
}
