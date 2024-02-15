import React from "react";
import Image from "next/image";

interface StakingPartnerCardProps {
  imageUrl: string;
  altText: string;
  title: string;
  descriptions: string[];
  linkText: string;
  linkUrl: string;
}

const StakingPartnerCard: React.FC<StakingPartnerCardProps> = ({
  imageUrl,
  altText,
  title,
  descriptions,
  linkText,
  linkUrl,
}) => {
  return (
    <div className="flex flex-col bg-radial-secondary-shade p-4 rounded-md">
      <h3 className="text-2xl font-bold tracking-wider mb-2">{title}</h3>
      <Image
        className="mb-2"
        src={imageUrl}
        alt={altText}
        width={150}
        height={150}
      />

      {descriptions.map((description, index) => (
        <p
          key={index}
          className={`${index === descriptions.length - 1 ? "mb-4" : ""}`}
        >
          {description}
        </p>
      ))}
      <a className="button" href={linkUrl}>
        {linkText}
      </a>
    </div>
  );
};

export default StakingPartnerCard;
