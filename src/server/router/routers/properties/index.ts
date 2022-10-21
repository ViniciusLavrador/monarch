import { createProtectedRouter } from "../../protected-router";

export const propertiesRouter = createProtectedRouter().query("getAll", {
  resolve({ ctx }) {
    return ctx.prisma.property.findMany({});
  },
});
