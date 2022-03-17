import invariant from "ts-invariant";
import { SupportedChainId } from "utils/network";

export interface AddEthereumChainParameter {
  // A 0x-prefixed hexadecimal string
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    // 2-6 characters long
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  // Currently ignored.
  iconUrls?: string[];
}

export const POLYGON_NETWORK: AddEthereumChainParameter = {
  chainId: `0x${Number(137).toString(16)}`,
  chainName: "Polygon Mainnet (Matic)",
  nativeCurrency: {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: ["https://polygon-rpc.com"],
  blockExplorerUrls: ["https://polygonscan.com"],
};

export const MUMBAI_NETWORK: AddEthereumChainParameter = {
  chainId: `0x${Number(80001).toString(16)}`,
  chainName: "Polygon Mumbai Testnet",
  nativeCurrency: {
    name: "Matic",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: [
    "https://matic-mumbai.chainstacklabs.com",
    "https://rpc-mumbai.maticvigil.com",
    "https://rpc-mumbai.matic.today",
  ],
  blockExplorerUrls: ["https://mumbai.polygonscan.com"],
};

export const AVALANCHE_NETWORK: AddEthereumChainParameter = {
  chainId: `0x${Number(43114).toString(16)}`,
  chainName: "Avalanche Mainnet C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://cchain.explorer.avax.network"],
};

export const FANTOM_NETWORK: AddEthereumChainParameter = {
  chainId: `0x${Number(250).toString(16)}`,
  chainName: "Fantom Opera",
  nativeCurrency: {
    name: "Fantom",
    symbol: "FTM",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.ftm.tools"],
  blockExplorerUrls: ["https://ftmscan.com"],
};

type ADDABLE_CHAINIDS =
  | SupportedChainId.Mumbai
  | SupportedChainId.Polygon
  | SupportedChainId.Avalanche
  | SupportedChainId.Fantom;

export const NETWORK_ADDITIONS: Record<
  ADDABLE_CHAINIDS,
  AddEthereumChainParameter
> = {
  [SupportedChainId.Polygon]: POLYGON_NETWORK,
  [SupportedChainId.Mumbai]: MUMBAI_NETWORK,
  [SupportedChainId.Avalanche]: AVALANCHE_NETWORK,
  [SupportedChainId.Fantom]: FANTOM_NETWORK,
};

export function getNetworkSetupForChainId(
  chainId: SupportedChainId,
): AddEthereumChainParameter {
  invariant(chainId in NETWORK_ADDITIONS, "unknown network");
  return NETWORK_ADDITIONS[chainId as ADDABLE_CHAINIDS];
}
