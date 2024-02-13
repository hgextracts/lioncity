import { Lucid, UTxO, fromUnit } from "lucid-cardano";
import { useCallback, useContext } from "react";
import { WalletContext } from "@/context/UseWalletContext";
import { AssetsByPolicy } from "@/types/wallet";
import { PolicyID } from "@/types/policyEnum";

export const useFetchAssets = () => {
  const { setAda, setMane, setTMane, setAssetsByPolicyId } =
    useContext(WalletContext);

  const fetchAssets = useCallback(
    async (lucid?: Lucid) => {
      if (!lucid) {
        console.log("no lucid", lucid);
        return;
      }

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

      assetsByPolicy = Object.fromEntries(
        Object.entries(assetsByPolicy).filter(([policyId]) =>
          interestedPolicyIds.has(policyId)
        )
      );

      console.log("assassetsByPolicy", assetsByPolicy);

      const ada =
        assetsByPolicy[PolicyID.LoveLace]?.assets.reduce(
          (acc, curr) => acc + curr.value,
          0
        ) || 0;

      const mane =
        assetsByPolicy[PolicyID.Mane]?.assets.reduce(
          (acc, curr) => acc + curr.value,
          0
        ) || 0;

      const tMane =
        assetsByPolicy[PolicyID.T_Mane]?.assets.reduce(
          (acc, curr) => acc + curr.value,
          0
        ) || 0;

      setAssetsByPolicyId(assetsByPolicy);
      setAda(ada);
      setMane(mane);
      setTMane(tMane);
    },
    [setAda, setAssetsByPolicyId, setMane, setTMane]
  );

  return fetchAssets;
};
