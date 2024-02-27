import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useAddress, useSDK, useSigner } from "@thirdweb-dev/react";
import {
  addContractToMultiChainRegistry,
  getGaslessPolygonSDK,
} from "components/contract-components/utils";
import { useAllChainsData } from "hooks/chains/allChains";
import invariant from "tiny-invariant";
import { Polygon } from "@thirdweb-dev/chains";
import { ContractWithMetadata } from "@thirdweb-dev/sdk";
import {
  useSupportedChains,
  useSupportedChainsRecord,
} from "hooks/chains/configureChains";
import { getDashboardChainRpc } from "lib/rpc";
import { getEVMThirdwebSDK } from "lib/sdk";
import { useMemo } from "react";

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

type RemoveContractParams = {
  contractAddress: string;
  chainId: number;
};

export function useRemoveContractMutation() {
  const walletAddress = useAddress();
  const signer = useSigner();
  const { chainIdToChainRecord } = useAllChainsData();

  const queryClient = useQueryClient();

  return useMutation(
    async (data: RemoveContractParams) => {
      invariant(
        walletAddress,
        "cannot add a contract without a wallet address",
      );
      invariant(chainIdToChainRecord, "chains not initialzed yet");
      invariant(signer, "no wallet connected");
      invariant(data.chainId, "chainId not provided");

      const { contractAddress, chainId } = data;

      const gaslessPolygonSDK = getGaslessPolygonSDK(signer);
      return await gaslessPolygonSDK.multiChainRegistry?.removeContract({
        address: contractAddress,
        chainId,
      });
    },
    {
      onSettled: () => {
        return queryClient.invalidateQueries(["dashboard-registry"]);
      },
    },
  );
}

type AddContractParams = {
  contractAddress: string;
  chainId: number;
};

export function useAddContractMutation() {
  const sdk = useSDK();
  const walletAddress = useAddress();
  const signer = useSigner();

  const queryClient = useQueryClient();

  return useMutation(
    async (data: AddContractParams) => {
      invariant(walletAddress, "cannot add a contract without an address");
      invariant(sdk, "sdk not provided");

      return await addContractToMultiChainRegistry(
        {
          address: data.contractAddress,
          chainId: data.chainId,
        },
        signer,
      );
    },
    {
      onSettled: () => {
        return queryClient.invalidateQueries(["dashboard-registry"]);
      },
    },
  );
}
