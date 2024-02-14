import { useCallback } from "react";
import { Lucid, UTxO, fromUnit } from "lucid-cardano";
import { AssetsByPolicy } from "@/types/wallet";
import { PolicyID } from "@/types/policyEnum";
import React, { useContext, useEffect, useState } from "react";

// Assuming this might now be a regular function or a custom hook that returns data.
export const useFetchAssets = () => {
  const [policyIsLoading, setPolicyIsLoading] = useState(false);

  const fetchAssets = useCallback(
    async (lucid?: Lucid): Promise<AssetsByPolicy | null> => {
      if (!lucid) {
        console.log("Lucid instance not provided");
        return null;
      }

      setPolicyIsLoading(true); // Start loading

      const interestedPolicyIds = new Set<string>([
        PolicyID.LoveLace,
        PolicyID.Mane,
        PolicyID.LuckyLions,
        PolicyID.FooDogs,
        PolicyID.Residents,
        PolicyID.Gangs,
        PolicyID.Ledger,
        PolicyID.Handle,
        PolicyID.Preprod1,
        PolicyID.Preprod2,
        PolicyID.Preprod3,
        PolicyID.Preprod4,
        PolicyID.T_Mane,
        // ...other policy IDs
      ]);

      const utxos = await lucid.wallet.getUtxos();
      let assetsByPolicy: AssetsByPolicy = {};

      try {
        utxos.forEach((u: UTxO) => {
          Object.entries(u.assets).forEach(([key, value]) => {
            const assetDetails = fromUnit(key);
            const policyId = assetDetails.policyId;
            if (!assetsByPolicy[policyId]) {
              assetsByPolicy[policyId] = { assets: [], hasAssets: false };
            }
            assetsByPolicy[policyId].assets.push({
              ...assetDetails,
              value: Number(value),
            });
            assetsByPolicy[policyId].hasAssets = true;
          });
        });

        setPolicyIsLoading(false); // End loading
      } catch (error) {
        console.error("Failed to fetch assets:", error);
        setPolicyIsLoading(false); // End loading in case of error
        return null;
      }

      // Filter by interested policy IDs
      assetsByPolicy = Object.fromEntries(
        Object.entries(assetsByPolicy).filter(([policyId]) =>
          interestedPolicyIds.has(policyId)
        )
      );

      return assetsByPolicy;
    },
    []
  );

  return { fetchAssets, policyIsLoading };
};
