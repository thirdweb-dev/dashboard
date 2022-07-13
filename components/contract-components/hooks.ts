import { ContractId } from "./types";
import { isContractIdBuiltInContract } from "./utils";
import { contractKeys, networkKeys } from "@3rdweb-sdk/react";
import { useMutationWithInvalidate } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import { contractTypeFromContract } from "@3rdweb-sdk/react/hooks/useCommon";
import {
  useAddress,
  useChainId,
  useContract,
  useSDK,
} from "@thirdweb-dev/react";
import {
  ContractType,
  SmartContract,
  detectFeatures,
  extractConstructorParamsFromAbi,
  extractFunctionsFromAbi,
  fetchPreDeployMetadata,
} from "@thirdweb-dev/sdk";
import {
  AbiSchema,
  ContractInfoSchema,
  ExtraPublishMetadata,
  ProfileMetadata,
  PublishedContract,
} from "@thirdweb-dev/sdk/dist/src/schema/contracts/custom";
import { StorageSingleton } from "components/app-layouts/providers";
import { BuiltinContractMap, FeatureIconMap } from "constants/mappings";
import { StaticImageData } from "next/image";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import invariant from "tiny-invariant";
import { z } from "zod";

interface ContractPublishMetadata {
  image: string | StaticImageData;
  name: string;
  description?: string;
  abi?: z.infer<typeof AbiSchema>;
  bytecode?: string;
  deployDisabled?: boolean;
  info?: z.infer<typeof ContractInfoSchema>;
  licenses?: string[];
  compilerMetadata?: Record<string, any>;
}

export function useContractPublishMetadataFromURI(contractId: ContractId) {
  const contractIdIpfsHash = toContractIdIpfsHash(contractId);
  return useQuery<ContractPublishMetadata>(
    ["publish-metadata", contractId],
    async () => {
      if (isContractIdBuiltInContract(contractId)) {
        const details = BuiltinContractMap[contractIdIpfsHash as ContractType];
        return {
          image: details.icon,
          name: details.title,
          deployDisabled: details.comingSoon,
          description: details.description,
        };
      }
      // TODO: Make this nicer.
      invariant(contractId !== "ipfs://undefined", "uri can't be undefined");
      const resolved = await fetchPreDeployMetadata(
        contractIdIpfsHash,
        StorageSingleton,
      );
      if (!resolved) {
        return {
          name: "Loading...",
          image: FeatureIconMap.custom,
        };
      }
      return {
        image: (resolved as any)?.image || FeatureIconMap.custom,
        name: resolved.name,
        description: resolved.info?.title,
        abi: resolved.abi,
        info: resolved.info,
        licenses: resolved.licenses,
        compilerMetadata: resolved.metadata,
      };
    },
    {
      enabled: !!contractId,
    },
  );
}

export function useContractPrePublishMetadata(uri: string, address?: string) {
  const contractIdIpfsHash = toContractIdIpfsHash(uri);
  const sdk = useSDK();
  return useQuery(
    ["pre-publish-metadata", uri, address],
    async () => {
      invariant(
        !isContractIdBuiltInContract(uri),
        "Skipping publish metadata fetch for built-in contract",
      );
      invariant(address, "address is not defined");
      // TODO: Make this nicer.
      invariant(uri !== "ipfs://undefined", "uri can't be undefined");
      return await sdk
        ?.getPublisher()
        .fetchPrePublishMetadata(contractIdIpfsHash, address);
    },
    {
      enabled: !!uri && !!address,
    },
  );
}

export function useReleaserProfile(publisherAddress?: string) {
  const sdk = useSDK();
  return useQuery(
    ["releaser-profile", publisherAddress],
    async () => {
      invariant(publisherAddress, "address is not defined");
      invariant(sdk, "sdk not provided");
      return await sdk.getPublisher().getPublisherProfile(publisherAddress);
    },
    {
      enabled: !!publisherAddress,
    },
  );
}

export function useLatestRelease(
  publisherAddress?: string,
  contractName?: string,
) {
  const sdk = useSDK();
  return useQuery(
    ["latest-release", publisherAddress, contractName],
    async () => {
      invariant(publisherAddress, "address is not defined");
      invariant(contractName, "contract name is not defined");
      invariant(sdk, "sdk not provided");

      const latestRelease = await sdk
        .getPublisher()
        .getLatest(publisherAddress, contractName);

      const contractInfo = await sdk
        .getPublisher()
        .fetchPublishedContractInfo(latestRelease);

      return {
        ...latestRelease,
        version: contractInfo.publishedMetadata.version,
        name: contractInfo.publishedMetadata.name,
        description: contractInfo.publishedMetadata.description,
      };
    },
    {
      enabled: !!publisherAddress && !!contractName,
    },
  );
}

