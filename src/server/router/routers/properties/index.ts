import { z } from "zod";
import { createProtectedRouter } from "../../protected-router";

export const propertiesRouter = createProtectedRouter()
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.property.findMany({
        where: { status: "ACTIVE" },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      name: z
        .string()
        .trim()
        .min(1, { message: "Name must be at least one char long (without spaces)" }),
      type: z.number(),
      address: z.object({
        placeID: z.string(),
        street: z.string(),
        number: z.string(),
        zipCode: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        formattedAddress: z.string(),
        lat: z.number().optional(),
        long: z.number().optional(),
        additionalAddressLine1: z.string().optional(),
        additionalAddressLine2: z.string().optional(),
      }),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.property.create({
        data: {
          status: "ACTIVE",
          name: input.name,
          typeId: input.type,
          ...input.address,
        },
      });
    },
  });
