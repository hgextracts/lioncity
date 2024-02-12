import React from "react";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import jointcut from "../../public/jointcut.png";
import lioncut from "../../public/lioncut.png";
import rainbowcut from "../../public/rainbowcut.png";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-[4rem] w-full px-4 my-[4rem]">
      <div className="flex flex-col justify-between items-start">
        <h1 className="text-2xl">Welcome to</h1>
        <h1 className="text-7xl mb-6 truncate">Lion City</h1>
        <h1 className="text-4xl">A Cannabis</h1>
        <h1 className="text-1xl">Community on the Blockchain</h1>

        <div className="flex gap-5 items-center justify-center my-4">
          <a
            href="https://discord.gg/da4huSHSZe"
            className="text-4xl flex justify-center items-center button"
          >
            <FaDiscord />
          </a>
          <a
            href="https://x.com/LionCityCNFT"
            className="text-4xl flex justify-center items-center button"
          >
            <FaSquareXTwitter />
          </a>
          <a
            href="https://lion-citywellness.com/"
            className="text-2xl underline flex justify-center items-center button"
          >
            Wellness
          </a>
        </div>
      </div>

      <div className="flex items-center justify-center h-full">
        <div className="mr-[-100px]">
          <Image src={jointcut} alt="Joint" priority width={250} />
        </div>
        <div className="">
          <Image src={lioncut} alt="Lion" width={300} priority />
        </div>
        <div className="ml-[-100px]">
          <Image src={rainbowcut} alt="Rainbow" width={350} priority />
        </div>
      </div>
    </div>
  );
};

export default Hero;
