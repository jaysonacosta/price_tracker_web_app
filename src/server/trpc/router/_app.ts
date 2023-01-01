import { router } from "../trpc";
import { entriesRouter } from "./entries";

export const appRouter = router({
  entries: entriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
