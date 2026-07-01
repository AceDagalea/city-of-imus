import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getFormBySlug } from "@/lib/forms";

const REFERENCE_PREFIX = (process.env.TENANT ?? "LGU").toUpperCase();

function generateReferenceNo() {
  const date = new Date();
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${REFERENCE_PREFIX}-${ymd}-${rand}`;
}

/**
 * Citizen request submission — persists to the database (no more JSON files
 * under data/submissions; pre-existing sample files are intentionally left
 * alone). File attachments stay on local disk under
 * data/submissions/<referenceNo>/ for now (object storage deferred per master
 * plan §5.3/§9), with their paths tracked in Attachment rows.
 */
export async function POST(request: NextRequest) {
  try {
    // Auth: only a verified citizen account may create a request (§6.2 matrix;
    // email verification required at launch per product decision).
    const session = await auth();
    const user = session?.user;
    if (!user?.id) {
      return NextResponse.json({ error: "Please sign in to submit a request" }, { status: 401 });
    }
    if (user.role !== "CITIZEN") {
      return NextResponse.json({ error: "Only citizen accounts can submit requests" }, { status: 403 });
    }
    if (!user.verified) {
      return NextResponse.json(
        { error: "Please verify your email address before submitting a request" },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const formSlug = formData.get("formSlug") as string;

    if (!formSlug) {
      return NextResponse.json({ error: "Form slug is required" }, { status: 400 });
    }

    const form = getFormBySlug(formSlug);
    if (!form || form.mode !== "online") {
      return NextResponse.json({ error: "Invalid form" }, { status: 400 });
    }

    const referenceNo = generateReferenceNo();
    const fields: Record<string, string> = {};
    const attachments: { filename: string; url: string }[] = [];

    for (const [key, value] of Array.from(formData.entries())) {
      if (key === "formSlug" || key === "formName") continue;
      if (value instanceof File && value.size > 0) {
        if (value.size > 5 * 1024 * 1024) {
          return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 });
        }
        const uploadsDir = path.join(process.cwd(), "data", "submissions", referenceNo);
        await mkdir(uploadsDir, { recursive: true });
        const buffer = Buffer.from(await value.arrayBuffer());
        const filename = `${key}-${value.name}`;
        const filePath = path.join(uploadsDir, filename);
        await writeFile(filePath, buffer);
        attachments.push({
          filename,
          url: path.join("data", "submissions", referenceNo, filename).replace(/\\/g, "/"),
        });
      } else if (typeof value === "string") {
        fields[key] = value;
      }
    }

    await prisma.submission.create({
      data: {
        referenceNo,
        formSlug,
        officeId: form.categoryId,
        citizenId: user.id,
        status: "SUBMITTED",
        fields: JSON.stringify(fields),
        attachments: { create: attachments },
        events: {
          create: {
            actorId: user.id,
            fromStatus: null,
            toStatus: "SUBMITTED",
            note: "Application submitted",
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      referenceNo,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
