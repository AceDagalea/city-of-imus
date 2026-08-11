import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { parseOfficeIds } from "@/lib/rbac";
import { FORM_CATEGORIES } from "@/lib/forms";
import ConsoleShell from "@/components/console/ConsoleShell";
import UserAdmin from "@/components/console/UserAdmin";
import { ADMIN_TABS } from "@/components/console/adminTabs";
import { adminWho } from "@/components/console/adminWho";
import { STRINGS } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) redirect("/login");

  // Back-office accounts only — citizens are managed by their own self-service
  // flows, not this console.
  const users = await prisma.user.findMany({
    where: { role: { in: ["STAFF", "ADMIN"] } },
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
  });

  const rows = users.map((u) => ({
    id: u.id,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    role: u.role,
    canApprove: u.canApprove,
    officeIds: parseOfficeIds(u.officeIds),
    isActive: u.isActive,
    isSelf: u.id === user.id,
  }));

  const offices = FORM_CATEGORIES.map((c) => ({ id: c.id, shortName: c.shortName }));

  return (
    <ConsoleShell title={STRINGS.adminUsersTitle} tabs={ADMIN_TABS} {...adminWho(session)}>
      <UserAdmin users={rows} offices={offices} />
    </ConsoleShell>
  );
}
