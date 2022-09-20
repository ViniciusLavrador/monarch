// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";
import softDeleteMiddleware from "./middleware/soft-delete.middleware";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Middleware
// SOFT DELETE RECORDS
prisma.$use(softDeleteMiddleware);
