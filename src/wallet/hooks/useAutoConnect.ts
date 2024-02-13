import { useCallback, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { WalletDetails } from "@/types/wallet";
import { getItem } from "@/utils/localStorageUtils";
import { useInitializeWallet } from "./useInitializeWallet";
import { useFetchAssets } from "./useAssets";

export const useAutoConnect = () => {
  const { data: session } = useSession();
  const initializeWallet = useInitializeWallet();
  const fetchAssets = useFetchAssets();

  const autoConnect = useCallback(async (): Promise<void> => {
    const storedWalletDetails = getItem<WalletDetails>("walletDetails");
    if (session && storedWalletDetails) {
      try {
        const { lucid } = await initializeWallet(storedWalletDetails);

        if (lucid) {
          fetchAssets(lucid);
        }
      } catch (err) {
        console.error(
          "Error in useAutoConnect:",
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }
  }, [session, initializeWallet, fetchAssets]);

  useEffect(() => {
    autoConnect();
  }, [autoConnect]);

  return { autoConnect };
};
