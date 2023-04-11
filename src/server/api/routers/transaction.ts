import {
  TransactionsDeleteArgsSchema,
  TransactionsCreateArgsSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  add: protectedProcedure
    .input(TransactionsCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      ctx.prisma.transactions.create(input);
    }),

  remove: protectedProcedure
    .input(TransactionsDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.transactions.delete(input);
    }),
});
