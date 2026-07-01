import { PrismaClient } from "@prisma/client";

// Standard Next.js dev-hot-reload-safe Prisma singleton: in dev, module state
// is wiped on every HMR pass, so the client is cached on `globalThis` to avoid
// exhausting database connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
