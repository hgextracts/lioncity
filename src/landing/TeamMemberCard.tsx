import React from "react";
import Image, { StaticImageData } from "next/image";
import { FaSquareXTwitter, FaGlobe } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";

interface TeamMemberCardProps {
  name: string;
  roles: string[];
  avatarUrl: StaticImageData;
  twitterUrl?: string;
  githubUrl?: string;
  personalWebsiteUrl?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  roles,
  avatarUrl,
  twitterUrl,
  githubUrl,
  personalWebsiteUrl,
}) => {
  return (
    <div className="flex flex-col items-center bg-shade rounded-md p-4">
      <h3 className="text-xl font-bold underline tracking-wider mb-2">
        <a href="#">{name}</a>
      </h3>
      <Image
        className="rounded-full"
        src={avatarUrl}
        alt={`${name} avatar`}
        width={200}
        height={200}
      />

      <hr className="mt-2" />
      {roles.map((role, index) => (
        <p key={index}>{role}</p>
      ))}
      <ul className="flex gap-4 mt-2 bg-secondary p-2 rounded-md">
        {twitterUrl && (
          <li>
            <a href={twitterUrl} className="text-2xl">
              <FaSquareXTwitter />
            </a>
          </li>
        )}
        {githubUrl && (
          <li>
            <a href={githubUrl} className="text-2xl">
              <FaGithubSquare />
            </a>
          </li>
        )}
        {personalWebsiteUrl && (
          <li>
            <a href={personalWebsiteUrl} className="text-2xl">
              <FaGlobe />
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TeamMemberCard;
