import { RecurringTransactionSchema } from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const recurringTransactionRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.recurringTransaction.findMany();
  }),

  add: protectedProcedure
    .input(RecurringTransactionSchema.omit({ userId: true }))
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      ctx.prisma.recurringTransaction.create({
        data: {
          ...input,
          userId,
        },
      });
    }),

  update: protectedProcedure
    .input(RecurringTransactionSchema.omit({ userId: true }))
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      ctx.prisma.recurringTransaction.updateMany({
        data: input,
        where: {
          id: input.id,
          userId,
        },
      });
    }),

  remove: protectedProcedure
    .input(
      RecurringTransactionSchema.omit({ userId: true }).or(
        RecurringTransactionSchema.shape.id
      )
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      ctx.prisma.recurringTransaction.deleteMany({
        where: {
          id: typeof input === "string" ? input : input.id,
          userId,
        },
      });
    }),
});
