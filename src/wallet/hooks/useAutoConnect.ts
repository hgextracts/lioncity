// In useAutoConnect.js
import { useCallback } from "react";
import { WalletDetails } from "@/types/wallet";
import { getItem } from "@/utils/localStorageUtils";
import { useInitializeWallet } from "./useInitializeWallet";

export const useAutoConnect = () => {
  const initializeWallet = useInitializeWallet();

  const autoConnect = useCallback(async (): Promise<void> => {
    const storedWalletDetails = getItem<WalletDetails>("walletDetails");
    if (storedWalletDetails) {
      try {
        await initializeWallet(storedWalletDetails);
      } catch (err) {
        console.error(
          "Error in useAutoConnect:",
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }
  }, [initializeWallet]);

  return { autoConnect };
};
