import { NFTModule } from "@3rdweb/sdk";
import { useMemo } from "react";
import { NFTTokenInput } from "schema/tokens";
import invariant from "ts-invariant";
import { convertPropertiesToObject } from "utils/propertiesConverter";
import { nftCollectionKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useModuleMetadata } from "./useModule";
import { useSDK } from "./useSDK";

export function useNftModule(moduleAddress?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !moduleAddress) {
      return undefined;
    }
    return sdk.getNFTModule(moduleAddress);
  }, [moduleAddress, sdk]);
}

export function useNFTModuleMetadata(moduleAddress?: string) {
  return useModuleMetadata(useNftModule(moduleAddress));
}

export function useNftList(moduleAddress?: string) {
  const nftModule = useNftModule(moduleAddress);
  return useQueryWithNetwork(
    nftCollectionKeys.list(moduleAddress),
    () => nftModule?.getAllWithOwner(),
    {
      enabled: !!nftModule && !!moduleAddress,
    },
  );
}

// ----------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------

export function useNftMintMutation(module?: NFTModule) {
  return useMutationWithInvalidate(
    async (data: NFTTokenInput) => {
      invariant(module, "module is required");

      return await module.mint({
        ...data,
        properties: convertPropertiesToObject(data.properties),
      });
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([nftCollectionKeys.list(module?.address)]);
      },
    },
  );
}
