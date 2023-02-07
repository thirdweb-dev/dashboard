import { useQueryClient } from "@tanstack/react-query";
import { ThirdwebSDKProvider, useSigner } from "@thirdweb-dev/react";
import { ChainId, SDKOptions, SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk/evm";
import {
  useConfiguredChain,
  useConfiguredChains,
} from "hooks/chains/configureChains";
import { StorageSingleton } from "lib/sdk";
import { ComponentWithChildren } from "types/component-with-children";

export const CustomSDKContext: ComponentWithChildren<{
  desiredChainId?: SUPPORTED_CHAIN_ID | -1;
  options?: SDKOptions;
}> = ({ desiredChainId, options, children }) => {
  const signer = useSigner();
  const queryClient = useQueryClient();
  const networkInfo = useConfiguredChain(desiredChainId || -1);
  const configuredChains = useConfiguredChains();

  return (
    <ThirdwebSDKProvider
      network={desiredChainId || 1}
      signer={signer}
      queryClient={queryClient}
      chains={configuredChains}
      sdkOptions={{
        gasSettings: {
          maxPriceInGwei: 650,
        },
        readonlySettings: networkInfo
          ? {
              chainId: desiredChainId,
              rpcUrl: networkInfo.rpc[0],
            }
          : undefined,
        ...options,
      }}
      storageInterface={StorageSingleton}
    >
      {children}
    </ThirdwebSDKProvider>
  );
};

export const PublisherSDKContext: ComponentWithChildren = ({ children }) => (
  <CustomSDKContext
    desiredChainId={ChainId.Polygon}
    options={{
      gasless: {
        openzeppelin: {
          relayerUrl:
            "https://api.defender.openzeppelin.com/autotasks/dad61716-3624-46c9-874f-0e73f15f04d5/runs/webhook/7d6a1834-dd33-4b7b-8af4-b6b4719a0b97/FdHMqyF3p6MGHw6K2nkLsv",
          relayerForwarderAddress: "0xEbc1977d1aC2fe1F6DAaF584E2957F7c436fcdEF",
        },
        experimentalChainlessSupport: true,
      },
    }}
  >
    {children}
  </CustomSDKContext>
);
