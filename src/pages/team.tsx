import Image from "next/image";
import TeamMemberCard from "../landing/TeamMemberCard";
import hglion from "../../public/hglion.png";
import yomilion from "../../public/yomilion.png";
import jimmylion from "../../public/jimmy.jpg";
import djwelislion from "../../public/djlewis.png";
import headelflion from "../../public/headelfpfp.jpg";
import bearMarket from "../../public/LionCity_cert.png";

const team = () => {
  return (
    <div className="flex flex-col gap-6 items-center my-6">
      <h1 className="text-6xl text-center mb-6">
        Lion City
        <br />
        Team
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TeamMemberCard
          name="Highgrade"
          roles={["Founder", "Learning Dev", "Manufacturer"]}
          avatarUrl={hglion}
          twitterUrl="https://twitter.com/highgradecnft"
          githubUrl="https://github.com/hgextracts"
          personalWebsiteUrl="https://highgrade-solutions.com/"
        />
        <TeamMemberCard
          name="CryptoYomi"
          roles={["Founder", "DAO Agent", "Community Leader"]}
          avatarUrl={yomilion}
          twitterUrl="https://twitter.com/IYomayra"
        />
        <TeamMemberCard
          name="JimmyRubberBoots"
          roles={["Founder", "Game Master", "Community Leader"]}
          avatarUrl={jimmylion}
          twitterUrl="https://twitter.com/Jimmy_Rbr_Boots"
        />
        <TeamMemberCard
          name="DJLewisDaHitMaker"
          roles={["Founder", "Lead Moderator", "Digital Bouncer"]}
          avatarUrl={djwelislion}
          twitterUrl="https://twitter.com/djlewishitmaker"
        />
        <TeamMemberCard
          name="HeadElf"
          roles={["Founder", "Dao Leader", "Advisor"]}
          avatarUrl={headelflion}
          twitterUrl="https://twitter.com/TommyGraybeard"
        />
      </div>

      <div className="py-6 space-y-4 bg-radial-shade-background-opposite flex flex-col rounded-md p-4 mx-4 items-center">
        <h1 className="bg-pr py-3 px-4 rounded-md text-2xl">
          Doxxed by{" "}
          <span className="font-bold hover:underline text-accent">
            <a href="https://bearmarket.io/">Bearmarket.io</a>
          </span>
        </h1>
        <Image
          className="w-[800px] p-2"
          src={bearMarket}
          alt="Logo"
          width={1255}
          height={1000}
        />
      </div>
    </div>
  );
};
export default team;
