import { TransactionSchema } from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  getMonthlyTransactions: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.$queryRaw`
      SELECT
          t1.month,
          t1.total_expenses,
          t1.total_income,
          t1.total_income - t1.total_expenses as monthly_balance,
          SUM(t2.total_income - t2.total_expenses) as cumulative_balance
      FROM (
               SELECT
                   MONTH(transactionDate) as month,
                   SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as total_expenses,
                   SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as total_income
               FROM
                   Transaction
               WHERE
                       YEAR(transactionDate) = YEAR(CURDATE())
               GROUP BY
                   MONTH(transactionDate)
           ) t1
               JOIN (
          SELECT
              MONTH(transactionDate) as month,
              SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as total_expenses,
              SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as total_income
          FROM
              Transaction
          WHERE
                  YEAR(transactionDate) = YEAR(CURDATE())
          GROUP BY
              MONTH(transactionDate)
      ) t2 ON t1.month >= t2.month
      GROUP BY
          t1.month
      ORDER BY
          t1.month;
    `;
  }),

  add: protectedProcedure
    .input(
      TransactionSchema.omit({
        id: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        categoryId: true,
      })
    )
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.transaction.create({
        data: {
          ...input,
          userId,
        },
      });
    }),

  remove: protectedProcedure
    .input(TransactionSchema.shape.id)
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const where = {
        userId: userId,
        id: input,
      };
      return ctx.prisma.transaction.deleteMany({ where });
    }),

  update: protectedProcedure
    .input(TransactionSchema.omit({ userId: true }))
    .mutation(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.transaction.update({
        data: {
          ...input,
          userId,
        },
        where: {
          id: input.id,
        },
      });
    }),
});
