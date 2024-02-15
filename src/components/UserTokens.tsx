import React from "react";
import Image from "next/image";
import maneImg from "../../public/manetoken.png";
import { SiCardano } from "react-icons/si";

interface UserTokenProps {
  ada?: number;
  mane?: number;
  policyIsLoading?: boolean;
}

const dustToWhole = (token: bigint | number, decimals = 2) => {
  if (typeof token === "number") token = Math.round(token);

  const native = Number(BigInt(token) / 1000000n);

  const fixedDecimal = parseFloat(native.toFixed(decimals));

  return fixedDecimal.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const UserTokens: React.FC<UserTokenProps> = ({
  ada,
  mane,
  policyIsLoading,
}) => {
  const spinClass = policyIsLoading ? "animate-spin" : "";

  return (
    <div className="flex flex-col mt-4 gap-4">
      <div className={`flex items-center font-extrabold tracking-wide`}>
        <span className="text-4xl md:text-6xl">
          <SiCardano className={spinClass} />
        </span>
        <span className="ml-4 text-xl">
          {policyIsLoading ? "Loading..." : dustToWhole(ada || 0)}
        </span>
      </div>
      <div className={`flex items-center font-extrabold tracking-wide`}>
        <div className="w-[40px] md:w-fit">
          <Image src={maneImg} alt={"Mane"} width={60} className={spinClass} />
        </div>
        <span className="ml-4 text-xl">
          {policyIsLoading ? "Loading..." : dustToWhole(mane || 0)}
        </span>
      </div>
    </div>
  );
};

export default UserTokens;
