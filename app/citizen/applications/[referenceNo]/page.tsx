import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getCategoryById, getFormBySlug } from "@/lib/forms";
import { getFormMeta } from "@/lib/digital-services";
import CitizenApplicationDetail from "@/components/citizen/CitizenApplicationDetail";

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

  if (!submission || (submission.citizenId !== user.id && user.role !== "ADMIN")) {
    notFound();
  }

  const form = getFormBySlug(submission.formSlug);
  const office = getCategoryById(submission.officeId);
  const fields = JSON.parse(submission.fields) as Record<string, string>;
  const title = form?.name ?? { en: submission.formSlug, fil: submission.formSlug };
  const meta = form ? getFormMeta(form) : { processingTime: "Varies" };

  return (
    <CitizenApplicationDetail
      referenceNo={submission.referenceNo}
      status={submission.status}
      formSlug={submission.formSlug}
      title={title}
      serviceShort={
        form?.name.en
          .replace(/\s+(Application|Request|Renewal).*$/i, "")
          .trim() ?? submission.formSlug
      }
      officeShort={office?.shortName ?? submission.officeId.toUpperCase()}
      officeName={office?.name ?? { en: submission.officeId, fil: submission.officeId }}
      processingTime={meta.processingTime}
      createdAt={submission.createdAt.toISOString()}
      fields={fields}
      attachments={submission.attachments.map((a) => ({
        id: a.id,
        filename: a.filename,
        uploadedAt: a.uploadedAt.toISOString(),
      }))}
      events={submission.events.map((e) => ({
        id: e.id,
        fromStatus: e.fromStatus,
        toStatus: e.toStatus,
        note: e.note,
        createdAt: e.createdAt.toISOString(),
      }))}
    />
  );
}
