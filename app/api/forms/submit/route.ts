import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getFormBySlug } from "@/lib/forms";

function generateReferenceNo() {
  const date = new Date();
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `IMUS-${ymd}-${rand}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const formSlug = formData.get("formSlug") as string;

    if (!formSlug) {
      return NextResponse.json({ error: "Form slug is required" }, { status: 400 });
    }

    const form = getFormBySlug(formSlug);
    if (!form || form.mode !== "online") {
      return NextResponse.json({ error: "Invalid form" }, { status: 400 });
    }

    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const referenceNo = generateReferenceNo();
    const submission: Record<string, unknown> = {
      referenceNo,
      formSlug,
      formName: formData.get("formName"),
      submittedAt: new Date().toISOString(),
      applicant: { email, firstName, lastName },
      fields: {} as Record<string, string>,
      attachments: [] as string[],
    };

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
        await writeFile(path.join(uploadsDir, filename), buffer);
        (submission.attachments as string[]).push(filename);
      } else if (typeof value === "string") {
        (submission.fields as Record<string, string>)[key] = value;
      }
    }

    const dataDir = path.join(process.cwd(), "data", "submissions");
    await mkdir(dataDir, { recursive: true });
    await writeFile(
      path.join(dataDir, `${referenceNo}.json`),
      JSON.stringify(submission, null, 2)
    );

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
