import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getCategoryById, getFormBySlug } from "@/lib/forms";
import CitizenDashboard, {
  type CitizenApplicationRow,
} from "@/components/citizen/CitizenDashboard";

export const dynamic = "force-dynamic";

export default async function CitizenDashboardPage() {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) redirect("/login");

  const submissions = await prisma.submission.findMany({
    where: { citizenId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  const applications: CitizenApplicationRow[] = submissions.map((s) => {
    const form = getFormBySlug(s.formSlug);
    const office = form ? getCategoryById(form.categoryId) : undefined;
    return {
      id: s.id,
      referenceNo: s.referenceNo,
      formSlug: s.formSlug,
      status: s.status,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
      serviceName: form?.name ?? { en: s.formSlug, fil: s.formSlug },
      serviceDetail: office?.name ?? form?.description ?? { en: "City service", fil: "Serbisyo ng lungsod" },
    };
  });

  return (
    <CitizenDashboard applications={applications} verified={Boolean(user.verified)} />
  );
}
