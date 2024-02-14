import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { WalletContext } from "@/context/UseWalletContext";
import { policyIdToCollectionName } from "@/utils/policyUtils";
import { PolicyID } from "@/types/policyEnum";
import { useInfiniteQuery } from "@tanstack/react-query";
import AssetCard from "@/components/AssetCard";
import BrowserWallet from "@/wallet/BrowserWallet";
import UserCard from "@/components/UserCard";
import { useFetchAssets } from "@/wallet/hooks/useAssets";
import { AssetsByPolicy } from "@/types/wallet";
import { getTotalValueByPolicy, getUserStatus } from "@/utils/executiveCheck";
import PolicyCard from "@/components/PolicyCard";
import LoginModal from "@/layout/LoginModal";
import Image from "next/image";
import unluckyImage from "../../public/unluckycrop.png";
import luckyImage from "../../public/kingcrop.png";
import degenImage from "../../public/degencrop.png";
import defaultImage from "../../public/lclogo.png";
import { fromText } from "lucid-cardano";
import PolicyCardSkeleton from "../../skeletons/PolicyCardSkeleton";
import UserCardSkeleton from "../../skeletons/UserCardSkeleton";
import Link from "next/link";

const degenHex = fromText("DegensSoon");

const DEFAULT_POLICY_ID = PolicyID.Degens;
const defaultPolicyObject: AssetsByPolicy = {
  [DEFAULT_POLICY_ID]: {
    assets: [
      {
        policyId: DEFAULT_POLICY_ID,
        assetName: "Degen0000",
        name: degenHex,
        label: null,
        value: 0,
      },
    ],
    hasAssets: true,
  },
};

const Dashboard: React.FC = () => {
  const { data: session, status: sessionStatus } = useSession();
  const isLoadingUserData = sessionStatus === "loading";

  const [selectedPolicyId, setSelectedPolicyId] = useState<
    PolicyID | undefined
  >(undefined);

  const { lucid, environment } = useContext(WalletContext);

  const [isModalOpen, setModalOpen] = useState(false);

  const [assetsByPolicyId, setAssetsByPolicyId] =
    useState<AssetsByPolicy>(defaultPolicyObject);

  const { fetchAssets, policyIsLoading } = useFetchAssets();

  useEffect(() => {
    const fetchData = async () => {
      if (lucid) {
        const fetchedAssets = await fetchAssets(lucid);
        setAssetsByPolicyId((prevState) => ({
          ...prevState,
          ...fetchedAssets,
        }));
      }
    };

    fetchData();
  }, [lucid, fetchAssets]);

  useEffect(() => {
    if (!session || !session.user) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [session]);

  const userStatus = getUserStatus(assetsByPolicyId);

  const ada = getTotalValueByPolicy(assetsByPolicyId, PolicyID.LoveLace);
  const mane = getTotalValueByPolicy(assetsByPolicyId, PolicyID.Mane);
  const tMane = getTotalValueByPolicy(assetsByPolicyId, PolicyID.T_Mane);

  const policyImages = {
    [PolicyID.LuckyLions]: luckyImage,
    [PolicyID.FooDogs]: unluckyImage,
    [PolicyID.Degens]: degenImage,
  };

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingAssets,
  } = useInfiniteQuery(
    ["assets", selectedPolicyId],

    async ({ pageParam = 1 }) => {
      if (
        !selectedPolicyId ||
        !assetsByPolicyId?.[selectedPolicyId]?.hasAssets
      ) {
        return [];
      }
      const response = await fetchMetadata(pageParam, selectedPolicyId);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,

      initialData:
        selectedPolicyId && assetsByPolicyId?.[selectedPolicyId]?.hasAssets
          ? {
              pages: [assetsByPolicyId[selectedPolicyId].assets.slice(0, 10)],
              pageParams: [1],
            }
          : undefined,
    }
  );

  const fetchMetadata = async (page: number, policyId: PolicyID) => {
    if (!policyId || !assetsByPolicyId || !environment) return [];

    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const policyAssets = assetsByPolicyId[policyId];
    const utxos = policyAssets.assets;
    const currentUtxos = utxos.slice(startIndex, endIndex);

    const fetchedAssets = await Promise.all(
      currentUtxos.map((utxo) =>
        fetch(
          `/api/blockfrost/${environment.toLowerCase()}/assets/${
            utxo.policyId
          }${utxo.assetName}`
        ).then((r) => r.json())
      )
    );
    console.log(fetchedAssets);
    return fetchedAssets || [];
  };

  const handleAssetSelect = (policyId: PolicyID) => {
    setSelectedPolicyId(policyId);
  };

  if (!session || !session.user) {
    return (
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col gap-6 items-center p-[4rem]">
          <BrowserWallet />
          <Link href="/" className="text-2xl button">
            Return Home
          </Link>
        </div>
      </LoginModal>
    );
  }

  const nftPolicies = [PolicyID.LuckyLions, PolicyID.FooDogs, PolicyID.Degens];
  const safeAssetsByPolicyId = assetsByPolicyId || {};

  return (
    <div className="flex flex-col my-6 w-full">
      <div className="flex flex-col mb-6">
        {session && (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 h-[400px] w-full">
            <div className="md:col-span-2">
              {isLoadingUserData ? (
                <UserCardSkeleton />
              ) : (
                <UserCard
                  image={session.user.image || defaultImage}
                  name={session.user.name || "Anonymous"}
                  address={session.user.address}
                  stakeKey={session.user.stakeKey}
                  policyIsLoading={policyIsLoading}
                  userStatus={userStatus}
                  ada={ada}
                  mane={mane}
                />
              )}
            </div>
            {nftPolicies.map((policyId) =>
              policyIsLoading ? (
                <PolicyCardSkeleton key={policyId} />
              ) : (
                <PolicyCard
                  key={policyId}
                  policyData={
                    safeAssetsByPolicyId[policyId] || {
                      assets: [],
                      hasAssets: false,
                    }
                  }
                  policyId={policyId}
                  image={policyImages[policyId] || defaultImage}
                  onClick={() => handleAssetSelect(policyId)}
                />
              )
            )}
          </div>
        )}
      </div>

      {isLoadingAssets ? (
        <div>Loading assets...</div>
      ) : (
        <>
          {data?.pages.map((page, i) => (
            <div
              className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-2 w-full"
              key={i}
            >
              {page?.map((asset, index) => (
                <AssetCard key={index} asset={asset} />
              ))}
            </div>
          ))}
          {selectedPolicyId && (
            <button
              className="button text-2xl"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : selectedPolicyId &&
                  (data?.pages.length ?? 0) * 10 <
                    (assetsByPolicyId?.[selectedPolicyId]?.assets.length ?? 0)
                ? "Load More"
                : "Nothing more to load"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
