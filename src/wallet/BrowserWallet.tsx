import React, { useContext, useState } from "react";
import { useWallet } from "./hooks/useWallet";
import Image from "next/image";
import { WalletDetails } from "@/types/wallet";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaWallet } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import Modal from "@/layout/Modal";
import { useLiveNetworkManager } from "./hooks/useLiveNetworkManager";
import { WalletContext } from "@/context/UseWalletContext";

interface BrowserWalletModalContentProps {
  wallets: WalletDetails[];
  onSelectWallet: (wallet: WalletDetails) => void;
}

interface BrowserWalletProps {
  textColor: string;
}

const BrowserWalletModalContent: React.FC<BrowserWalletModalContentProps> = ({
  wallets,
  onSelectWallet,
}) => {
  return (
    <div className="flex flex-col p-4 rounded-md text-center">
      <h2 className="text-lg font-bold">Select a Wallet</h2>
      <ul className="flex my-6 gap-6">
        {wallets.map((wallet) => (
          <li
            key={wallet.name}
            className="flex flex-col cursor-pointer items-center"
            onClick={() => onSelectWallet(wallet)}
          >
            <Image
              src={wallet.icon}
              alt={`${wallet.name} icon`}
              className="mx-2 mb-1 hover:animate-bounce"
              width={50}
              height={50}
            />
            <span>{wallet.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BrowserWallet: React.FC<BrowserWalletProps> = ({ textColor }) => {
  const { data: session, status } = useSession();
  const { walletDetails } = useContext(WalletContext);
  const [isActionsModalOpen, setActionsModalOpen] = useState(false);

  useLiveNetworkManager();

  const isLoading = status === "loading";

  const [isModalOpen, setModalOpen] = useState(false);
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  const {
    availableWallets,
    error,
    connectWallet,
    disconnectWallet,
    selectWallet,
  } = useWallet();

  return (
    <div
      className="flex justify-center items-center"
      style={{ color: textColor }}
    >
      {!session && !isLoading && (
        <div className="flex justify-center items-center">
          <button
            onClick={() => signIn("discord")}
            className="flex gap-2 w-full justify-center font-bold bg-linear-primary-secondary p-3 rounded-md"
          >
            Login with
            <span className="text-2xl">
              <FaDiscord />
            </span>
          </button>
        </div>
      )}
      {session && (
        <div className="flex items-center justify-center bg-linear-primary-secondary rounded-l-full rounded-r-full pr-2">
          <Image
            src={session.user.image || ""}
            alt={session.user.name || ""}
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="px-4 text-lg capitalize">{session.user.name}</h1>
          {!walletDetails ? (
            <button
              className="text-2xl"
              onClick={() => {
                connectWallet();
                setModalOpen(true);
              }}
            >
              <FaWallet />
            </button>
          ) : (
            <div className="flex flex-col text-2xl justify-center items-center gap-2 pr-2">
              <button onClick={() => setActionsModalOpen(!isActionsModalOpen)}>
                <FaWallet />
              </button>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isActionsModalOpen}
        onClose={() => setActionsModalOpen(false)}
      >
        <div className="flex flex-col items-center p-4">
          <button
            className="py-2 text-sm font-semibold rounded"
            onClick={() => {
              connectWallet();
              setModalOpen(true); // Assuming this is for connecting and selecting wallets
              setActionsModalOpen(false); // Close the actions modal
            }}
          >
            Change Wallet
          </button>
          <button
            className="py-2 text-sm font-semibold rounded"
            onClick={() => {
              disconnectWallet();
              setActionsModalOpen(false); // Close the actions modal
            }}
          >
            Disconnect Wallet
          </button>
          <button
            className="py-2 text-sm font-semibold rounded"
            onClick={() => {
              signOut();
              setActionsModalOpen(false); // Close the actions modal
            }}
          >
            Logout
          </button>
        </div>
      </Modal>

      {error && <div className="text-red-500">{error}</div>}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <BrowserWalletModalContent
          wallets={availableWallets}
          onSelectWallet={(wallet) => {
            selectWallet(wallet);
            setModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default BrowserWallet;
