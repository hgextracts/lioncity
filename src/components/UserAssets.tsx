import React from "react";
import { AssetsByPolicy, FromUnitResponse } from "@/types/wallet";
import { policyIdToCollectionName } from "@/utils/policyUtils";
import { PolicyID } from "@/types/policyEnum";

interface UserAssetsProps {
  assetsByPolicyId: AssetsByPolicy;
  ada?: number;
  mane?: number;
}

const UserAssets: React.FC<UserAssetsProps> = ({ assetsByPolicyId }) => {
  if (!assetsByPolicyId) {
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
    <div className="flex flex-col px-4 gap-4">
      <h1 className="text-center">Lion City Assets</h1>
      <div className="mainnet-assets">
        <div className="flex flex-col">{renderAssets(filteredAssets)}</div>
      </div>
    </div>
  );
};

export default UserAssets;
