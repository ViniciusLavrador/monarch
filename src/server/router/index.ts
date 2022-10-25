// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { preferencesRouter } from "./routers/preferences";
import { propertiesRouter } from "./routers/properties";
import { ZodError } from "zod";

export const appRouter = createRouter()
  .transformer(superjson)
  .formatError(({ shape, error }) => {
    return {
      ...shape,
      message:
        error.code === "BAD_REQUEST" && error.cause instanceof ZodError
          ? "Tivemos um erro de validação. Por favor, valide as informações inseridas."
          : shape.message,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  })
  .merge("preferences.", preferencesRouter)
  .merge("properties.", propertiesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
