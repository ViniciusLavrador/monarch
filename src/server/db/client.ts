// src/server/db/client.ts
import { Prisma, PrismaClient, Status } from "@prisma/client";
import { env } from "../../env/server.mjs";
import { config } from "node-config-ts";
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
prisma.$use(async (params, next) => {
  if (
    !params.model ||
    !(config.db.softDelete.models as Prisma.ModelName[]).includes(params.model)
  ) {
    return next(params);
  }
  if (params.action === "delete") {
    params.action = "update";
    params.args["data"] = {
      status: Status.DELETED,
    };
  }

  if (params.action === "deleteMany") {
    params.action = "updateMany";
    if (params.args.data !== undefined) {
      params.args.data["status"] = Status.DELETED;
    } else {
      params.args["data"] = {
        status: Status.DELETED,
      };
    }
  }

  return next(params);
});
