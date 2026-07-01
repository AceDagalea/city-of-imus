import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { canViewSubmission } from "@/lib/rbac";

/**
 * Protected attachment download. Access follows the submission-view permission
 * matrix: citizens see their own, staff see their offices', admins see all.
 */
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const actor = await getSession();
  if (!actor) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const attachment = await prisma.attachment.findUnique({
    where: { id: params.id },
    include: { submission: { select: { citizenId: true, officeId: true } } },
  });
  if (!attachment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (!canViewSubmission(actor, attachment.submission)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Stored URLs are workspace-relative paths (data/submissions/<ref>/<file>);
  // resolve within the project root and refuse anything that escapes it.
  const baseDir = path.join(process.cwd(), "data", "submissions");
  const filePath = path.resolve(process.cwd(), attachment.url);
  if (!filePath.startsWith(baseDir)) {
    return NextResponse.json({ error: "Invalid attachment path" }, { status: 400 });
  }

  try {
    const buffer = await readFile(filePath);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Disposition": `attachment; filename="${attachment.filename.replace(/"/g, "")}"`,
        "Content-Type": "application/octet-stream",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
  }
}
