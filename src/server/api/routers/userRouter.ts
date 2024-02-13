import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getUserWallet: protectedProcedure.query(async ({ ctx }) => {
    // Ensure the user is authenticated
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // Fetch wallet details for the authenticated user
    const walletDetails = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        stakeKey: true,
      },
    });

    if (!walletDetails) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Wallet details not found",
      });
    }

    return walletDetails;
  }),
});