export function useAllVersions(
  publisherAddress?: string,
  contractName?: string,
) {
  const sdk = useSDK();
  return useQuery(
    ["all-releases", publisherAddress, contractName],
    async () => {
      invariant(publisherAddress, "address is not defined");
      invariant(contractName, "contract name is not defined");
      invariant(sdk, "sdk not provided");
      const allVersions = await sdk
        .getPublisher()
        .getAllVersions(publisherAddress, contractName);

      const releasedVersions = [];

      for (let i = 0; i < allVersions.length; i++) {
        const contractInfo = await sdk
          .getPublisher()
          .fetchPublishedContractInfo(allVersions[i]);

        releasedVersions.unshift({
          ...allVersions[i],
          version: contractInfo.publishedMetadata.version,
          name: contractInfo.publishedMetadata.name,
          description: contractInfo.publishedMetadata.description,
        });
      }

      return releasedVersions;
    },
    {
      enabled: !!publisherAddress && !!contractName,
    },
  );
}

export function useReleasedContractInfo(contract: PublishedContract) {
  const sdk = useSDK();
  return useQuery(
    ["released-contract", contract],
    async () => {
      invariant(contract, "contract is not defined");
      invariant(sdk, "sdk not provided");
      return await sdk.getPublisher().fetchPublishedContractInfo(contract);
    },
    {
      enabled: !!contract,
    },
  );
}

export function useReleasedContractFunctions(contract: PublishedContract) {
  const { data: meta } = useContractPublishMetadataFromURI(
    contract.metadataUri,
  );
  return useQuery(
    ["contract-functions", contract.metadataUri],
    async () => {
      invariant(contract, "contract is not defined");
      invariant(meta, "sdk not provided");
      invariant(meta.abi, "sdk not provided");
      return extractFunctionsFromAbi(meta.abi || {}, meta.compilerMetadata);
    },
    {
      enabled: !!contract && !!meta && !!meta.abi,
    },
  );
}

export function useReleasedContractCompilerMetadata(
  contract: PublishedContract,
) {
  return useContractPublishMetadataFromURI(contract.metadataUri);
}

export function useConstructorParamsFromABI(abi?: any) {
  return useMemo(() => {
    return abi ? extractConstructorParamsFromAbi(abi) : [];
  }, [abi]);
}

export function toContractIdIpfsHash(contractId: ContractId) {
  if (
    isContractIdBuiltInContract(contractId) ||
    contractId?.startsWith("ipfs://")
  ) {
    return contractId;
  }
  return `ipfs://${contractId}`;
}

interface PublishMutationData {
  predeployUri: string;
  extraMetadata: ExtraPublishMetadata;
}

export function usePublishMutation() {
  const sdk = useSDK();

  return useMutationWithInvalidate(
    async ({ predeployUri, extraMetadata }: PublishMutationData) => {
      invariant(
        sdk && "getPublisher" in sdk,
        "sdk is not ready or does not support publishing",
      );
      const contractIdIpfsHash = toContractIdIpfsHash(predeployUri);
      await sdk.getPublisher().publish(contractIdIpfsHash, extraMetadata);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([["pre-publish-metadata", _variables.predeployUri]]);
      },
    },
  );
}

export function useEditProfileMutation() {
  const sdk = useSDK();
  const address = useAddress();

  return useMutationWithInvalidate(
    async (data: ProfileMetadata) => {
      invariant(sdk, "sdk not provided");
      await sdk.getPublisher().updatePublisherProfile(data);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([["releaser-profile", address]]);
      },
    },
  );
}

interface ContractDeployMutationParams {
  constructorParams: unknown[];
  addToDashboard?: boolean;
}

export function useCustomContractDeployMutation(ipfsHash: string) {
  const sdk = useSDK();
  const queryClient = useQueryClient();
  const walletAddress = useAddress();
  const chainId = useChainId();

  return useMutation(
    async (data: ContractDeployMutationParams) => {
      invariant(
        sdk && "getPublisher" in sdk,
        "sdk is not ready or does not support publishing",
      );
      return await (
        await sdk.getPublisher()
      ).deployContract(
        ipfsHash.startsWith("ipfs://") ? ipfsHash : `ipfs://${ipfsHash}`,
        data.constructorParams,
      );
    },
    {
      onSuccess: async (contractAddress, variables) => {
        if (variables.addToDashboard) {
          const registry = await sdk?.deployer.getRegistry();
          await registry?.addContract(contractAddress);
        }
        return await queryClient.invalidateQueries([
          ...networkKeys.chain(chainId),
          ...contractKeys.list(walletAddress),
        ]);
      },
    },
  );
}

export function usePublishedContractsQuery(address?: string) {
  const sdk = useSDK();
  return useQuery(
    ["published-contracts", address],
    async () => {
      return address && sdk
        ? (await (await sdk.getPublisher()).getAll(address)).filter((c) => c.id)
        : [];
    },
    {
      enabled: !!address && !!sdk,
    },
  );
}

export function usePublishedMetadataQuery(contractAddress: string) {
  const contractQuery = useContract(contractAddress);
  return useQuery(
    ["published-metadata", contractAddress],
    async () => {
      if (contractQuery?.contract instanceof SmartContract) {
        return await contractQuery.contract.publishedMetadata.get();
      }
      if (contractQuery?.contract) {
        return BuiltinContractMap[
          contractTypeFromContract(contractQuery.contract)
        ];
      }
      return undefined;
    },
    {
      enabled: !!contractAddress && !!contractQuery?.contract,
    },
  );
}

export function useContractFeatures(abi?: any) {
  return useMemo(() => {
    return abi ? detectFeatures(abi) : undefined;
  }, [abi]);
}
