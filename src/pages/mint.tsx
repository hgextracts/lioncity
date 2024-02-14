import CollectionVideoCard from "@/landing/CollectionVideoCard";

export default function Mint() {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <CollectionVideoCard
        videoSrc="degenroll.mp4"
        title="Degens"
        subtitle="Total Supply : 10,000"
      />
      <h1 className="text-6xl font-extrabold">Coming Soon</h1>
    </div>
  );
}
