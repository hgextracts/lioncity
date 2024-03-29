import { AppError } from "@/lib/exceptions";
import type { Lucid, WalletApi, Network } from "lucid-cardano";

export type WalletDetails = {
  name: string;
  icon: string;
};

export interface WalletContextProps {
  api?: WalletApi;
  setApi: React.Dispatch<React.SetStateAction<WalletApi | undefined>>;
  lucid?: Lucid;
  setLucid: React.Dispatch<React.SetStateAction<Lucid | undefined>>;
  environment?: Network;
  setEnvironment: React.Dispatch<React.SetStateAction<Network | undefined>>;
  walletDetails?: WalletDetails;
  setWalletDetails: React.Dispatch<
    React.SetStateAction<WalletDetails | undefined>
  >;
  addr?: string;
  setAddr: React.Dispatch<React.SetStateAction<string | undefined>>;
  stakeKey?: string;
  setStakeKey: React.Dispatch<React.SetStateAction<string | undefined>>;
  holderStatus?: string;
  setHolderStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
  ada?: number;
  setAda: React.Dispatch<React.SetStateAction<number | undefined>>;
  mane?: number;
  setMane: React.Dispatch<React.SetStateAction<number | undefined>>;
  tMane?: number;
  setTMane: React.Dispatch<React.SetStateAction<number | undefined>>;
  assetsByPolicyId?: AssetsByPolicy;
  setAssetsByPolicyId: React.Dispatch<
    React.SetStateAction<AssetsByPolicy | undefined>
  >;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: AppError | null;
  setError: (error: AppError | null) => void;
}

export type AssetsByPolicy = {
  [policyId: string]: {
    assets: FromUnitResponse[];
    hasAssets: boolean;
  };
};

export interface FromUnitResponse {
  policyId: string;
  assetName: string | null;
  name: string | null;
  label: number | null;
  value: number;
}

export type Asset = {
  asset: string | null;
  policy_id: string;
  asset_name: string;
  fingerprint: string;
  quantity?: string;
  initial_mint_tx_hash?: string;
  mint_or_burn_count?: number;
  onchain_metadata?: {
    name: string;
    image: string;
    [key: string]: string | number;
  };
  onchain_metadata_standard?: string;
  onchain_metadata_extra?: string;
  metadata?: any;
};
