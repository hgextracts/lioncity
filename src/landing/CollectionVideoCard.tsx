import React from "react";

interface CollectionVideoCardProps {
  videoSrc: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonUrl?: string;
}

const CollectionVideoCard: React.FC<CollectionVideoCardProps> = ({
  videoSrc,
  title,
  subtitle,
  buttonText,
  buttonUrl,
}) => {
  return (
    <div className="flex flex-col place-self-center w-fit rounded-md">
      <video
        width="320"
        height="240"
        className="rounded-md"
        autoPlay
        loop
        muted
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex flex-col items-center gap-2 p-2">
        <h1 className="text-xl font-bold">{title}</h1>
        <h1>{subtitle}</h1>
        {/* Conditionally render the button only if both buttonText and buttonUrl are provided */}
        {buttonText && buttonUrl && (
          <a href={buttonUrl} className="button w-fit">
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default CollectionVideoCard;
