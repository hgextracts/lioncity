import React from "react";

const UserCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-radial-secondary-shade rounded-md gap-4 p-4 justify-between h-full animate-pulse">
      <div className="grid grid-cols-2 h-full">
        <div className="flex flex-col justify-between">
          <div className="bg-gray-300 rounded-full h-[128px] w-[128px]"></div>
          <div>
            <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
            <div className="bg-gray-300 h-6 w-1/2"></div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="text-right">
            <div className="bg-gray-300 h-6 w-1/4 mb-4"></div>
            <div className="bg-gray-300 h-8 w-3/4 mb-2"></div>
            <div className="bg-gray-300 h-6 w-1/2"></div>
          </div>
          <div className="text-right">
            <div className="bg-gray-300 h-6 w-1/4 mb-2"></div>
            <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
            <div className="bg-gray-300 h-6 w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
