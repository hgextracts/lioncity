import { Lucid, Blockfrost, WalletApi, Network, fromText } from "lucid-cardano";
import { WalletConnectionError } from "@/lib/exceptions";
import { trpc } from "./trpc";

export const initializeLucid = async (
  api: WalletApi
): Promise<{ lucid: Lucid; environment: Network }> => {
  const networkId = await api.getNetworkId();
  console.log("walletUtils networkId", networkId);
  const environment: Network = networkId === 0 ? "Preprod" : "Mainnet";

  const lucid = await Lucid.new(
    new Blockfrost(`/api/blockfrost/${environment.toLowerCase()}`),
    environment
  );

  lucid.selectWallet(api);

  return { lucid, environment };
};

export const enableWalletApi = async (provider: string): Promise<WalletApi> => {
  if (!provider) throw new WalletConnectionError();
  const api = await window.cardano?.[provider]?.enable();
  if (!api) throw new WalletConnectionError();
  return api;
};

export const getAuthDetails = async (lucid: Lucid) => {
  const getNonce = trpc.wallet.generateNonce.useMutation();
  const stakeKey = await lucid.wallet.rewardAddress();
  const address = await lucid.wallet.address();

  const nonceResponse = await getNonce.mutateAsync();
  const nonce = nonceResponse.nonce;

  if (!stakeKey || !nonce || !nonceResponse || !nonceResponse.nonce)
    throw new WalletConnectionError();

  const message = "Sign in to Lion City. Nonce:";
  const hexMessage = fromText(message + nonce);
  const signature = await lucid.newMessage(stakeKey, hexMessage).sign();

  return { message, stakeKey, address, nonce, signature };
};

export function truncateWalletAddress(address: string) {
  if (!address || address.length <= 11) {
    return address;
  }

  return (
    address.substring(0, 5) + "....." + address.substring(address.length - 5)
  );
}
