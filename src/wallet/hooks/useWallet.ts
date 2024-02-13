import { useState } from "react";
import { signOut } from "next-auth/react";
import { setItem, removeItem } from "@/utils/localStorageUtils";
import { WalletDetails } from "@/types/wallet";
import { useLucidAuth } from "./useLucidAuth";

export const useWallet = () => {
  const [availableWallets, setAvailableWallets] = useState<WalletDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { lucidAuth } = useLucidAuth();

  const detectWallets = (): [WalletDetails[], string | null] => {
    try {
      const detectedWallets: WalletDetails[] = [];
      if (window.cardano) {
        Object.entries(window.cardano).forEach(([walletName, wallet]) => {
          if (
            typeof wallet.enable === "function" &&
            typeof wallet.isEnabled === "function"
          ) {
            detectedWallets.push({
              name: walletName,
              icon: wallet.icon,
            });
          }
        });
        if (detectedWallets.length === 0) {
          return [[], "No wallets detected. Please install a wallet."];
        } else {
          return [detectedWallets, null];
        }
      } else {
        return [[], "Install Cardano Wallet"];
      }
    } catch (err) {
      return [[], "An error occurred while detecting wallets."];
    }
  };

  const connectWallet = () => {
    const [detectedWallets, detectError] = detectWallets();
    setError(detectError);
    setAvailableWallets(detectedWallets || []);
  };

  const disconnectWallet = async () => {
    try {
      removeItem("walletDetails");

      await signOut();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  const selectWallet = (selectedWallet: WalletDetails) => {
    lucidAuth(selectedWallet);
    setItem("walletDetails", selectedWallet);
  };

  return {
    availableWallets,
    error,
    connectWallet,
    disconnectWallet,
    selectWallet,
  };
};
