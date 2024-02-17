import { WalletContext } from "@/context/UseWalletContext";
import LoginModal from "@/layout/LoginModal";
import BrowserWallet from "@/wallet/BrowserWallet";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Dao from "./dao";
import UserCard from "@/components/UserCard";

const Executive: React.FC = () => {
  const { data: session } = useSession();
  const { holderStatus, isLoading, addr, stakeKey, mane, ada } =
    useContext(WalletContext);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!session || !session.user) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [session]);

  if (!session) {
    return (
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col gap-6 items-center p-[4rem]">
          <BrowserWallet />
          <Link href="/">
            <h1 className="text-2xl button">Return Home</h1>
          </Link>
        </div>
      </LoginModal>
    );
  }

  // Display a loading indicator if isLoading is true
  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div>
        {holderStatus === "Executive" ? (
          <div className="flex flex-col items-center text-center p-6 my-8">
            {/* Executive content goes here */}
            <h1 className="text-4xl">Welcome, Executive!</h1>
            <p className="text-2xl my-6 p-4 bg-radial-shade-background-opposite rounded-md">
              This is an exclusive page for you!
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4  w-[80vw] h-full">
              <UserCard
                image={session.user.image || "defaultImage"}
                name={session.user.name || "Anonymous"}
                address={addr}
                stakeKey={stakeKey}
                policyIsLoading={isLoading}
                userStatus={holderStatus}
                ada={ada}
                mane={mane}
              />
              <div className="bg-radial-secondary-shade-opposite rounded-md p-4">
                <h1 className="text-2xl">Test Card</h1>
                <h1 className="text-xl">First test coming soon!</h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center p-6 my-8">
            <h1 className="mb-6 text-6xl">Become an Executive</h1>
            <p className="mb-6 font-bold p-2 bg-radial-shade-background-opposite">
              To access this page, you need to hold specific assets. Please add
              the asset to your wallet to gain executive status.
            </p>
            <Dao />
          </div>
        )}
      </div>
    </div>
  );
};
export default Executive;
