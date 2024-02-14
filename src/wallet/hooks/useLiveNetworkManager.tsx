import { useContext, useEffect } from "react";
import { WalletContext } from "@/context/UseWalletContext";

export const useLiveNetworkManager = () => {
  const { api } = useContext(WalletContext);

  useEffect(() => {
    // Define the callback for account changes
    const handleAccountChange = (...args: unknown[]) => {
      console.log(
        "Account changed. Consider prompting the user to refresh the page."
      );
      // Any additional logic for handling account changes can go here
    };

    // Define the callback for network changes
    const handleNetworkChange = (network: unknown) => {
      console.log(
        "Network changed. Consider prompting the user to refresh the page."
      );
      // Any additional logic for handling network changes can go here
    };

    // Register the listeners if the API and its experimental features are available
    if (api?.experimental?.on && api?.experimental?.off) {
      api.experimental.on("accountChange", handleAccountChange);
      api.experimental.on("networkChange", handleNetworkChange);

      // Return a cleanup function to remove the listeners
      return () => {
        api.experimental.off("accountChange", handleAccountChange);
        api.experimental.off("networkChange", handleNetworkChange);
      };
    }
  }, [api]);

  // Since the hook now only sets up listeners, there's no need to return anything
};
