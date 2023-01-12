import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const entriesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.entries.findMany();
  }),
  getEntryById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.entries.findUnique({ where: { id: input.id } });
    }),
  deleteEntryById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.entries.delete({ where: { id: input.id } });
    }),
});
