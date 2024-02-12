import React from "react";

interface ListItemProps {
  title: string;
  description: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, description }) => {
  return (
    <li className="flex flex-col items-center">
      <h1 className="font-bold underline w-fit text-2xl bg-shade p-2 rounded-md">
        {title}
      </h1>
      <p>{description}</p>
    </li>
  );
};

export default ListItem;
