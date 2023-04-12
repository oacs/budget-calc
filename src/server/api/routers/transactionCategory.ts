import { TransactionCategorySchema } from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const transactionCategoryRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transactionCategory.findMany();
  }),

  add: protectedProcedure
    .input(TransactionCategorySchema.omit({ userId: true }))
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      ctx.prisma.transactionCategory.create({
        data: {
          ...input,
          userId,
        },
      });
    }),

  update: protectedProcedure
    .input(TransactionCategorySchema.omit({ userId: true }))
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      ctx.prisma.transactionCategory.updateMany({
        data: input,
        where: {
          id: input.id,
          userId,
        },
      });
    }),

  remove: protectedProcedure
    .input(
      TransactionCategorySchema.omit({ userId: true }).or(
        TransactionCategorySchema.shape.id
      )
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      ctx.prisma.transactionCategory.deleteMany({
        where: {
          id: typeof input === "string" ? input : input.id,
          userId,
        },
      });
    }),
});
