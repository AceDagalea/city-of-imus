import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { serializeOfficeIds } from "@/lib/rbac";
import { FORM_CATEGORIES } from "@/lib/forms";

const updateUserSchema = z.object({
  isActive: z.boolean().optional(),
  canApprove: z.boolean().optional(),
  officeIds: z.array(z.string()).optional(),
});

/** Admin-only: update a Staff/Admin account (activate/deactivate, permissions, offices). */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const actor = await requireRole("ADMIN");
    if (!actor) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const adminUser = await prisma.user.findUnique({ where: { id: actor.id } });
    if (!adminUser?.isActive) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 403 });
    }

    const target = await prisma.user.findUnique({ where: { id: params.id } });
    if (!target) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const parsed = updateUserSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { isActive, canApprove, officeIds } = parsed.data;

    // Guard rails: an admin cannot deactivate their own account.
    if (isActive === false && target.id === actor.id) {
      return NextResponse.json({ error: "You cannot deactivate your own account" }, { status: 400 });
    }

    const validOfficeIds = new Set(FORM_CATEGORIES.map((c) => c.id));

    await prisma.user.update({
      where: { id: target.id },
      data: {
        ...(isActive !== undefined ? { isActive } : {}),
        ...(canApprove !== undefined && target.role === "STAFF" ? { canApprove } : {}),
        ...(officeIds !== undefined
          ? { officeIds: serializeOfficeIds(officeIds.filter((id) => validOfficeIds.has(id))) }
          : {}),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
