import { QuestionIcon } from "@chakra-ui/icons";
import {
  Avalanche,
  Ethereum,
  Fantom,
  Polygon,
} from "@thirdweb-dev/chain-icons";
import { ChainId, useAddress, useNetwork } from "@thirdweb-dev/react";
import { SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk";
import { useCallback } from "react";

interface NetworkMetadata {
  chainName: string;
  icon: React.ComponentType;
  symbol: string;
  isTestnet: boolean;
  chainId: ChainId;
}

const defaultNetworkMetadata: Record<SUPPORTED_CHAIN_ID, NetworkMetadata> = {
  [ChainId.Mainnet]: {
    chainName: "Ethereum",
    icon: Ethereum,
    symbol: "ETH",
    isTestnet: false,
    chainId: ChainId.Mainnet,
  },
  [ChainId.Rinkeby]: {
    chainName: "Rinkeby",
    icon: Ethereum,
    symbol: "ETH",
    isTestnet: true,
    chainId: ChainId.Rinkeby,
  },
  [ChainId.Goerli]: {
    chainName: "Goerli",
    icon: Ethereum,
    symbol: "ETH",
    isTestnet: true,
    chainId: ChainId.Goerli,
  },
  [ChainId.Polygon]: {
    chainName: "Polygon",
    icon: Polygon,
    symbol: "MATIC",
    isTestnet: false,
    chainId: ChainId.Polygon,
  },
  [ChainId.Mumbai]: {
    chainName: "Mumbai",
    icon: Polygon,
    symbol: "MATIC",
    isTestnet: true,
    chainId: ChainId.Mumbai,
  },
  [ChainId.Fantom]: {
    chainName: "Fantom",
    icon: Fantom,
    symbol: "FTM",
    isTestnet: false,
    chainId: ChainId.Fantom,
  },
  [ChainId.FantomTestnet]: {
    chainName: "Fantom Testnet",
    icon: Fantom,
    symbol: "FTM",
    isTestnet: true,
    chainId: ChainId.Fantom,
  },
  [ChainId.Avalanche]: {
    chainName: "Avalanche",
    icon: Avalanche,
    symbol: "AVAX",
    isTestnet: false,
    chainId: ChainId.Avalanche,
  },
  [ChainId.AvalancheFujiTestnet]: {
    chainName: "Avalanche Fuji Testnet",
    icon: Avalanche,
    symbol: "AVAX",
    isTestnet: true,
    chainId: ChainId.AvalancheFujiTestnet,
  },
  [ChainId.Optimism]: {
    chainName: "Optimism",
    icon: Ethereum,
    symbol: "ETH",
    isTestnet: false,
    chainId: ChainId.Optimism,
  },
  [ChainId.OptimismTestnet]: {
    chainName: "Optimism Testnet",
    icon: Ethereum,
    symbol: "ETH",
    isTestnet: true,
    chainId: ChainId.OptimismTestnet,
  },
  [ChainId.Arbitrum]: {
    chainName: "Arbitrum",
    icon: Ethereum,
    symbol: "ETH",
    isTestnet: false,
    chainId: ChainId.Arbitrum,
  },
  [ChainId.ArbitrumTestnet]: {
    chainName: "Arbitrum Testnet",
    icon: Ethereum,
    symbol: "ETH",
    isTestnet: true,
    chainId: ChainId.ArbitrumTestnet,
  },
};

export function useWeb3() {
  const address = useAddress();
  const [network] = useNetwork();

  const getNetworkMetadata = useCallback(
    (chainId: SUPPORTED_CHAIN_ID) => {
      const cData: NetworkMetadata = {
        chainName: "Unsupported Chain",
        icon: QuestionIcon,
        isTestnet: false,
        symbol: "",
        chainId,
      };
      const c = network.data.chains.find((chain) => chain.id === chainId);

      if (chainId in defaultNetworkMetadata) {
        cData.chainName = defaultNetworkMetadata[chainId].chainName;
        cData.isTestnet = defaultNetworkMetadata[chainId].isTestnet;
        cData.symbol = defaultNetworkMetadata[chainId].symbol;
        cData.icon = defaultNetworkMetadata[chainId].icon;
      } else if (c) {
        cData.chainName = c.name;
        cData.isTestnet = !!c.testnet;
        cData.symbol = c.nativeCurrency?.symbol || "";
      }
      return cData;
    },
    [network],
  );

  return {
    getNetworkMetadata,
    // error: account.error,
    address,
    chainId: network.data.chain?.id,
  };
}
