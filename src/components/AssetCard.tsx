import React, { useState } from "react";
import { Asset } from "@/types/wallet";
import Image from "next/image";
import MetadataCard from "./MetadataCard";
import Modal from "@/layout/Modal";

interface AssetCardProps {
  asset: Asset;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!asset) return null;

  let imageUrl = "";

  if (asset.onchain_metadata) {
    const image = asset.onchain_metadata.image;
    if (Array.isArray(image)) {
      const [ipfsUrl, appendString] = image;
      imageUrl = `${ipfsUrl}${appendString}`.replace(
        "ipfs://",
        "https://ipfs.blockfrost.dev/ipfs/"
      );
    } else if (typeof image === "string") {
      imageUrl = image.replace("ipfs://", "https://ipfs.blockfrost.dev/ipfs/");
    }
  }

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col " onClick={handleCardClick}>
      {imageUrl && (
        <div className="image-container gap-2 flex-col rounded-md p-2">
          <Image
            src={imageUrl}
            alt={`${asset.asset} NFT`}
            className="rounded-md"
            width={640}
            height={640}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <p className="lg:text-lg font-semibold tracking-wide">
            {asset.onchain_metadata?.name
              ? String(asset.onchain_metadata.name)
              : "Unnamed NFT"}
          </p>
        </div>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <MetadataCard
            metadata={asset.onchain_metadata || {}}
            policyId={asset.policy_id}
            imageUrl={imageUrl}
          />
        </Modal>
      )}
    </div>
  );
};

export default AssetCard;
