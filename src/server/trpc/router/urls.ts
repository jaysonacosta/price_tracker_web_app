import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const urlsRouter = router({
  postUrl: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.urls.create({
        data: {
          url: input.url,
          date: new Date().toISOString(),
        },
      });
    }),
});
