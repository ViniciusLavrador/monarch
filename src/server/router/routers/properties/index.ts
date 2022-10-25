import { z } from "zod";
import { createProtectedRouter } from "../../protected-router";

export const propertiesRouter = createProtectedRouter()
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.property.findMany({});
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string(),
      type: z.number(),
    }),
    resolve({ ctx, input }) {
      console.log({ input });
      return input;
    },
  });
