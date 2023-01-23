import { SolanaProvider } from "./solana-provider";
import { useActiveNetworkInfo } from "@3rdweb-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import { ThirdwebProvider, WalletConnector } from "@thirdweb-dev/react";
import { GnosisSafeConnector } from "@thirdweb-dev/react/evm/connectors/gnosis-safe";
import { MagicConnector } from "@thirdweb-dev/react/evm/connectors/magic";
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

  return (
    <ThirdwebProvider
      queryClient={queryClient}
      dAppMeta={{
        name: "thirdweb",
        logoUrl: "https://thirdweb.com/favicon.ico",
        isDarkMode: false,
        url: "https://thirdweb.com",
      }}
      chainRpc={{
        ...EVM_RPC_URL_MAP,
        923018: "https://fncy-testnet-seed.fncy.world",
      }}
      desiredChainId={activeNetwork?.chainId}
      sdkOptions={{
        chainInfos: activeNetwork
          ? {
              [activeNetwork?.chainId]: {
                rpc: activeNetwork?.rpcUrl,
              },
            }
          : {},
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
