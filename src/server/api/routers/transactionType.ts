import {
  TransactionTypesCreateArgsSchema,
  TransactionTypesDeleteArgsSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const transactionTypeRouter = createTRPCRouter({
  add: protectedProcedure
    .input(TransactionTypesCreateArgsSchema)
    .mutation(({ input, ctx }) => {
      ctx.prisma.transactionTypes.create(input);
    }),

  remove: protectedProcedure
    .input(TransactionTypesDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.transactionTypes.delete(input);
    }),
});
