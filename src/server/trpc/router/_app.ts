import { router } from "../trpc";
import { entriesRouter } from "./entries";
import { pricesRouter } from "./prices";
import { urlsRouter } from "./urls";

export const appRouter = router({
  entries: entriesRouter,
  prices: pricesRouter,
  urls: urlsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
