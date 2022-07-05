import { contractKeys, networkKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useAddress, useSDK, useSigner } from "@thirdweb-dev/react";
import {
  ChainId,
  SUPPORTED_CHAIN_ID,
  ThirdwebSDK,
  ValidContractInstance,
} from "@thirdweb-dev/sdk";
import { alchemyUrlMap } from "components/app-layouts/providers";
import { useMutation, useQueryClient } from "react-query";
import invariant from "tiny-invariant";

export function useContractPublisher<TContract extends ValidContractInstance>(
  contract?: TContract,
) {
  const sdk = useSDK();
  const contractAddress = contract?.getAddress();
  return useQueryWithNetwork(
    contractKeys.detail(contract?.getAddress()),
    async () => {
      invariant(contractAddress, "contract is not defined");
      await sdk
        ?.getPublisher()
        .resolvePublishMetadataFromAddress(contractAddress),},
    {
      enabled: !!contract && !!contract?.getAddress(),
    },
  );
}

export function usePublisherProfile(userAddress?: string) {
  const sdk = useSDK();
  const address = useAddress();
  return useQueryWithNetwork(
    async () => {
      invariant(address, "address is not defined");
      return await sdk?.getPublisher().getPublisherProfile(userAddress || address),
    },
    {
       /* enabled: !!contract && !!contract?.getAddress(), */
    },
  );
}

export function usePublishedContract<TContract extends ValidContractInstance>(
  publisherAddress?: string,
  contractName?: string,
) {
  const sdk = useSDK();
  const address = useAddress();
  return useQueryWithNetwork(
    async () =>
      await sdk?.getPublisher().getLatest(publisherAddress, contractName),
    {
       /* enabled: !!contract && !!contract?.getAddress(), */
    },
  );
}
