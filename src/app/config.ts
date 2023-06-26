import { createPublicClient, createWalletClient, custom, http } from "viem";
import { goerli, mainnet } from "viem/chains";
import { CHAIN_ID } from "./assets-config";

const chainIdToNetworkMap = {
  5: goerli,
  1: mainnet,
};

export const publicClient = createPublicClient({
  transport: http(),
  chain: chainIdToNetworkMap[CHAIN_ID],
});

export const walletClient = createWalletClient({
  chain: chainIdToNetworkMap[CHAIN_ID],
  // @ts-ignore
  transport: custom(window.ethereum),
});
