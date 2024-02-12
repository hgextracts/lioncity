import CollectionVideoCard from "./CollectionVideoCard";

const LionGrid: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h1 className="flex justify-center text-4xl font-bold mb-6">Our NFTs</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CollectionVideoCard
          videoSrc="lionroll.mp4"
          title="Lucky Lions"
          subtitle="Total Supply : 7987"
          buttonText="Jpg.store"
          buttonUrl="https://www.jpg.store/collection/lioncity"
        />
        <CollectionVideoCard
          videoSrc="unluckyroll.mp4"
          title="Foo Dogs"
          subtitle="Total Supply : 1000"
          buttonText="Jpg.store"
          buttonUrl="https://www.jpg.store/collection/lioncity"
        />
        <CollectionVideoCard
          videoSrc="degenroll.mp4"
          title="Degens"
          subtitle="Total Supply : 10,000"
          buttonText="Coming Soon!"
          buttonUrl="/mint"
        />
      </div>
    </div>
  );
};

export default LionGrid;
