import { PolicyID } from "@/types/policyEnum";
import { AssetsByPolicy } from "@/types/wallet";

export const getTotalValueByPolicy = (
  assetsByPolicy: AssetsByPolicy | null,
  policyId: PolicyID
): number => {
  // Early return 0 if assetsByPolicy is null
  if (!assetsByPolicy) return 0;

  return (
    assetsByPolicy[policyId]?.assets.reduce(
      (acc, curr) => acc + curr.value,
      0
    ) || 0
  );
};

export const calculateTotalAssetsForPolicies = (
  assetsByPolicyId: AssetsByPolicy | null,
  policyIds: PolicyID[]
): number => {
  return policyIds.reduce((total, policyId) => {
    return total + (assetsByPolicyId?.[policyId]?.assets.length || 0);
  }, 0);
};

// Function to get user status based on the total assets for specific policies
export const getUserStatus = (
  assetsByPolicyId: AssetsByPolicy | null
): string => {
  if (!assetsByPolicyId) return "Unknown";

  const totalAssets = calculateTotalAssetsForPolicies(assetsByPolicyId, [
    PolicyID.LuckyLions,
    PolicyID.FooDogs,
  ]);

  if (totalAssets === 0) {
    return "Visitor";
  } else if (totalAssets >= 1 && totalAssets < 20) {
    return "Holder";
  } else {
    return "Executive";
  }
};
