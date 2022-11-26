import { ChainId, SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk/evm";
import { isBrowser } from "utils/isBrowser";
import { DashboardSolanaNetwork } from "utils/network";

const twRPCUrl = (chainName: string) => {
  return `https://${chainName}.rpc.thirdweb.com`;
};

export const EVM_RPC_URL_MAP: Record<SUPPORTED_CHAIN_ID, string> = addAPIKey({
  [ChainId.Mainnet]:
    process.env.SSR_RPC_MAINNET ||
    process.env.NEXT_PUBLIC_RPC_MAINNET ||
    twRPCUrl("ethererum"),
  [ChainId.Goerli]:
    process.env.SSR_RPC_GOERLI ||
    process.env.NEXT_PUBLIC_RPC_GOERLI ||
    twRPCUrl("goerli"),
  [ChainId.Polygon]:
    process.env.SSR_RPC_POLYGON ||
    process.env.NEXT_PUBLIC_RPC_POLYGON ||
    twRPCUrl("polygon"),
  [ChainId.Mumbai]:
    process.env.SSR_RPC_MUMBAI ||
    process.env.NEXT_PUBLIC_RPC_MUMBAI ||
    twRPCUrl("mumbai"),
  [ChainId.Fantom]:
    process.env.SSR_RPC_FANTOM ||
    process.env.NEXT_PUBLIC_RPC_FANTOM ||
    twRPCUrl("fantom"),
  [ChainId.FantomTestnet]:
    process.env.SSR_RPC_FANTOM_TESTNET ||
    process.env.NEXT_PUBLIC_RPC_FANTOM_TESTNET ||
    twRPCUrl("fantom-testnet"),
  [ChainId.Avalanche]:
    process.env.SSR_RPC_AVALANCHE ||
    process.env.NEXT_PUBLIC_RPC_AVALANCHE ||
    twRPCUrl("avalanche"),
  [ChainId.AvalancheFujiTestnet]:
    process.env.SSR_RPC_AVALANCHE_FUJI_TESTNET ||
    process.env.NEXT_PUBLIC_RPC_AVALANCHE_FUJI_TESTNET ||
    twRPCUrl("avalanche-fuji"),
  [ChainId.Optimism]:
    process.env.SSR_RPC_OPTIMISM ||
    process.env.NEXT_PUBLIC_RPC_OPTIMISM ||
    twRPCUrl("optimism"),
  [ChainId.OptimismGoerli]:
    process.env.SSR_RPC_OPTIMISM_GOERLI ||
    process.env.NEXT_PUBLIC_RPC_OPTIMISM_GOERLI ||
    twRPCUrl("optimism-goerli"),
  [ChainId.Arbitrum]:
    process.env.SSR_RPC_ARBITRUM ||
    process.env.NEXT_PUBLIC_RPC_ARBITRUM ||
    twRPCUrl("arbitrum"),
  [ChainId.ArbitrumGoerli]:
    process.env.SSR_RPC_ARBITRUM_GOERLI ||
    process.env.NEXT_PUBLIC_RPC_ARBITRUM_GOERLI ||
    twRPCUrl("arbitrum-goerli"),
  [ChainId.BinanceSmartChainMainnet]:
    process.env.SSR_RPC_BINANCE_MAINNET ||
    process.env.NEXT_PUBLIC_RPC_BINANCE_MAINNET ||
    twRPCUrl("binance"),
  [ChainId.BinanceSmartChainTestnet]:
    process.env.SSR_RPC_BINANCE_TESTNET ||
    process.env.NEXT_PUBLIC_RPC_BINANCE_TESTNET ||
    twRPCUrl("binance-testnet"),
});

const SOLANA_RPC_URL_MAP: Record<DashboardSolanaNetwork, string> = {
  ...addAPIKey({
    "mainnet-beta": `https://solana-mainnet.g.alchemy.com/v2/`,
    devnet: `https://solana-devnet.g.alchemy.com/v2/`,
  }),
  // override only sol devnet for now, to workaround alchemy issues
  devnet:
    "https://solana-devnet.rpc.thirdweb.com/ed043a51ae23b0db3873f5a38b77ab28175fa496f15d3c53cf70401be89b622a",
};

function addAPIKey<T extends string | number>(
  input: Record<T, string>,
): Record<T, string> {
  const entries = (Object.entries(input) as [T, string][]).map(
    ([key, value]) => [
      key,
      value.endsWith("alchemy.com/v2/")
        ? `${value}${
            isBrowser()
              ? process.env.NEXT_PUBLIC_ALCHEMY_KEY
              : process.env.SSR_ALCHEMY_KEY
          }`
        : value,
    ],
  );

  return Object.fromEntries(entries);
}

// SOLANA
export function getSOLRPC(network: DashboardSolanaNetwork) {
  return SOLANA_RPC_URL_MAP[network];
}

// EVM
export function getEVMRPC(chainId: SUPPORTED_CHAIN_ID) {
  return EVM_RPC_URL_MAP[chainId];
}
