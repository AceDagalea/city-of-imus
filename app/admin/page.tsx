import Link from "next/link";
import { redirect } from "next/navigation";
import { Users, Inbox, Building2, FileCog } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import ConsoleShell from "@/components/console/ConsoleShell";
import { ADMIN_TABS } from "@/components/console/adminTabs";
import L from "@/components/console/L";
import { STRINGS } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [userCount, submissionCount, pendingCount] = await Promise.all([
    prisma.user.count(),
    prisma.submission.count(),
    prisma.submission.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW", "NEEDS_INFO"] } } }),
  ]);

  const cards = [
    {
      href: "/admin/users",
      icon: Users,
      label: STRINGS.adminUsersTitle,
      value: userCount,
    },
    {
      href: "/admin/submissions",
      icon: Inbox,
      label: STRINGS.adminSubmissionsTitle,
      value: `${submissionCount} (${pendingCount} pending)`,
    },
    {
      href: "/admin/offices",
      icon: Building2,
      label: STRINGS.adminOfficesTitle,
      value: "",
    },
    {
      href: "/admin/content",
      icon: FileCog,
      label: STRINGS.adminContentTitle,
      value: "",
    },
  ];

  return (
    <ConsoleShell title={STRINGS.adminDashboardTitle} tabs={ADMIN_TABS}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-float focus-ring"
          >
            <card.icon className="h-6 w-6 text-tenant-green" aria-hidden="true" />
            <p className="mt-3 text-sm font-bold text-tenant-navy">
              <L s={card.label} />
            </p>
            {card.value !== "" && <p className="mt-1 text-xs text-gray-500">{card.value}</p>}
          </Link>
        ))}
      </div>
    </ConsoleShell>
  );
}
