import { useContext, useEffect, useCallback } from "react";
import { WalletContext } from "@/context/UseWalletContext";
import { useAutoConnect } from "./useAutoConnect";

export const useLiveNetworkManager = () => {
  const { api, lucid } = useContext(WalletContext);
  const { autoConnect } = useAutoConnect();

  const handleAccountChange = useCallback(
    async (...args: unknown[]) => {
      try {
        if (lucid) {
          console.log("Account changed, will trigger autoConnect.");
          autoConnect();
        } else {
          console.error("Lucid instance is undefined");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    [lucid, autoConnect]
  );

  const handleNetworkChange = useCallback(
    (network: unknown) => {
      try {
        if (lucid) {
          console.log("Network changed, will trigger autoConnect.");
          autoConnect();
        } else {
          console.error("Lucid instance is undefined");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    [lucid, autoConnect]
  );

  useEffect(() => {
    if (api?.experimental?.on && api?.experimental?.off) {
      try {
        api.experimental.on("accountChange", handleAccountChange);
        api.experimental.on("networkChange", handleNetworkChange);
      } catch (error) {
        console.error(
          "An error occurred while attaching event listeners:",
          error
        );
      }

      return () => {
        try {
          api.experimental.off("accountChange", handleAccountChange);
          api.experimental.off("networkChange", handleNetworkChange);
        } catch (error) {
          console.error(
            "An error occurred while detaching event listeners:",
            error
          );
        }
      };
    }
  }, [api, handleAccountChange, handleNetworkChange]);
};
