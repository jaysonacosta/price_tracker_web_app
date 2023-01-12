import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const pricesRouter = router({
  getPricesById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.prices.findMany({ where: { entryId: input.id } });
    }),
  deletePricesByEntryId: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.prices.deleteMany({ where: { entryId: input.id } });
    }),
});
