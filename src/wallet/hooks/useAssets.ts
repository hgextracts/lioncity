import { useCallback } from "react";
import { Lucid, UTxO, fromUnit } from "lucid-cardano";
import { AssetsByPolicy } from "@/types/wallet";
import { PolicyID } from "@/types/policyEnum";
import { useContext } from "react";
import { WalletContext } from "@/context/UseWalletContext";
import { getUserStatus, getTotalValueByPolicy } from "@/utils/executiveCheck";

// Assuming this might now be a regular function or a custom hook that returns data.
export const useFetchAssets = () => {
  const {
    setLoading,
    setAda,
    setMane,
    setTMane,
    setAssetsByPolicyId,
    setHolderStatus,
  } = useContext(WalletContext);

  const fetchAssets = useCallback(
    async (lucid?: Lucid) => {
      if (!lucid) {
        console.log("Lucid instance not provided");
        return;
      }

      setLoading(true);

      try {
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

        utxos.forEach((u: UTxO) => {
          Object.entries(u.assets).forEach(([key, value]) => {
            const assetDetails = fromUnit(key);
            const policyId = assetDetails.policyId;
            if (interestedPolicyIds.has(policyId)) {
              if (!assetsByPolicy[policyId]) {
                assetsByPolicy[policyId] = { assets: [], hasAssets: false };
              }
              assetsByPolicy[policyId].assets.push({
                ...assetDetails,
                value: Number(value),
              });
              assetsByPolicy[policyId].hasAssets = true;
            }
          });
        });

        const userStatus = getUserStatus(assetsByPolicy);
        const ada = getTotalValueByPolicy(assetsByPolicy, PolicyID.LoveLace);
        const mane = getTotalValueByPolicy(assetsByPolicy, PolicyID.Mane);
        const tMane = getTotalValueByPolicy(assetsByPolicy, PolicyID.T_Mane);

        setAssetsByPolicyId(assetsByPolicy);
        setAda(ada);
        setMane(mane);
        setTMane(tMane);
        setHolderStatus(userStatus);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated regardless of success/failure
      }
    },
    [
      setLoading,
      setAda,
      setAssetsByPolicyId,
      setHolderStatus,
      setMane,
      setTMane,
    ]
  );

  return { fetchAssets };
};
