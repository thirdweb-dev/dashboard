import { SolanaProvider } from "./solana-provider";
import { useActiveNetworkInfo } from "@3rdweb-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import { Chain, allChains, defaultChains } from "@thirdweb-dev/chains";
import { ThirdwebProvider, WalletConnector } from "@thirdweb-dev/react";
import { GnosisSafeConnector } from "@thirdweb-dev/react/evm/connectors/gnosis-safe";
import { MagicConnector } from "@thirdweb-dev/react/evm/connectors/magic";
import { ChainInfo } from "@thirdweb-dev/sdk";
import { useConfiguredNetworks } from "components/configure-networks/useConfiguredNetworks";
import { EVM_RPC_URL_MAP } from "constants/rpc";
import { useNativeColorMode } from "hooks/useNativeColorMode";
import { StorageSingleton } from "lib/sdk";
import { useMemo } from "react";
import { ComponentWithChildren } from "types/component-with-children";

export const DashboardThirdwebProvider: ComponentWithChildren = ({
  children,
}) => {
  useNativeColorMode();
  const queryClient = useQueryClient();
  const activeNetwork = useActiveNetworkInfo();

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
            rpcUrls: EVM_RPC_URL_MAP,
            network: activeNetwork && {
              rpcUrl: activeNetwork.rpcUrl,
              chainId: activeNetwork.chainId,
            },
            doNotAutoConnect: true,
          },
        }),
      );
    }
    return wc;
  }, [activeNetwork]);

  const configuredNetworks = useConfiguredNetworks();

  // TODO @manan
  // ideally we should save *all* chains in the configured networks, even the default ones
  const allConfiguredChains = configuredNetworks
    // TODO jonas - clean up the way to get the chains from the new chains package (instead of loading them all)
    .map((n) => allChains.find((c) => c.chainId === n.chainId))
    .filter((c) => c !== undefined) as Chain[];

  return (
    <ThirdwebProvider
      queryClient={queryClient}
      dAppMeta={{
        name: "thirdweb",
        logoUrl: "https://thirdweb.com/favicon.ico",
        isDarkMode: false,
        url: "https://thirdweb.com",
      }}
      chainRpc={EVM_RPC_URL_MAP}
      desiredChainId={activeNetwork?.chainId}
      // provide the chains to the provider so that it can add them for you
      chains={[...defaultChains, ...allConfiguredChains]}
      sdkOptions={{
        chainInfos: configuredNetworks.reduce((acc, chain) => {
          acc[chain.chainId] = {
            rpc: chain.rpcUrl,
          };
          return acc;
        }, {} as Record<number, ChainInfo>),
        gasSettings: { maxPriceInGwei: 650 },
        readonlySettings: activeNetwork && {
          chainId: activeNetwork.chainId,
          rpcUrl: activeNetwork.rpcUrl,
        },
      }}
      storageInterface={StorageSingleton}
      walletConnectors={walletConnectors}
    >
      <SolanaProvider>{children}</SolanaProvider>
    </ThirdwebProvider>
  );
};
