// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import propertyTypeRouter from "./routers/property-type.router";
import { protectedExampleRouter } from "./protected-example-router";
import labRouter from "./routers/lab.router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("property-type.", propertyTypeRouter)
  .merge("question.", protectedExampleRouter)
  .merge("lab.", labRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
