import ListItem from "./ListItem";

const Gangs = () => {
  return (
    <div className="flex flex-col text-xl text-center gap-4 p-4 my-6 items-center">
      <div>
        <h1 className="text-3xl underline">The Gangs of Lion City</h1>
        <h1 className="text-2xl underline">
          A Partnership for Community-driven Projects
        </h1>
      </div>

      <ul className="flex flex-col gap-6 my-4 max-w-4xl">
        <ListItem
          title="CIP-68 Conversion"
          description="Secure your project's future with a new policy number and royalty wallet address on the blockchain. Ownership in its truest sense."
        />
        <ListItem
          title=" Artist Collaboration"
          description=" Allow our talented artists to rejuvenate your project with new
              trait designs, bringing fresh life into your NFTs."
        />
        <ListItem
          title="Focused Expansion"
          description="Introduce new traits without the need to create new NFTs.
            Maintain the exclusivity of your supply while continuing to
            innovate."
        />
        <ListItem
          title="Staking and Leadership"
          description="Build a powerful gang under the leadership of your lion. Our
            unique staking mechanism for gang members, combined with our
            innovative tokenomics, ensures enhanced earning potential for all."
        />
        <ListItem
          title="Holiday Trait Airdrops"
          description="Enjoy special trait airdrops from Lion City as a token of our
            partnership and camaraderie."
        />
        <ListItem
          title="Dedicated Communication"
          description="Each project gets access to a community announcement channel, making it
            easier to highlight events and share updates within the larger Lion
            City community."
        />
      </ul>
    </div>
  );
};

export default Gangs;
