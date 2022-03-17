import { alchemyUrlMap } from "@3rdweb-sdk/react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { SUPPORTED_CHAINS } from "components/app-layouts/web3-providers";
import { useQuery } from "react-query";
import { SupportedChainId } from "utils/network";
import { dashboardKeys } from "../cache-keys";

export function useProjects() {
  const { address } = useWeb3();

  return useQuery(
    dashboardKeys.list(address),
    async () => {
      const promiseProjects = SUPPORTED_CHAINS.map(async (chainId) => {
        const sdk = new ThirdwebSDK(
          alchemyUrlMap[chainId as unknown as SupportedChainId],
          {
            ipfsGatewayUrl: process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL,
            readOnlyRpcUrl:
              alchemyUrlMap[chainId as unknown as SupportedChainId],
          },
        );

        const apps = await sdk.getApps(address);

        return { chainId, projects: apps };
      });

      const dashboardProjects = await Promise.all(promiseProjects);
      dashboardProjects.sort((a, b) => a.chainId - b.chainId);
      return dashboardProjects;
    },
    {
      enabled: !!address,
    },
  );
}
