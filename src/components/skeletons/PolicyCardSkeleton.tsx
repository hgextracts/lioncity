import React from "react";

const PolicyCardSkeleton: React.FC = () => {
  return (
    <div className="col-span-1 h-full bg-radial-secondary-shade-opposite p-4 rounded-md animate-pulse">
      <div className="flex flex-col items-center justify-around text-center h-full gap-2">
        <div className="bg-gray-300 rounded-lg w-full h-40"></div>{" "}
        {/* Image placeholder */}
        <div className="space-y-2">
          <div className="bg-gray-300 h-6 w-3/4 mx-auto"></div>{" "}
          {/* Text placeholder */}
          <div className="bg-gray-300 h-6 w-1/2 mx-auto"></div>{" "}
          {/* Policy ID placeholder */}
          <div className="bg-gray-300 h-6 w-1/4 mx-auto"></div>{" "}
          {/* Holding placeholder */}
        </div>
        <div className="bg-gray-300 h-10 w-3/4 mx-auto rounded-md"></div>{" "}
        {/* Button placeholder */}
      </div>
    </div>
  );
};

export default PolicyCardSkeleton;
