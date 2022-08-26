import { createRouter } from "../context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const labRouter = createRouter()
    .mutation("echo", {
        input: z.object({
            text: z.string(),
        }),
        async resolve({ input }) {
            return input.text;
        },
    })
    .mutation("echo.error", {
        input: z.object({
            text: z.string(),
        }),
        async resolve() {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "A deadly silent later...",
            });
        },
    })
    .mutation("echo.persisted", {
        input: z.object({
            text: z.string(),
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.propertyType.create({
                data: {
                    name: input.text,
                },
            });
        },
    });

export default labRouter;
