import { alchemyUrlMap, ThirdwebSDKProvider } from "@3rdweb-sdk/react/Provider";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { useSingleQueryParam } from "hooks/useQueryParam";
import React, { useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import {
  getChainIdFromNetwork,
  SupportedChainId,
  SupportedNetwork,
} from "utils/network";

const __CACHE_BUSTER = "tw_v1.0.3";

export const SUPPORTED_CHAINS = [
  SupportedChainId.Mainnet,
  SupportedChainId.Polygon,
  SupportedChainId.Avalanche,
  SupportedChainId.Fantom,
  SupportedChainId.Mumbai,
  SupportedChainId.Rinkeby,
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 24 hours
      cacheTime: 1000 * 60 * 60 * 24,
      // 3 seconds
      staleTime: 1000 * 3,
    },
  },
});

export const Providers: React.FC = ({ children }) => {
  const networkFromUrl = useSingleQueryParam<SupportedNetwork>("network");

  const activeChainId = useMemo(() => {
    return getChainIdFromNetwork(networkFromUrl);
  }, [networkFromUrl]);

  const connectors = useMemo(
    () => ({
      injected: {},
      walletconnect: {
        chainId: activeChainId,
        rpc: alchemyUrlMap,
      },
      walletlink: {
        appName: "thirdweb",
        appLogoUrl: "https://thirdweb.com/favicon.ico",
        darkMode: false,
        url: alchemyUrlMap[activeChainId || 1] || "",
      },
    }),
    [activeChainId],
  );

  useEffect(() => {
    persistQueryClient({
      queryClient,
      buster: __CACHE_BUSTER,
      persistor: createWebStoragePersistor({
        storage: window.localStorage,
      }),
    });
  }, []);

  return (
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={SUPPORTED_CHAINS}
    >
      <QueryClientProvider client={queryClient}>
        <ThirdwebSDKProvider>{children}</ThirdwebSDKProvider>
      </QueryClientProvider>
    </ThirdwebWeb3Provider>
  );
};
