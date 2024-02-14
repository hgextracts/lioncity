import React, { useContext } from "react";
import { WalletContext } from "@/context/UseWalletContext";
import { PolicyID } from "@/types/policyEnum";
import { FromUnitResponse } from "@/types/wallet";
import { policyIdToCollectionName } from "@/utils/policyUtils";

const AssetSummary = () => {
  const { assetsByPolicyId } = useContext(WalletContext);

  if (!assetsByPolicyId) {
    // Handle the undefined case, maybe return null or a loading state in a component
    return null;
  }

  const filteredAssets = Object.entries(assetsByPolicyId).filter(
    ([policyId, details]) => {
      return policyId !== PolicyID.Mane && policyId !== PolicyID.LoveLace;
    }
  );

  const renderAssets = (
    assets: [string, { assets: FromUnitResponse[]; hasAssets: boolean }][]
  ) => {
    return assets.map(([policyId, details]) => {
      const name = policyIdToCollectionName[policyId as PolicyID];
      const count = details.assets.length;
      return (
        <div
          key={policyId}
          className={`${details.hasAssets ? "" : "opacity-50"}`}
        >
          <span>{name}: </span>
          <span>{count}</span>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col items-center px-4 gap-4">
      <div className="mainnet-assets">
        <div className="flex flex-col">{renderAssets(filteredAssets)}</div>
      </div>
    </div>
  );
};

export default AssetSummary;
