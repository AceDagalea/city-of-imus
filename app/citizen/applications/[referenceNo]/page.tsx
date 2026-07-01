import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getFormBySlug } from "@/lib/forms";
import ConsoleShell from "@/components/console/ConsoleShell";
import StatusBadge from "@/components/console/StatusBadge";
import SubmissionDetail from "@/components/console/SubmissionDetail";
import RespondForm from "@/components/console/RespondForm";
import L from "@/components/console/L";
import { STRINGS } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function CitizenApplicationPage({
  params,
}: {
  params: { referenceNo: string };
}) {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) redirect("/login");

  const submission = await prisma.submission.findUnique({
    where: { referenceNo: params.referenceNo },
    include: {
      attachments: { orderBy: { uploadedAt: "asc" } },
      events: { orderBy: { createdAt: "asc" } },
    },
  });

  // Citizens can only see their own submissions (admins may inspect too).
  if (!submission || (submission.citizenId !== user.id && user.role !== "ADMIN")) {
    notFound();
  }

  const form = getFormBySlug(submission.formSlug);
  const fields = JSON.parse(submission.fields) as Record<string, string>;

  return (
    <ConsoleShell
      title={form?.name ?? { en: submission.formSlug, fil: submission.formSlug }}
      actions={
        <Link
          href="/citizen/dashboard"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-3 py-2 text-xs font-semibold text-white/85 transition-colors hover:bg-white/10 focus-ring"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <L s={STRINGS.backLabel} />
        </Link>
      }
    >
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-card">
        <span className="font-mono text-sm font-semibold text-tenant-navy">{submission.referenceNo}</span>
        <StatusBadge status={submission.status} />
      </div>

      {submission.status === "NEEDS_INFO" && (
        <section className="mb-6 rounded-xl border border-orange-200 bg-orange-50/60 p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-orange-800">
            <L s={STRINGS.respondTitle} />
          </h2>
          <div className="mt-4">
            <RespondForm referenceNo={submission.referenceNo} />
          </div>
        </section>
      )}

      <SubmissionDetail
        fields={fields}
        attachments={submission.attachments}
        events={submission.events}
      />
    </ConsoleShell>
  );
}
