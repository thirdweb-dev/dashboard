import { SolanaProvider } from "./solana-provider";
import {
  EVMContractInfo,
  useEVMContractInfo,
} from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { useQueryClient } from "@tanstack/react-query";
import { ThirdwebProvider, WalletConnector } from "@thirdweb-dev/react";
import { GnosisSafeConnector } from "@thirdweb-dev/react/evm/connectors/gnosis-safe";
import { MagicConnector } from "@thirdweb-dev/react/evm/connectors/magic";
import { useConfiguredChains } from "hooks/chains/configureChains";
import { useNativeColorMode } from "hooks/useNativeColorMode";
import { DASHBOARD_THIRDWEB_API_KEY, getDashboardChainRpc } from "lib/rpc";
import { StorageSingleton } from "lib/sdk";
import { useMemo } from "react";
import { ComponentWithChildren } from "types/component-with-children";

export interface DashboardThirdwebProviderProps {
  contractInfo?: EVMContractInfo;
}

export const DashboardThirdwebProvider: ComponentWithChildren<
  DashboardThirdwebProviderProps
> = ({ children }) => {
  useNativeColorMode();
  const queryClient = useQueryClient();
  const configuredChains = useConfiguredChains();
  const contractInfo = useEVMContractInfo();
  const chain = contractInfo?.chain;

  const rpcUrls = useMemo(() => {
    const record: Record<number, string> = {};
    for (const _chain of configuredChains) {
      record[_chain.chainId] = getDashboardChainRpc(_chain);
    }
    return record;
  }, [configuredChains]);

  const walletConnectors = useMemo(() => {
    let wc: WalletConnector[] = [
      "metamask",
      "walletConnect",
      "walletLink",
      new GnosisSafeConnector({}),
    ];
    if (process.env.NEXT_PUBLIC_MAGIC_KEY) {
      wc = wc.concat(
        new MagicConnector({
          options: {
            apiKey: process.env.NEXT_PUBLIC_MAGIC_KEY,
            rpcUrls,
            network: chain
              ? {
                  rpcUrl: getDashboardChainRpc(chain),
                  chainId: chain.chainId,
                }
              : undefined,
            doNotAutoConnect: true,
          },
        }),
      );
    }
    return wc;
  }, [chain, rpcUrls]);

  return (
    <ThirdwebProvider
      queryClient={queryClient}
      dAppMeta={{
        name: "thirdweb",
        logoUrl: "https://thirdweb.com/favicon.ico",
        isDarkMode: false,
        url: "https://thirdweb.com",
      }}
      activeChain={chain?.chainId}
      supportedChains={configuredChains}
      sdkOptions={{
        gasSettings: { maxPriceInGwei: 650 },
        readonlySettings: chain
          ? {
              chainId: chain.chainId,
              rpcUrl: getDashboardChainRpc(chain),
            }
          : undefined,
      }}
      thirdwebApiKey={DASHBOARD_THIRDWEB_API_KEY}
      storageInterface={StorageSingleton}
      walletConnectors={walletConnectors}
    >
      <SolanaProvider>{children}</SolanaProvider>
    </ThirdwebProvider>
  );
};
