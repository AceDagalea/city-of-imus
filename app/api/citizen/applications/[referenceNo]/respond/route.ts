import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";

/**
 * Citizen response to a NEEDS_INFO request: optional reply text and/or
 * additional documents. Moves the submission back to UNDER_REVIEW and writes
 * an audit event (per the §5.2 lifecycle: NEEDS_INFO ⇄ UNDER_REVIEW).
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { referenceNo: string } }
) {
  try {
    const actor = await requireRole("CITIZEN");
    if (!actor) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const submission = await prisma.submission.findUnique({
      where: { referenceNo: params.referenceNo },
    });
    if (!submission || submission.citizenId !== actor.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (submission.status !== "NEEDS_INFO") {
      return NextResponse.json(
        { error: "This application is not awaiting additional information" },
        { status: 409 }
      );
    }

    const formData = await request.formData();
    const reply = (formData.get("reply") as string | null)?.trim() ?? "";
    const attachments: { filename: string; url: string }[] = [];

    for (const [key, value] of Array.from(formData.entries())) {
      if (value instanceof File && value.size > 0) {
        if (value.size > 5 * 1024 * 1024) {
          return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 });
        }
        const uploadsDir = path.join(process.cwd(), "data", "submissions", submission.referenceNo);
        await mkdir(uploadsDir, { recursive: true });
        const filename = `${key}-${value.name}`;
        await writeFile(path.join(uploadsDir, filename), Buffer.from(await value.arrayBuffer()));
        attachments.push({
          filename,
          url: path
            .join("data", "submissions", submission.referenceNo, filename)
            .replace(/\\/g, "/"),
        });
      }
    }

    if (!reply && attachments.length === 0) {
      return NextResponse.json({ error: "Provide a reply or at least one document" }, { status: 400 });
    }

    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        status: "UNDER_REVIEW",
        attachments: { create: attachments },
        events: {
          create: {
            actorId: actor.id,
            fromStatus: "NEEDS_INFO",
            toStatus: "UNDER_REVIEW",
            note: reply || "Citizen submitted additional documents",
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Respond error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
