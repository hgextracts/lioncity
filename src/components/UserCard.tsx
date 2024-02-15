import React from "react";
import Image from "next/image";
import UserTokens from "./UserTokens";
import { truncateWalletAddress } from "@/utils/walletUtils";

interface UserCardProps {
  image?: string;
  name?: string;
  address?: string;
  stakeKey?: string;
  policyIsLoading?: boolean;
  userStatus?: string;
  ada?: number;
  mane?: number;
}

const UserCard: React.FC<UserCardProps> = ({
  image,
  name,
  address,
  stakeKey,
  policyIsLoading,
  userStatus,
  ada,
  mane,
}) => {
  return (
    <div className="flex flex-col bg-radial-secondary-shade-opposite rounded-md gap-4 p-4 justify-between h-full">
      <div className="grid grid-cols-2 h-full">
        <div className="flex flex-col justify-between">
          <Image
            src={image || "/lclogo.png"}
            alt="user avatar"
            width={128}
            height={128}
            priority={true}
            className="rounded-full"
          />
          <UserTokens ada={ada} mane={mane} policyIsLoading={policyIsLoading} />
        </div>

        <div className="flex flex-col justify-between">
          <div className="text-right">
            <p className="text-2xl">Welcome Home,</p>
            <p className="text-4xl mb-4 truncate">{name || "N/A"}</p>
            <p className="text-lg">
              Status:
              <span
                style={{
                  fontWeight: userStatus === "Executive" ? "bold" : "normal",
                  color: userStatus === "Executive" ? "gold" : "inherit",
                }}
              >
                {" "}
                {userStatus}
              </span>
            </p>
          </div>
          <div className="text-right">
            <h1 className="underline text-lg">Linked Wallet</h1>
            <p>Address: {address ? truncateWalletAddress(address) : "N/A"}</p>
            <p>
              StakeKey: {stakeKey ? truncateWalletAddress(stakeKey) : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
