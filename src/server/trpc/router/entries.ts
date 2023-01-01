import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const entriesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.entries.findMany();
  }),
});
