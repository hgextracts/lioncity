import { getMetadataFields } from "@/utils/getMetadataFields";
import Image from "next/image";

interface MetadataCardProps {
  metadata: Record<string, any>;
  policyId: string;
  imageUrl: string;
}

const MetadataCard: React.FC<MetadataCardProps> = ({
  metadata,
  policyId,
  imageUrl,
}) => {
  const fieldsToDisplay = getMetadataFields(policyId);

  return (
    <div className="flex flex-col w-[360px] lg:w-[400px] p-[2rem] rounded-md">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={`${metadata.name} NFT`}
          width={640}
          height={640}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      <h1 className="text-2xl my-2 underline">{metadata.name}</h1>
      <div className="">
        {fieldsToDisplay.map((field) => (
          <div className="grid grid-cols-2" key={field}>
            <strong className="">{field}</strong>
            <span className="">{metadata[field]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetadataCard;
