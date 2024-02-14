import React from "react";
import Image from "next/image";
import { FromUnitResponse } from "@/types/wallet";
import { truncateWalletAddress } from "@/utils/walletUtils";
import { PolicyID } from "@/types/policyEnum";

interface PolicyCardProps {
  policyData: {
    assets: FromUnitResponse[];
    hasAssets: boolean;
  };
  policyId: string;
  image: string;
  onClick: () => void; // Function to update selected policy
}

const PolicyCard: React.FC<PolicyCardProps> = ({
  policyData,
  policyId,
  image,
  onClick,
}) => {
  const { assets, hasAssets } = policyData;

  // Check if the current policyId is specifically for "Degens"
  const isDegenPolicy = policyId === PolicyID.Degens;

  return (
    <div className="col-span-1 h-full bg-radial-secondary-shade-opposite p-4 rounded-md">
      <div className="flex flex-col items-center justify-around text-center h-full gap-2">
        <Image src={image} alt={policyId} width={200} className="rounded-md" />
        {isDegenPolicy ? (
          <>
            <h1 className="text-xl font-bold text-center">
              Degens: Coming Soon
            </h1>
            <h2 className="text-md">Minting Soon</h2>
            <button
              onClick={() => (window.location.href = "/mint")} // Redirects to the minting page
              className="button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Minting Soon
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-center">
              {assets.length > 0
                ? truncateWalletAddress(assets[0].name || "N/A", 10)
                : "N/A"}
            </h1>
            <h2>Policy ID: {truncateWalletAddress(policyId)}</h2>
            <h2>Holding: {assets.length}</h2>
            <button onClick={onClick} className="button">
              View Assets
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PolicyCard;
