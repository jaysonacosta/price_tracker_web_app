import { router } from "../trpc";
import { entriesRouter } from "./entries";
import { pricesRouter } from "./prices";

export const appRouter = router({
  entries: entriesRouter,
  prices: pricesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
