import Image from "next/image";

const Residents = () => {
  return (
    <div className="flex flex-col items-center text-center gap-6 my-6">
      <h1 className="text-2xl lg:text-3xl font-semibold">
        Lucky Lions Are jumping in the Wormhole Q2 2024!
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-4 p-2 rounded-md">
        <Image
          width={1376}
          height={1200}
          className="rounded-md w-[300px] border-[1px] border-text justify-self-center"
          src="/ravelion.png"
          alt="newlion"
        />
        <div className="flex flex-col items-center max-w-2xl gap-4">
          <ul className="text-2xl font-bold bg-shade p-4 rounded-md w-fit">
            <li>-New Founders</li>
            <li>-New Goals</li>
            <li>-New Direction</li>
          </ul>
          <p className="text-xl">
            Our OG Lions are in for a major art upgrade! This marks the final
            transformation into Lion City!
          </p>

          <p className="text-xl font-semibold bg-shade rounded-md p-2">
            Join Our city and take the leap into the CIP-68 Wormhole!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Residents;
