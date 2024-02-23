import { useQuery } from "@tanstack/react-query";
import { Polygon } from "@thirdweb-dev/chains";
import { ContractWithMetadata } from "@thirdweb-dev/sdk";
import {
  useSupportedChains,
  useSupportedChainsRecord,
} from "hooks/chains/configureChains";
import { getDashboardChainRpc } from "lib/rpc";
import { getEVMThirdwebSDK } from "lib/sdk";
import { useMemo } from "react";
import invariant from "tiny-invariant";

function useMultiChainRegContractList(walletAddress?: string) {
  const configuredChains = useSupportedChains();
  return useQuery(
    ["dashboard-registry", walletAddress, "multichain-contract-list"],
    async () => {
      invariant(walletAddress, "walletAddress is required");
      const polygonSDK = getEVMThirdwebSDK(
        Polygon.chainId,
        getDashboardChainRpc(Polygon),
      );
      const contractList = await polygonSDK.getMultichainContractList(
        walletAddress,
        configuredChains,
      );

      return [...contractList].reverse();
    },
    {
      enabled: !!walletAddress,
    },
  );
}

interface Options {
  onlyMainnet?: boolean;
}

export const useAllContractList = (
  walletAddress: string | undefined,
  { onlyMainnet }: Options = { onlyMainnet: false },
) => {
  const multiChainQuery = useMultiChainRegContractList(walletAddress);

  const configuredChainsRecord = useSupportedChainsRecord();
  const contractList = useMemo(() => {
    const data = multiChainQuery.data || [];

    const mainnets: ContractWithMetadata[] = [];
    const testnets: ContractWithMetadata[] = [];

    data.forEach((net) => {
      if (net.chainId in configuredChainsRecord) {
        if (configuredChainsRecord[net.chainId].testnet) {
          testnets.push(net);
        } else {
          mainnets.push(net);
        }
      }
    });

    mainnets.sort((a, b) => a.chainId - b.chainId);

    if (onlyMainnet) {
      return mainnets;
    }

    testnets.sort((a, b) => a.chainId - b.chainId);
    return mainnets.concat(testnets);
  }, [multiChainQuery.data, onlyMainnet, configuredChainsRecord]);

  return {
    ...multiChainQuery,
    data: contractList,
  };
};
