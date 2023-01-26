import { SolanaProvider } from "./solana-provider";
import { useEVMContractInfo } from "@3rdweb-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import { ThirdwebProvider, WalletConnector } from "@thirdweb-dev/react";
import { GnosisSafeConnector } from "@thirdweb-dev/react/evm/connectors/gnosis-safe";
import { MagicConnector } from "@thirdweb-dev/react/evm/connectors/magic";
import { EVM_RPC_URL_MAP } from "constants/rpc";
import { useChainInfos } from "hooks/chains/chainInfos";
import { useConfiguredChains } from "hooks/chains/configureChains";
import { useNativeColorMode } from "hooks/useNativeColorMode";
import { StorageSingleton } from "lib/sdk";
import { useMemo } from "react";
import { ComponentWithChildren } from "types/component-with-children";

export const DashboardThirdwebProvider: ComponentWithChildren = ({
  children,
}) => {
  useNativeColorMode();
  const queryClient = useQueryClient();
  const contractInfo = useEVMContractInfo();
  const chain = contractInfo?.chain;
  const configuredChains = useConfiguredChains();

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
            network: chain && {
              rpcUrl: chain.rpc[0],
              chainId: chain.chainId,
            },
            doNotAutoConnect: true,
          },
        }),
      );
    }
    return wc;
  }, [chain]);

  const chainInfos = useChainInfos();

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
      desiredChainId={chain?.chainId}
      chains={configuredChains}
      sdkOptions={{
        chainInfos,
        gasSettings: { maxPriceInGwei: 650 },
        readonlySettings: chain && {
          chainId: chain.chainId,
          rpcUrl: chain.rpc[0],
        },
      }}
      storageInterface={StorageSingleton}
      walletConnectors={walletConnectors}
    >
      <SolanaProvider>{children}</SolanaProvider>
    </ThirdwebProvider>
  );
};
