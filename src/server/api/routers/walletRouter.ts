import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Lucid, fromText } from "lucid-cardano";
import { randomBytes } from "crypto";

export const walletRouter = createTRPCRouter({
  verifySignature: protectedProcedure
    .input(
      z.object({
        signedMessage: z.object({ signature: z.string(), key: z.string() }),
        provider: z.string(),
        address: z.string(),
        stakeKey: z.string(),
        message: z.string(),
        nonce: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { signedMessage, message, nonce, address, stakeKey, provider } =
        input;

      const hexMessage = fromText(message + nonce);

      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });
      if (!user || user.nonce !== nonce) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Nonce mismatch",
        });
      }

      const lucid = await Lucid.new();
      const isValid = lucid.verifyMessage(stakeKey, hexMessage, signedMessage);

      if (!isValid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid signature",
        });
      }

      const transaction = await ctx.db.$transaction(async (prisma) => {
        // Update the user's wallet details
        await prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            address: address,
            stakeKey: stakeKey,
            provider: provider,
          },
        });

        // Update or create wallet in the Wallet model
        const wallet = await prisma.wallet.upsert({
          where: { address: address },
          update: {
            /* update logic */
          },
          create: {
            address: address,
            stakeKey: stakeKey,
            provider: provider,
            userId: ctx.session.user.id,
            // additional fields if needed
          },
        });

        return wallet;
      });

      return { status: "success", transaction };
    }),

  unlinkWallet: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const transaction = await ctx.db.$transaction(async (prisma) => {
      // Nullify wallet details in the User model
      await prisma.user.update({
        where: { id: userId },
        data: {
          address: null,
          stakeKey: null,
          provider: null,
          nonce: null,
        },
      });

      await prisma.wallet.deleteMany({
        where: { userId: userId },
      });

      return { status: "wallet unlinked" };
    });

    return transaction;
  }),

  generateNonce: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const nonce = randomBytes(16).toString("hex");

    await ctx.db.user.update({
      where: { id: userId },
      data: { nonce },
    });

    return { nonce };
  }),
});
