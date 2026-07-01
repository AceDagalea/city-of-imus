import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { serializeOfficeIds } from "@/lib/rbac";
import { FORM_CATEGORIES } from "@/lib/forms";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: z.enum(["STAFF", "ADMIN"]),
  canApprove: z.boolean().optional().default(false),
  officeIds: z.array(z.string()).optional().default([]),
});

/**
 * Admin-only: create Staff/Admin accounts. These are never self-registrable —
 * this endpoint (plus the seed script for the first Admin) is the only way
 * back-office accounts come into existence.
 */
export async function POST(request: NextRequest) {
  try {
    const actor = await requireRole("ADMIN");
    if (!actor) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const adminUser = await prisma.user.findUnique({ where: { id: actor.id } });
    if (!adminUser?.isActive) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 403 });
    }

    const parsed = createUserSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase();
    if (await prisma.user.findUnique({ where: { email } })) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const validOfficeIds = new Set(FORM_CATEGORIES.map((c) => c.id));
    const officeIds = parsed.data.officeIds.filter((id) => validOfficeIds.has(id));

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: await bcrypt.hash(parsed.data.password, 10),
        firstName: parsed.data.firstName.trim(),
        lastName: parsed.data.lastName.trim(),
        role: parsed.data.role,
        canApprove: parsed.data.role === "STAFF" ? parsed.data.canApprove : false,
        officeIds: serializeOfficeIds(officeIds),
        // Back-office accounts are provisioned by an Admin; they don't go
        // through the citizen email-verification flow.
        emailVerified: new Date(),
      },
      select: { id: true, email: true, role: true },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
