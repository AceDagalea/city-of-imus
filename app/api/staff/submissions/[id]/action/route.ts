import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import {
  canDecideSubmission,
  canProcessSubmission,
  violatesSegregationOfDuties,
} from "@/lib/rbac";
import { canTransition, isSubmissionStatus, type SubmissionStatus } from "@/lib/workflow";

const actionSchema = z.object({
  action: z.enum(["start_review", "request_info", "approve", "reject", "ready", "release"]),
  note: z.string().max(2000).optional(),
});

const ACTION_TARGET: Record<z.infer<typeof actionSchema>["action"], SubmissionStatus> = {
  start_review: "UNDER_REVIEW",
  request_info: "NEEDS_INFO",
  approve: "APPROVED",
  reject: "REJECTED",
  ready: "READY_FOR_RELEASE",
  release: "RELEASED",
};

const DECISION_ACTIONS = new Set(["approve", "reject"]);

/**
 * Staff processing actions. All permission checks happen here, server-side —
 * the UI hiding a button is never the enforcement point:
 *  - process actions require STAFF assigned to the submission's office (or ADMIN)
 *  - approve/reject additionally require `canApprove` and pass the
 *    segregation-of-duties rule (the reviewer cannot also be the approver)
 *  - transitions must follow the §5.2 lifecycle
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const actor = await requireRole(["STAFF", "ADMIN"]);
    if (!actor) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // JWT claims can outlive account changes — re-check the account is active.
    const dbUser = await prisma.user.findUnique({ where: { id: actor.id } });
    if (!dbUser?.isActive) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 403 });
    }

    const parsed = actionSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
    const { action, note } = parsed.data;

    const submission = await prisma.submission.findUnique({ where: { id: params.id } });
    if (!submission) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Office scoping (staff only see/touch their own offices).
    if (!canProcessSubmission(actor, submission)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Decision gate: approve/reject additionally require canApprove + SoD.
    if (DECISION_ACTIONS.has(action)) {
      if (!canDecideSubmission(actor, submission)) {
        return NextResponse.json(
          { error: "You do not have approval permission" },
          { status: 403 }
        );
      }
      if (await violatesSegregationOfDuties(actor, submission.id)) {
        return NextResponse.json(
          { error: "Segregation of duties: you reviewed this submission, so a different approver must decide it" },
          { status: 403 }
        );
      }
    }

    if (action === "request_info" && !note?.trim()) {
      return NextResponse.json(
        { error: "A note describing the required information is needed" },
        { status: 400 }
      );
    }

    const from = submission.status;
    const to = ACTION_TARGET[action];
    if (!isSubmissionStatus(from) || !canTransition(from, to)) {
      return NextResponse.json(
        { error: `Cannot move from ${from} to ${to}` },
        { status: 409 }
      );
    }

    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        status: to,
        assignedToId: action === "start_review" ? actor.id : submission.assignedToId,
        events: {
          create: {
            actorId: actor.id,
            fromStatus: from,
            toStatus: to,
            note: note?.trim() || null,
          },
        },
      },
    });

    return NextResponse.json({ success: true, status: to });
  } catch (error) {
    console.error("Staff action error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
