import { useWeb3 } from "@3rdweb/hooks";
import {
  BundleDropModule,
  ClaimConditionFactory,
  ThirdwebSDK,
} from "@3rdweb/sdk";
import { useMemo } from "react";
import { BundleDropTokenInput } from "schema/tokens";
import invariant from "ts-invariant";
import { convertPropertiesToObject } from "utils/propertiesConverter";
import { bundleDropKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useModuleMetadata } from "./useModule";
import { useSDK } from "./useSDK";

export function useBundleDropModule(
  moduleAddress?: string | null,
  sdk?: ThirdwebSDK,
) {
  const __sdk = useSDK();
  const _sdk = sdk || __sdk;
  return useMemo(() => {
    if (!_sdk || !moduleAddress) {
      return undefined;
    }
    return _sdk.getBundleDropModule(moduleAddress);
  }, [moduleAddress, _sdk]);
}

export function useBundleDropModuleMetadata(moduleAddress?: string | null) {
  return useModuleMetadata(useBundleDropModule(moduleAddress));
}

export function useBundleDropList(moduleAddress?: string) {
  const dropModule = useBundleDropModule(moduleAddress);
  return useQueryWithNetwork(
    bundleDropKeys.list(moduleAddress),
    () => dropModule?.getAll(),
    {
      enabled: !!dropModule && !!moduleAddress,
    },
  );
}

export function useBundleDropActiveClaimCondition(
  moduleAddress?: string,
  tokenId?: string,
) {
  const dropModule = useBundleDropModule(moduleAddress);
  return useQueryWithNetwork(
    bundleDropKeys.activeClaimCondition(moduleAddress, tokenId),
    async () => {
      return await dropModule?.getActiveClaimCondition(tokenId as string);
    },
    {
      enabled: !!dropModule && !!moduleAddress && tokenId !== undefined,
    },
  );
}

export function useBundleDropBalance(moduleAddress?: string, tokenId?: string) {
  const dropModule = useBundleDropModule(moduleAddress);
  const { address } = useWeb3();
  return useQueryWithNetwork(
    bundleDropKeys.balanceOf(moduleAddress, address, tokenId),
    async () => {
      return await dropModule?.balanceOf(address || "", tokenId || "");
    },
    {
      enabled:
        !!dropModule && !!moduleAddress && !!address && tokenId !== undefined,
    },
  );
}

export function useBundleDropOwned(moduleAddress?: string, sdk?: ThirdwebSDK) {
  const dropModule = useBundleDropModule(moduleAddress, sdk);
  const { address } = useWeb3();
  return useQueryWithNetwork(
    bundleDropKeys.owned(moduleAddress, address),
    async () => {
      return await dropModule?.getOwned(address || "");
    },
    {
      enabled: !!dropModule && !!moduleAddress && !!address,
    },
  );
}

// ----------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------

export function useBundleDropMintMutation(module?: BundleDropModule) {
  return useMutationWithInvalidate(
    async (data: BundleDropTokenInput) => {
      invariant(module, "module is required");
      return await module.lazyMintBatch([
        {
          ...data,
          properties: convertPropertiesToObject(data.properties),
        },
      ]);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([bundleDropKeys.list(module?.address)]);
      },
    },
  );
}

export function useBundleDropBatchMint(module?: BundleDropModule) {
  return useMutationWithInvalidate(
    async (data: BundleDropTokenInput[]) => {
      invariant(module, "module is required");
      return await module.createBatch(
        data.map((d) => ({
          ...d,
          properties: convertPropertiesToObject(d.properties),
        })),
      );
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([bundleDropKeys.list(module?.address)]);
      },
    },
  );
}

export function useBundleDropClaimMutation(
  module?: BundleDropModule,
  tokenId?: string,
) {
  return useMutationWithInvalidate(
    async () => {
      invariant(module, "module is required");
      invariant(tokenId, "tokenId is required");
      return await module.claim(tokenId, 1);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          bundleDropKeys.list(module?.address),
          bundleDropKeys.detail(module?.address),
        ]);
      },
    },
  );
}

export function useBundleDropClaimConditionMutation(
  module?: BundleDropModule,
  tokenId?: string,
) {
  return useMutationWithInvalidate(
    async (data: ClaimConditionFactory) => {
      invariant(module, "module is required");
      invariant(tokenId, "tokenId is required");
      return await module.setClaimCondition(tokenId, data);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([bundleDropKeys.detail(module?.address)]);
      },
    },
  );
}
