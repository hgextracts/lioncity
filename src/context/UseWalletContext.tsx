import React, { createContext, useState, type ReactNode } from "react";
import type { Lucid, Network, WalletApi } from "lucid-cardano";

import { AppError } from "@/lib/exceptions";
import {
  WalletContextProps,
  WalletDetails,
  AssetsByPolicy,
} from "@/types/wallet";

function createNoopSetter<Type>(
  setterName: string
): React.Dispatch<React.SetStateAction<Type>> {
  return () => {
    throw new Error(
      `${setterName} called without a WalletProvider being in the component tree.`
    );
  };
}

export const defaultContextState: WalletContextProps = {
  api: undefined,
  setApi: createNoopSetter<WalletApi | undefined>("setApi"),
  lucid: undefined,
  setLucid: createNoopSetter<Lucid | undefined>("setLucid"),
  environment: undefined,
  setEnvironment: createNoopSetter<Network | undefined>("Network Type"),
  walletDetails: undefined,
  setWalletDetails: createNoopSetter<WalletDetails | undefined>(
    "setWalletDetails"
  ),
  addr: undefined,
  setAddr: createNoopSetter<string | undefined>("setAddr"),
  stakeKey: undefined,
  setStakeKey: createNoopSetter<string | undefined>("setStakeKey"),
  ada: undefined,
  setAda: createNoopSetter<number | undefined>("setAda"),
  mane: undefined,
  setMane: createNoopSetter<number | undefined>("setMane"),
  tMane: undefined,
  setTMane: createNoopSetter<number | undefined>("setTMane"),
  assetsByPolicyId: undefined,
  setAssetsByPolicyId: createNoopSetter<AssetsByPolicy | undefined>(
    "setAssetsByPolicyId"
  ),
  error: null,
  setError: () => {},
};

export const WalletContext =
  createContext<WalletContextProps>(defaultContextState);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [api, setApi] = useState<WalletApi | undefined>(
    defaultContextState.api
  );
  const [lucid, setLucid] = useState<Lucid | undefined>(
    defaultContextState.lucid
  );
  const [environment, setEnvironment] = useState<Network | undefined>(
    defaultContextState.environment
  );
  const [addr, setAddr] = useState<string | undefined>(
    defaultContextState.addr
  );
  const [walletDetails, setWalletDetails] = useState<WalletDetails | undefined>(
    defaultContextState.walletDetails
  );
  const [stakeKey, setStakeKey] = useState<string | undefined>(
    defaultContextState.stakeKey
  );
  const [ada, setAda] = useState<number | undefined>(defaultContextState.ada);
  const [mane, setMane] = useState<number | undefined>(
    defaultContextState.mane
  );
  const [tMane, setTMane] = useState<number | undefined>(
    defaultContextState.tMane
  );
  const [assetsByPolicyId, setAssetsByPolicyId] = useState<
    AssetsByPolicy | undefined
  >(defaultContextState.assetsByPolicyId);
  const [error, setError] = useState<AppError | null>(null);

  const contextValue: WalletContextProps = {
    api,
    setApi,
    lucid,
    setLucid,
    environment,
    setEnvironment,
    addr,
    setAddr,
    walletDetails,
    setWalletDetails,
    stakeKey,
    setStakeKey,
    ada,
    setAda,
    mane,
    setMane,
    tMane,
    setTMane,
    assetsByPolicyId,
    setAssetsByPolicyId,
    error,
    setError,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
