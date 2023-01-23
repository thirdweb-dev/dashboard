import chainListPure from "../public/json/chain-list-mini.json";
import { SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk";
import { ChainListNetworkInfo } from "components/configure-networks/types";
import { EVM_RPC_URL_MAP } from "constants/rpc";
import { isShortNameSupportedNetwork } from "utils/network";

export type ChainListRecord = Record<string, ChainListNetworkInfo>;

export function getChainListRecords() {
  const chainList = chainListPure as any as ChainListNetworkInfo[];

  // records for quick lookup
  const shortNameToNetworkInfo: Record<string, ChainListNetworkInfo> = {};
  const chainIdToNetworkInfo: Record<number, ChainListNetworkInfo> = {};

  for (const network of chainList) {
    // override the RPC URL for supported networks to use thirdweb EVM RPC
    if (isShortNameSupportedNetwork(network.shortName)) {
      network.rpc = [EVM_RPC_URL_MAP[network.chainId as SUPPORTED_CHAIN_ID]];
    }

    shortNameToNetworkInfo[network.shortName] = network;
    chainIdToNetworkInfo[network.chainId] = network;
  }

  return { shortNameToNetworkInfo, chainIdToNetworkInfo };
}
