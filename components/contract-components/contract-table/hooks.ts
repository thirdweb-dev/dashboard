import { ContractId } from "./types";
import { useSDK } from "@thirdweb-dev/react";
import { ContractType } from "@thirdweb-dev/sdk";
import { FeatureCardMap } from "constants/mappings";
import { StaticImageData } from "next/image";
import { useMutation, useQuery } from "react-query";
import invariant from "tiny-invariant";

interface ContractPublishMetadata {
  image?: string | StaticImageData;
  name: string;
  abi?: unknown;
  bytecode?: string;
}

export function useContractPublishMetadataFromURI(contractId: ContractId) {
  const sdk = useSDK();
  const contractIdIpfsHash = useContractIdIpfsHash(contractId);
  return useQuery<ContractPublishMetadata>(
    ["publish-metadata", contractId],
    async () => {
      if (contractIdIpfsHash in FeatureCardMap) {
        const details = FeatureCardMap[contractIdIpfsHash as ContractType];
        return {
          image: details.icon,
          name: details.title,
        };
      }
      const resolved = await sdk?.publisher.fetchFullContractMetadata(
        contractIdIpfsHash,
      );
      if (!resolved) {
        return {
          name: "Loading...",
        };
      }
      return {
        name: resolved.name,
        abi: resolved.abi,
        bytecode: resolved.bytecode,
      };
    },
  );
}

export function useContractIdIpfsHash(contractId: ContractId) {
  if (contractId in FeatureCardMap || contractId.startsWith("ipfs://")) {
    return contractId;
  }
  return `ipfs://${contractId}`;
}

export function usePublishMutation() {
  const sdk = useSDK();

  return useMutation((uris: string[]) => {
    invariant(
      sdk && "publisher" in sdk,
      "sdk is not ready or does not support publishing",
    );
    return sdk.publisher.publishBatch(uris);
  });
}
