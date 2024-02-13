// This hook is used by both lucidAuth and autoConnect for initializing the wallet.
import { useCallback, useContext } from "react";
import { enableWalletApi, initializeLucid } from "@/utils/walletUtils";
import { WalletContext } from "@/context/UseWalletContext";
import { WalletDetails } from "@/types/wallet";

export const useInitializeWallet = () => {
  const {
    setApi,
    setLucid,
    setAddr,
    setEnvironment,
    setStakeKey,
    setWalletDetails,
  } = useContext(WalletContext);

  const initializeWallet = useCallback(
    async (walletDetails: WalletDetails) => {
      try {
        const api = await enableWalletApi(walletDetails.name);
        const { lucid, environment } = await initializeLucid(api);
        const address = await lucid.wallet.address();
        const stakeKey = await lucid.wallet.rewardAddress();

        setApi(api);
        setLucid(lucid);
        setEnvironment(environment);
        setAddr(address);
        setStakeKey(stakeKey ?? undefined);
        setWalletDetails(walletDetails);

        return { api, lucid, environment, address, stakeKey };
      } catch (error) {
        console.error("Error initializing wallet:", error);
        throw error;
      }
    },
    [setApi, setLucid, setEnvironment, setAddr, setStakeKey, setWalletDetails]
  );

  return initializeWallet;
};
