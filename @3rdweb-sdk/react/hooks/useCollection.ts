import { useWeb3 } from "@3rdweb/hooks";
import {
  BundleModule,
  CollectionModule,
  INFTBundleCreateArgs,
  MetadataURIOrObject,
} from "@3rdweb/sdk";
import { BigNumber, BigNumberish } from "ethers";
import { useMemo } from "react";
import { CollectionTokenInput } from "schema/tokens";
import invariant from "ts-invariant";
import { SupportedChainIdToNetworkMap } from "utils/network";
import { convertPropertiesToObject } from "utils/propertiesConverter";
import { removeNull } from "utils/removeNull";
import { assetKeys, bundleKeys, tokenAssetKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useActiveChainId } from "./useActiveChainId";
import { useModuleMetadata } from "./useModule";
import { useSDK } from "./useSDK";

export function useCollectionModule(moduleAddress?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !moduleAddress) {
      return undefined;
    }
    return sdk.getCollectionModule(moduleAddress);
  }, [moduleAddress, sdk]);
}

export function useCollectionModuleMetadata(moduleAddress?: string) {
  return useModuleMetadata(useCollectionModule(moduleAddress));
}

export function useCollectionList(
  moduleAddress?: string,
  actingAddress?: string,
) {
  const collectionModule = useCollectionModule(moduleAddress);
  return useQueryWithNetwork(
    bundleKeys.listWithActor(moduleAddress, actingAddress),
    () => collectionModule?.getAll(actingAddress || undefined),
    {
      enabled: !!collectionModule && !!moduleAddress,
    },
  );
}

export function useTokenList() {
  const activeChainId = useActiveChainId();
  const { address, provider } = useWeb3();

  return useQueryWithNetwork(
    tokenAssetKeys.detail(address),
    async () => {
      invariant(address, "address must be connected");
      invariant(provider, "must have an active provider");
      invariant(activeChainId, "must be on a specific network");

      const chainName = SupportedChainIdToNetworkMap[activeChainId];
      const res = await fetch("/api/tokens", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        } as HeadersInit,
        body: JSON.stringify({ address, chainName }),
      });

      const tokens = await res.json();
      return tokens;
    },
    {
      enabled: !!address && !!provider && !!activeChainId,
    },
  );
}

export function useAssetList() {
  const activeChainId = useActiveChainId();
  const { address, provider } = useWeb3();

  return useQueryWithNetwork(
    assetKeys.detail(address),
    async () => {
      invariant(address, "address must be connected");
      invariant(provider, "must have an active provider");
      invariant(activeChainId, "must be on a specific network");

      const chainName = SupportedChainIdToNetworkMap[activeChainId];
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        } as HeadersInit,
        body: JSON.stringify({ address, chainName }),
      });

      const assets = await res.json();
      return assets;
    },
    {
      enabled: !!address && !!provider && !!activeChainId,
    },
  );
}

// ----------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------

export function useCollectionCreateAndMintMutation(module?: CollectionModule) {
  return useMutationWithInvalidate(
    async (data: CollectionTokenInput) => {
      invariant(module, "module is required");

      const { amount, ...d } = data;

      const metadata = {
        ...d,
        properties: convertPropertiesToObject(d.properties),
      };

      return await module.createAndMint({
        metadata,
        supply: BigNumber.from(amount),
      });
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([bundleKeys.list(module?.address)]);
      },
    },
  );
}

interface IWrapToken {
  tokenContract: string;
  tokenAmount: BigNumberish;
  args: INFTBundleCreateArgs;
}

export function useWrapTokenMutation(module?: BundleModule) {
  const { address } = useWeb3();

  return useMutationWithInvalidate(
    async (data: IWrapToken) => {
      invariant(address, "address must be connected");
      invariant(module, "module must exist");

      const { tokenContract, tokenAmount, args } = data;
      return module.createWithToken(tokenContract, tokenAmount, args);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          bundleKeys.listWithActor(module?.address, removeNull(address)),
          tokenAssetKeys.detail(address),
        ]);
      },
    },
  );
}

interface IUnwrapToken {
  tokenId: string;
  amount: BigNumberish;
}

export function useUnwrapTokenMutation(moduleAddress?: string) {
  const bundleModule = useCollectionModule(moduleAddress);
  const { address } = useWeb3();

  return useMutationWithInvalidate(
    (data: IUnwrapToken) => {
      invariant(bundleModule, "module must exist");
      const { tokenId, amount } = data;
      return bundleModule.unwrapToken(tokenId, amount);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          bundleKeys.listWithActor(moduleAddress, removeNull(address)),
          tokenAssetKeys.detail(address),
        ]);
      },
    },
  );
}

interface IWrapERC721 {
  tokenContract: string;
  tokenId: BigNumberish;
  metadata: MetadataURIOrObject;
}

export function useWrapNFTMutation(module?: BundleModule) {
  const { address } = useWeb3();

  return useMutationWithInvalidate(
    async (data: IWrapERC721) => {
      invariant(address, "address must be connected");
      invariant(module, "module must exist");

      const { tokenContract, tokenId, metadata } = data;
      return module.createWithERC721(tokenContract, tokenId, metadata);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          bundleKeys.listWithActor(module?.address, removeNull(address)),
          assetKeys.detail(address),
        ]);
      },
    },
  );
}

export function useUnwrapNFTMutation(moduleAddress?: string) {
  const bundleModule = useCollectionModule(moduleAddress);
  const { address } = useWeb3();

  return useMutationWithInvalidate(
    (tokenId: string) => {
      invariant(bundleModule, "module must exist");
      return bundleModule.unwrapNFT(tokenId);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          bundleKeys.listWithActor(moduleAddress, removeNull(address)),
          assetKeys.detail(address),
        ]);
      },
    },
  );
}
