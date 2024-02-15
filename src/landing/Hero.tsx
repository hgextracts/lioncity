import React from "react";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import jointcut from "../../public/jointcut.png";
import lioncut from "../../public/lioncut.png";
import rainbowcut from "../../public/rainbowcut.png";
import ImageRotator from "./ImageRotator";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-[4rem] w-full px-4 my-[4rem]">
      <div className="flex flex-col justify-evenly items-start">
        <div>
          <h1 className="text-2xl">Welcome to</h1>
          <h1 className="text-7xl mb-6 truncate">Lion City</h1>
        </div>
        <div className="mb-4">
          <h1 className="text-4xl">A Cannabis</h1>
          <h1 className="text-1xl">Community on the Blockchain</h1>
        </div>
        <div className="flex gap-[2rem] items-center justify-center bg-linear-secondary-accent p-4 rounded-lg w-fit">
          <a
            href="https://discord.gg/da4huSHSZe"
            className="text-4xl flex justify-center items-center"
          >
            <FaDiscord />
          </a>
          <a
            href="https://x.com/LionCityCNFT"
            className="text-4xl flex justify-center items-center"
          >
            <FaSquareXTwitter />
          </a>
          <a
            href="https://lion-citywellness.com/"
            className="text-2xl underline flex justify-center items-center"
          >
            Wellness
          </a>
        </div>
      </div>

      <ImageRotator />
    </div>
  );
};

export default Hero;
