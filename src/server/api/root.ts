import { createTRPCRouter } from "~/server/api/trpc";
import { transactionRouter } from "~/server/api/routers/transaction";
import { transactionTypeRouter } from "~/server/api/routers/transactionType";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  transactionType: transactionTypeRouter,
  transaction: transactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
