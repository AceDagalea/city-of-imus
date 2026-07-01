// Admin account seeder.
//
// This is the ONLY way an Admin account should ever be created outside the app
// itself: Admin/Staff accounts are never self-registrable (master plan §6.3),
// and additional Admins are created by an existing Admin via /admin/users.
//
// Usage:
//   npx prisma db seed
//
// Credentials come from env (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD) with dev
// defaults below. CHANGE THE PASSWORD IMMEDIATELY on any real deployment.
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const email = (process.env.SEED_ADMIN_EMAIL ?? "admin@imus.gov.ph").toLowerCase();
const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe@2026";

async function main() {
  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await prisma.user.upsert({
    where: { email },
    update: {}, // never overwrite an existing admin's password on re-seed
    create: {
      email,
      passwordHash,
      role: "ADMIN",
      firstName: "System",
      lastName: "Administrator",
      isActive: true,
      emailVerified: new Date(), // seeded admin doesn't go through email verification
    },
  });
  console.log(`Seeded admin account: ${admin.email} (id: ${admin.id})`);
  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.log(`Default password in use: "${password}" — change it for real deployments.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
