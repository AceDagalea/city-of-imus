import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Inbox,
  Plus,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import ConsoleShell from "@/components/console/ConsoleShell";
import StatusBadge from "@/components/console/StatusBadge";
import L from "@/components/console/L";
import { ADMIN_TABS } from "@/components/console/adminTabs";
import { adminWho } from "@/components/console/adminWho";
import { getFormBySlug } from "@/lib/forms";
import { STRINGS, t } from "@/lib/i18n";
import { STATUS_META, isSubmissionStatus } from "@/lib/workflow";

export const dynamic = "force-dynamic";

const AVATAR_TONES = [
  "bg-[#eef2fb] text-[#2b57c4]",
  "bg-[#e7f6ee] text-[#1f9d55]",
  "bg-[#fdf4e3] text-[#b7791f]",
  "bg-[#fdecea] text-[#c0392b]",
  "bg-[#f0ecfb] text-[#6b46c1]",
];

function initials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
}

function relativeTime(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return mins <= 1 ? "Just now" : `${mins} minutes ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return formatDate(date);
}

function actionLabel(status: string) {
  return status === "SUBMITTED" || status === "UNDER_REVIEW" || status === "NEEDS_INFO"
    ? STRINGS.adminReviewAction
    : STRINGS.adminOpenAction;
}

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { whoName, whoMeta } = adminWho(session);

  const [
    staffCount,
    pendingCount,
    recentSubmissions,
    recentEvents,
  ] = await Promise.all([
    prisma.user.count({ where: { role: { in: ["STAFF", "ADMIN"] }, isActive: true } }),
    prisma.submission.count({
      where: { status: { in: ["SUBMITTED", "UNDER_REVIEW", "NEEDS_INFO"] } },
    }),
    prisma.submission.findMany({
      where: { status: { not: "DRAFT" } },
      include: { citizen: { select: { firstName: true, lastName: true } } },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.submissionEvent.findMany({
      include: {
        submission: {
          include: { citizen: { select: { firstName: true, lastName: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const kpis = [
    {
      href: "/admin/users",
      icon: Users,
      iconClass: "bg-[#eef2fb] text-[#2b57c4]",
      value: staffCount,
      label: STRINGS.adminUsersTitle,
      sub: STRINGS.adminActiveStaff,
      subPending: false,
    },
    {
      href: "/admin/submissions?status=SUBMITTED",
      icon: Inbox,
      iconClass: "bg-[#fdf4e3] text-[#b7791f]",
      value: pendingCount,
      label: STRINGS.adminSubmissionsTitle,
      sub: STRINGS.adminPendingReview,
      subPending: true,
    },
  ];

  const quickActions = [
    {
      href: "/admin/users#create",
      icon: Plus,
      iconClass: "bg-[#eef2fb] text-[#2b57c4]",
      title: STRINGS.adminAddStaff,
      sub: STRINGS.adminAddStaffSub,
    },
    {
      href: "/admin/submissions?status=SUBMITTED",
      icon: Inbox,
      iconClass: "bg-[#fdf4e3] text-[#b7791f]",
      title: STRINGS.adminReviewPending,
      sub: STRINGS.adminReviewPendingSub,
      subCount: pendingCount,
    },
  ];

  const activityDot = (toStatus: string) => {
    if (toStatus === "APPROVED" || toStatus === "RELEASED") return "bg-[#1f9d55]";
    if (toStatus === "UNDER_REVIEW" || toStatus === "SUBMITTED") return "bg-[#2b57c4]";
    if (toStatus === "NEEDS_INFO" || toStatus === "REJECTED") return "bg-[#b7791f]";
    return "bg-[#6b7280]";
  };

  return (
    <ConsoleShell
      title={STRINGS.adminDashboardTitle}
      whoName={whoName}
      whoMeta={whoMeta}
      tabs={ADMIN_TABS}
    >
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {kpis.map((kpi) => (
          <Link
            key={kpi.href}
            href={kpi.href}
            className="group relative overflow-hidden rounded-[14px] border border-[#e7eaf0] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,64,.04),0_8px_24px_rgba(16,24,64,.06)] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#c9d6f5] hover:shadow-[0_12px_30px_rgba(16,24,64,.1)] focus-ring"
          >
            <span
              className={`mb-3.5 inline-flex h-11 w-11 items-center justify-center rounded-[11px] ${kpi.iconClass}`}
            >
              <kpi.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <ArrowRight
              className="absolute right-[18px] top-5 h-4 w-4 text-[#c3ccdd] transition-colors group-hover:text-[#2b57c4]"
              aria-hidden="true"
            />
            <p className="text-[30px] font-bold leading-none text-[#12275c]">{kpi.value}</p>
            <p className="mt-1.5 text-[13.5px] font-semibold text-[#1c2333]">
              <L s={kpi.label} />
            </p>
            <p className="mt-0.5 text-xs text-[#6b7280]">
              {kpi.subPending ? (
                <span className="font-semibold text-[#b7791f]">
                  <L
                    s={{
                      en: t(kpi.sub, "en").replace("{count}", String(kpi.value)),
                      fil: t(kpi.sub, "fil").replace("{count}", String(kpi.value)),
                    }}
                  />
                </span>
              ) : "subCount" in kpi && kpi.subCount != null ? (
                <L
                  s={{
                    en: t(kpi.sub, "en").replace("{count}", String(kpi.subCount)),
                    fil: t(kpi.sub, "fil").replace("{count}", String(kpi.subCount)),
                  }}
                />
              ) : (
                <L s={kpi.sub} />
              )}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 items-start gap-[22px] lg:grid-cols-[1fr_340px]">
        <div className="overflow-hidden rounded-[14px] border border-[#e7eaf0] bg-white shadow-[0_1px_2px_rgba(16,24,64,.04),0_8px_24px_rgba(16,24,64,.06)]">
          <div className="flex items-center justify-between border-b border-[#e7eaf0] px-5 py-4">
            <h2 className="text-[15.5px] font-bold text-[#12275c]">
              <L s={STRINGS.adminRecentSubmissions} />
            </h2>
            <Link
              href="/admin/submissions"
              className="inline-flex items-center gap-0.5 text-[12.5px] font-semibold text-[#2b57c4] hover:underline focus-ring rounded-sm"
            >
              <L s={STRINGS.viewAll} />
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="bg-[#fafbfe]">
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-[#6b7280]">
                    <L s={STRINGS.referenceNo} />
                  </th>
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-[#6b7280]">
                    <L s={STRINGS.applicantLabel} />
                  </th>
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-[#6b7280]">
                    <L s={STRINGS.serviceLabel} />
                  </th>
                  <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-[#6b7280]">
                    <L s={STRINGS.statusLabel} />
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-sm text-[#6b7280]">
                      <L s={STRINGS.adminNoRecentSubmissions} />
                    </td>
                  </tr>
                ) : (
                  recentSubmissions.map((s, idx) => {
                    const form = getFormBySlug(s.formSlug);
                    const name = `${s.citizen.firstName} ${s.citizen.lastName}`;
                    return (
                      <tr
                        key={s.id}
                        className="border-t border-[#e7eaf0] transition-colors hover:bg-[#f9fbff]"
                      >
                        <td className="px-5 py-3.5 align-middle text-[13.5px]">
                          <Link
                            href={`/staff/submissions/${s.id}`}
                            className="font-semibold text-[#2b57c4] hover:underline focus-ring rounded-sm"
                          >
                            {s.referenceNo}
                          </Link>
                          <span className="mt-0.5 block text-xs text-[#6b7280]">
                            {formatDate(s.createdAt)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 align-middle text-[13.5px]">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-xs font-bold ${AVATAR_TONES[idx % AVATAR_TONES.length]}`}
                            >
                              {initials(s.citizen.firstName, s.citizen.lastName)}
                            </span>
                            <span className="font-medium text-[#1c2333]">{name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 align-middle text-[13.5px] text-[#1c2333]">
                          {form ? <L s={form.name} /> : s.formSlug}
                        </td>
                        <td className="px-5 py-3.5 align-middle">
                          <StatusBadge status={s.status} />
                        </td>
                        <td className="px-5 py-3.5 align-middle text-right">
                          <Link
                            href={`/staff/submissions/${s.id}`}
                            className="text-[13.5px] font-semibold text-[#8a93a6] transition-colors hover:text-[#2b57c4] focus-ring rounded-sm"
                          >
                            <L s={actionLabel(s.status)} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="flex flex-col gap-[18px]">
          <div className="rounded-[14px] border border-[#e7eaf0] bg-white px-5 py-[18px] shadow-[0_1px_2px_rgba(16,24,64,.04),0_8px_24px_rgba(16,24,64,.06)]">
            <h2 className="mb-3.5 text-[15px] font-bold text-[#12275c]">
              <L s={STRINGS.adminQuickActions} />
            </h2>
            <ul>
              {quickActions.map((qa, i) => (
                <li key={qa.href}>
                  <Link
                    href={qa.href}
                    className={`flex items-center gap-3 py-2.5 focus-ring rounded-sm ${
                      i > 0 ? "border-t border-[#e7eaf0]" : ""
                    }`}
                  >
                    <span
                      className={`inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] ${qa.iconClass}`}
                    >
                      <qa.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-bold text-[#1c2333]">
                        <L s={qa.title} />
                      </span>
                      <span className="text-[11.5px] text-[#6b7280]">
                        {"subCount" in qa && qa.subCount != null ? (
                          <L
                            s={{
                              en: t(qa.sub, "en").replace("{count}", String(qa.subCount)),
                              fil: t(qa.sub, "fil").replace("{count}", String(qa.subCount)),
                            }}
                          />
                        ) : (
                          <L s={qa.sub} />
                        )}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#c3ccdd]" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[14px] border border-[#e7eaf0] bg-white px-5 py-[18px] shadow-[0_1px_2px_rgba(16,24,64,.04),0_8px_24px_rgba(16,24,64,.06)]">
            <h2 className="mb-3.5 text-[15px] font-bold text-[#12275c]">
              <L s={STRINGS.adminRecentActivity} />
            </h2>
            {recentEvents.length === 0 ? (
              <p className="text-sm text-[#6b7280]">
                <L s={STRINGS.adminNoRecentActivity} />
              </p>
            ) : (
              <ul>
                {recentEvents.map((ev, i) => {
                  const name = `${ev.submission.citizen.firstName} ${ev.submission.citizen.lastName}`;
                  const statusLabel = isSubmissionStatus(ev.toStatus)
                    ? STATUS_META[ev.toStatus].label
                    : { en: ev.toStatus, fil: ev.toStatus };
                  const isNew = ev.toStatus === "SUBMITTED" && !ev.fromStatus;
                  const last = i === recentEvents.length - 1;
                  return (
                    <li key={ev.id} className={`flex gap-2.5 py-2.5 ${i > 0 ? "border-t border-[#e7eaf0]" : ""}`}>
                      <div className="flex w-2.5 shrink-0 flex-col items-center">
                        <span
                          className={`mt-1.5 h-2.5 w-2.5 rounded-full ${activityDot(ev.toStatus)}`}
                          aria-hidden="true"
                        />
                        {!last && <span className="mt-1 w-0.5 flex-1 bg-[#e7eaf0]" aria-hidden="true" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] leading-snug text-[#1c2333]">
                          {isNew ? (
                            <L
                              s={{
                                en: t(STRINGS.adminActivityNewSubmission, "en").replace("{name}", name),
                                fil: t(STRINGS.adminActivityNewSubmission, "fil").replace("{name}", name),
                              }}
                            />
                          ) : (
                            <L
                              s={{
                                en: t(STRINGS.adminActivityStatusChange, "en")
                                  .replace("{name}", name)
                                  .replace("{status}", statusLabel.en.toLowerCase()),
                                fil: t(STRINGS.adminActivityStatusChange, "fil")
                                  .replace("{name}", name)
                                  .replace("{status}", statusLabel.fil.toLowerCase()),
                              }}
                            />
                          )}
                        </p>
                        <p className="mt-0.5 text-[11.5px] text-[#6b7280]">
                          {relativeTime(ev.createdAt)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </ConsoleShell>
  );
}
