import { ListingType, MarketplaceModule } from "@3rdweb/sdk";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { useMemo } from "react";
import {
  MarketplaceAuctionInput,
  MarketplaceListingInput,
} from "schema/marketplaces";
import invariant from "ts-invariant";
import { useModuleMetadata, useSDK } from ".";
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

export function useMarketplaceModule(moduleAddress?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !moduleAddress) {
      return undefined;
    }
    return sdk.getMarketplaceModule(moduleAddress);
  }, [sdk, moduleAddress]);
}

export function useMarketplaceModuleMetadata(moduleAddress?: string) {
  return useModuleMetadata(useMarketplaceModule(moduleAddress));
}

export function useMarketplaceList(moduleAddress?: string) {
  const marketplaceModule = useMarketplaceModule(moduleAddress);
  return useQueryWithNetwork(
    marketplaceKeys.list(moduleAddress),
    () => marketplaceModule?.getAllListings(),
    {
      enabled: !!marketplaceModule && !!moduleAddress,
    },
  );
}

export function useIsMarketplaceRestricted(module?: MarketplaceModule) {
  return useQueryWithNetwork(
    marketplaceKeys.isRestricted(module?.address),
    () => module?.isRestrictedListerRoleOnly(),
    {
      enabled: !!module,
    },
  );
}

export function useSetIsMarketplaceRestricted(module?: MarketplaceModule) {
  return useMutationWithInvalidate(
    (isRestricted: boolean) => {
      invariant(module, "module is required");
      return module.setRestrictedListerRoleOnly(isRestricted);
    },
    {
      onSuccess: (_data, input, _options, invalidate) => {
        return invalidate([marketplaceKeys.isRestricted(module?.address)]);
      },
    },
  );
}

export function useMarketplaceListDirectMutation() {
  const sdk = useSDK();

  return useMutationWithInvalidate(
    async (data: MarketplaceListingInput) => {
      const module = sdk?.getMarketplaceModule(data.marketplace);
      invariant(module, "module is required");
      invariant(data.assetContractAddress, "assetContractAddress is required");
      invariant(
        data.currencyContractAddress,
        "currencyContractAddress is required",
      );

      const token = await sdk
        ?.getTokenModule(data.currencyContractAddress)
        ?.get();

      const { price } = data;
      const buyoutPricePerToken = parseUnits(price, token?.decimals || 18);

      return await module.createDirectListing({
        ...data,
        buyoutPricePerToken,
      });
    },
    {
      onSuccess: (_data, input, _options, invalidate) => {
        const { assetContractAddress, marketplace } = input;

        // we don't know what type the listing came from so we need to refresh all
        return invalidate([
          // invalidate the marketplace we listed to since it has a new item
          marketplaceKeys.list(marketplace),
          // invalidate all the possible asset contracts
          nftCollectionKeys.list(assetContractAddress),
          dropKeys.list(assetContractAddress),
          bundleKeys.list(assetContractAddress),
          packKeys.list(assetContractAddress),
        ]);
      },
    },
  );
}

export function useMarketplaceListAuctionMutation() {
  const sdk = useSDK();

  return useMutationWithInvalidate(
    async (data: MarketplaceAuctionInput) => {
      const module = sdk?.getMarketplaceModule(data.marketplace);
      invariant(module, "module is required");
      invariant(data.assetContractAddress, "assetContractAddress is required");
      invariant(
        data.currencyContractAddress,
        "currencyContractAddress is required",
      );

      const token = await sdk
        ?.getTokenModule(data.currencyContractAddress)
        ?.get();

      const { price, quantity } = data;
      const buyoutPricePerToken = parseUnits(price, token?.decimals || 18).div(
        quantity,
      );

      const { reservePricePerToken: reservePrice } = data;
      const reservePricePerToken = parseUnits(
        reservePrice,
        token?.decimals || 18,
      ).div(quantity);

      return await module.createAuctionListing({
        ...data,
        buyoutPricePerToken,
        reservePricePerToken,
      });
    },
    {
      onSuccess: (_data, input, _options, invalidate) => {
        const { assetContractAddress, marketplace } = input;

        // we don't know what type the listing came from so we need to refresh all
        return invalidate([
          // invalidate the marketplace we listed to since it has a new item
          marketplaceKeys.list(marketplace),
          // invalidate all the possible asset contracts
          nftCollectionKeys.list(assetContractAddress),
          dropKeys.list(assetContractAddress),
          bundleKeys.list(assetContractAddress),
          packKeys.list(assetContractAddress),
        ]);
      },
    },
  );
}

interface UnlistingInput {
  listingId: string;
  listingType: ListingType;
  tokenContract: string;
}

export function useMarketplaceUnlistMutation(module?: MarketplaceModule) {
  return useMutationWithInvalidate(
    async ({ listingId, listingType }: UnlistingInput) => {
      invariant(module, "module is required");

      if (listingType === ListingType.Auction) {
        return await module.cancelAuctionListing(listingId);
      } else {
        return await module.cancelDirectListing(listingId);
      }
    },
    {
      onSuccess: (_data, input, _options, invaldiate) => {
        const { tokenContract } = input;

        // we don't know what type the listing came from so we need to refresh all
        return invaldiate([
          // invalidate the market we listed to since it has a new item
          marketplaceKeys.list(module?.address),
          // invalidate all the possible asset contracts
          nftCollectionKeys.list(tokenContract),
          dropKeys.list(tokenContract),
          bundleKeys.list(tokenContract),
          packKeys.list(tokenContract),
        ]);
      },
    },
  );
}

interface ListingBuyInput {
  listingId: string;
  amount?: BigNumberish;
}

export function useMarketplaceBuyMutation(module?: MarketplaceModule) {
  return useMutationWithInvalidate(
    async ({ listingId, amount = 1 }: ListingBuyInput) => {
      invariant(module, "module is required");
      return await module.buyoutListing(listingId, BigNumber.from(amount));
    },
    {
      onSuccess: (_data, _variables, _options, invaldiate) => {
        invaldiate([marketplaceKeys.list(module?.address)]);
      },
    },
  );
}

export function useAuctionCloseMutation(module?: MarketplaceModule) {
  // close auction mutation
  return useMutationWithInvalidate(
    async (listingId: string) => {
      invariant(module, "module is required");
      return await module.closeAuctionListing(listingId);
    },
    {
      onSuccess: (_data, _variables, _options, invaldiate) => {
        invaldiate([marketplaceKeys.list(module?.address)]);
      },
    },
  );
}
