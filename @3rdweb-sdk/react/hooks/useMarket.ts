import { MarketModule } from "@3rdweb/sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { useMemo } from "react";
import { MarketListingInput } from "schema/marketplaces";
import invariant from "ts-invariant";
import {
  bundleKeys,
  dropKeys,
  marketplaceKeys,
  nftCollectionKeys,
  packKeys,
} from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useModuleMetadata } from "./useModule";
import { useSDK } from "./useSDK";

export function useMarketModule(moduleAddress?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !moduleAddress) {
      return undefined;
    }
    return sdk.getMarketModule(moduleAddress);
  }, [moduleAddress, sdk]);
}

export function useMarketModuleMetadata(moduleAddress?: string) {
  return useModuleMetadata(useMarketModule(moduleAddress));
}

export function useMarketList(moduleAddress?: string) {
  const marketModule = useMarketModule(moduleAddress);
  return useQueryWithNetwork(
    marketplaceKeys.list(moduleAddress),
    () => marketModule?.getAll(),
    {
      enabled: !!marketModule && !!moduleAddress,
    },
  );
}

// ----------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------

export function useMarketListMutation() {
  const sdk = useSDK();

  return useMutationWithInvalidate(
    async (data: MarketListingInput) => {
      const module = sdk?.getMarketModule(data.marketplace);
      invariant(module, "module is required");
      invariant(data.assetContractAddress, "assetContractAddress is required");
      const tokenData = await sdk?.getTokenModule(data.currency)?.get();
      return await module.list(
        data.assetContractAddress,
        data.tokenId,
        data.currency,
        parseUnits(data.price, tokenData?.decimals || 18),
        data.quantity,
      );
    },
    {
      onSuccess: (_data, input, _options, invalidate) => {
        // we don't know what type the listing came from so we need to refresh all
        return invalidate([
          // invalidate the market we listed to since it has a new item
          marketplaceKeys.list(input.marketplace),
          // invalidate all the possible asset contracts
          nftCollectionKeys.list(input.assetContractAddress),
          dropKeys.list(input.assetContractAddress),
          bundleKeys.list(input.assetContractAddress),
          packKeys.list(input.assetContractAddress),
        ]);
      },
    },
  );
}

interface UnlistingInput {
  listingId: string;
  amount?: string | number | BigNumber;
  tokenContract: string;
}

export function useMarketUnlistMutation(module?: MarketModule) {
  return useMutationWithInvalidate(
    async ({ listingId, amount = 1 }: UnlistingInput) => {
      invariant(module, "module is required");
      return await module.unlist(listingId, BigNumber.from(amount || 1));
    },
    {
      onSuccess: (_data, variables, _options, invaldiate) => {
        // we don't know what type the listing came from so we need to refresh all
        return invaldiate([
          // invalidate the market we listed to since it has a new item
          marketplaceKeys.list(module?.address),
          // invalidate all the possible asset contracts
          nftCollectionKeys.list(variables.tokenContract),
          dropKeys.list(variables.tokenContract),
          bundleKeys.list(variables.tokenContract),
          packKeys.list(variables.tokenContract),
        ]);
      },
    },
  );
}

interface ListingBuyInput {
  listingId: string;
  amount?: string | number | BigNumber;
}

export function useMarketBuyMutation(module?: MarketModule) {
  return useMutationWithInvalidate(
    async ({ listingId, amount = 1 }: ListingBuyInput) => {
      invariant(module, "module is required");
      return await module.buy(listingId, BigNumber.from(amount || 1));
    },
    {
      onSuccess: (_data, _variables, _options, invaldiate) => {
        invaldiate([marketplaceKeys.list(module?.address)]);
      },
    },
  );
}
