import { Status } from "@prisma/client";
import { z } from "zod";
import { activeRecords } from "../../../../utils/db";
import { createRouter } from "../../context";

export const propertyPreferencesRouter = createRouter()
  .query("types.getAll", {
    resolve({ ctx }) {
      return ctx.prisma.propertyType.findMany({ where: { ...activeRecords } });
    },
  })
  .mutation("types.create", {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.propertyType.create({
        data: {
          name: input,
          status: "ACTIVE",
        },
      });
    },
  })
  .mutation("types.remove", {
    input: z.number(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.propertyType.delete({
        where: {
          id: input,
        },
      });
    },
  });
