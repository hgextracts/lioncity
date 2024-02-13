import { useCallback, useContext, useState } from "react";
import { WalletConnectionError } from "@/lib/exceptions";
import { fromText } from "lucid-cardano";
import { WalletContext } from "@/context/UseWalletContext";
import { trpc } from "@/utils/trpc";
import { useInitializeWallet } from "./useInitializeWallet";
import { WalletDetails } from "@/types/wallet";

export function useLucidAuth() {
  const initializeWallet = useInitializeWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { setApi, setLucid, setAddr, setEnvironment, setStakeKey } =
    useContext(WalletContext);

  const verifySignature = trpc.wallet.verifySignature.useMutation();
  const getNonce = trpc.wallet.generateNonce.useMutation();

  const lucidAuth = useCallback(
    async (walletDetails: WalletDetails) => {
      if (!walletDetails) return;
      setIsLoading(true);
      setError("");

      try {
        const { api, lucid, environment, address, stakeKey } =
          await initializeWallet(walletDetails);

        const nonceResponse = await getNonce.mutateAsync();
        const nonce = nonceResponse.nonce;

        if (!stakeKey || !nonce) throw new WalletConnectionError();

        const message = "Sign in to Lion City. Nonce:";
        const hexMessage = fromText(message + nonce);
        const signature = await lucid.newMessage(stakeKey, hexMessage).sign();
        const provider = walletDetails.name;

        await verifySignature.mutateAsync({
          signedMessage: signature,
          provider,
          address,
          stakeKey,
          message,
          nonce,
        });

        setApi(api);
        setLucid(lucid);
        setAddr(address);
        setStakeKey(stakeKey);
        setEnvironment(environment);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [
      getNonce,
      initializeWallet,
      setAddr,
      setApi,
      setEnvironment,
      setLucid,
      setStakeKey,
      verifySignature,
    ]
  );

  return { lucidAuth, isLoading, error };
}
