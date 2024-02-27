import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddress, useSDK, useSigner } from "@thirdweb-dev/react";
import {
  addContractToMultiChainRegistry,
  getGaslessPolygonSDK,
} from "components/contract-components/utils";
import { useAllChainsData } from "hooks/chains/allChains";
import invariant from "tiny-invariant";

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
