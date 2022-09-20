// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { preferencesRouter } from "./routers/preferences";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("preferences.", preferencesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
