import { createProtectedRouter } from "../../protected-router";
import { propertyPreferencesRouter } from "./properties.router";

export const preferencesRouter = createProtectedRouter()
  .query("getAll", {
    resolve({ ctx }) {
      return [];
    },
  })
  .merge("properties.", propertyPreferencesRouter);
