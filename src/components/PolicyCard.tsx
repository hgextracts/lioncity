import React from "react";
import Image, { StaticImageData } from "next/image";
import { FromUnitResponse } from "@/types/wallet";
import { truncateWalletAddress } from "@/utils/walletUtils";
import { PolicyID } from "@/types/policyEnum";
import defaultImage from "../../public/lclogo.png";
import { fromHex } from "lucid-cardano";
import { policyIdToCollectionName } from "@/utils/policyUtils";

interface PolicyCardProps {
  policyData: {
    assets: FromUnitResponse[];
    hasAssets: boolean;
  };
  policyId: string;
  policyImage?: StaticImageData;
  onClick: () => void; // Function to update selected policy
}

const PolicyCard: React.FC<PolicyCardProps> = ({
  policyData,
  policyId,
  policyImage,
  onClick,
}) => {
  const { assets, hasAssets } = policyData;

  const imageSrc = policyImage || defaultImage;

  // Check if the current policyId is specifically for "Degens"
  const isDegenPolicy = policyId === PolicyID.Degens;

  const name = policyIdToCollectionName[policyId as PolicyID];

  return (
    <div className="col-span-1 h-full bg-radial-secondary-shade-opposite p-4 rounded-md">
      <div className="flex flex-col items-center justify-around text-center h-full gap-2">
        <Image
          src={imageSrc}
          alt={policyId}
          width={200}
          className="rounded-md"
        />
        {isDegenPolicy ? (
          <>
            <h1 className="text-xl font-bold text-center">
              Degens: Coming Soon
            </h1>
            <h2 className="text-md">Minting Soon</h2>
            <button
              onClick={() => (window.location.href = "/mint")} // Redirects to the minting page
              className="button"
            >
              Minting Soon
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-center">{name}</h1>
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
