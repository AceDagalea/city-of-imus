import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getFormBySlug, getCategoryById } from "@/lib/forms";
import { canViewSubmission, canDecideSubmission, violatesSegregationOfDuties, isRole } from "@/lib/rbac";
import ConsoleShell from "@/components/console/ConsoleShell";
import StatusBadge from "@/components/console/StatusBadge";
import SubmissionDetail from "@/components/console/SubmissionDetail";
import StaffActions from "@/components/console/StaffActions";
import L from "@/components/console/L";
import { STRINGS } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function StaffSubmissionPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const user = session?.user;
  if (!user?.id || !isRole(user.role)) redirect("/login");

  const actor = {
    id: user.id,
    role: user.role,
    canApprove: user.canApprove,
    officeIds: user.officeIds,
  };

  const submission = await prisma.submission.findUnique({
    where: { id: params.id },
    include: {
      citizen: { select: { firstName: true, lastName: true, email: true, phone: true } },
      attachments: { orderBy: { uploadedAt: "asc" } },
      events: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!submission || !canViewSubmission(actor, submission)) notFound();

  const form = getFormBySlug(submission.formSlug);
  const office = getCategoryById(submission.officeId);
  const fields = JSON.parse(submission.fields) as Record<string, string>;
  const canDecide = canDecideSubmission(actor, submission);
  const sodBlocked = canDecide ? await violatesSegregationOfDuties(actor, submission.id) : false;

  return (
    <ConsoleShell
      title={form?.name ?? { en: submission.formSlug, fil: submission.formSlug }}
      actions={
        <Link
          href="/staff/queue"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-3 py-2 text-xs font-semibold text-white/85 transition-colors hover:bg-white/10 focus-ring"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <L s={STRINGS.backLabel} />
        </Link>
      }
    >
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl bg-white px-6 py-4 shadow-card text-sm">
        <span className="font-mono font-semibold text-tenant-navy">{submission.referenceNo}</span>
        <StatusBadge status={submission.status} />
        <span className="text-gray-500">
          <L s={STRINGS.officeLabel} />: <span className="font-medium text-gray-700">{office?.shortName ?? submission.officeId}</span>
        </span>
        <span className="text-gray-500">
          <L s={STRINGS.applicantLabel} />:{" "}
          <span className="font-medium text-gray-700">
            {submission.citizen.firstName} {submission.citizen.lastName}
          </span>{" "}
          · {submission.citizen.email}
          {submission.citizen.phone ? ` · ${submission.citizen.phone}` : ""}
        </span>
      </div>

      <section className="mb-6 rounded-xl bg-white p-6 shadow-card">
        <StaffActions
          submissionId={submission.id}
          status={submission.status}
          canDecide={canDecide}
          sodBlocked={sodBlocked}
        />
      </section>

      <SubmissionDetail
        fields={fields}
        attachments={submission.attachments}
        events={submission.events}
      />
    </ConsoleShell>
  );
}
