import { AddressZero } from "@ethersproject/constants";
import * as z from "zod";
import { MakeInputOutput, positiveInt } from "./shared";

export const MarketListingSchema = z.object({
  assetContractAddress: z.string().nonempty(),
  tokenId: z.string().nonempty(),
  marketplace: z
    .string()
    .nonempty({ message: "A market contract is required." }),
  currency: z.string().default(AddressZero),
  price: z.string().default("0"),
  quantity: positiveInt.default(1),
});

export type MarketListingInput = z.infer<typeof MarketListingSchema>;
export type MarketListingOutput = MakeInputOutput<MarketListingInput>;

const MarketplaceListingSchema = z.object({
  marketplace: z
    .string()
    .nonempty({ message: "A marketplace contract is required." }),
  assetContractAddress: z.string().nonempty(),
  currencyContractAddress: z.string().nonempty(),
  tokenId: z.number(),
  quantity: positiveInt.default(1),
  price: z.string().default("0"),
  startTimeInSeconds: z.number(),
  listingDurationInSeconds: z.number(),
});

export type MarketplaceListingInput = z.infer<typeof MarketplaceListingSchema>;
export type MarketplaceListingOutput = MakeInputOutput<MarketplaceListingInput>;

const MarketplaceAuctionSchema = MarketplaceListingSchema.extend({
  reservePricePerToken: z.string().default("0"),
});

export type MarketplaceAuctionInput = z.infer<typeof MarketplaceAuctionSchema>;
export type MarketplaceAuctionOutput = MakeInputOutput<MarketplaceAuctionInput>;

export const ListingSchema = z.object({
  marketplace: z
    .string()
    .nonempty({ message: "A marketplace contract is required." }),
  currencyContractAddress: z.string().default(AddressZero),
  quantity: positiveInt.default(1),
  price: z.string().default("0"),
  startTimeInSeconds: z.number(),
  listingDurationInSeconds: z.number(),
  currency: z.string().default(AddressZero),
  reservePricePerToken: z.string().default("0"),
});

export type ListingInput = z.infer<typeof ListingSchema>;
export type ListingOutput = MakeInputOutput<ListingInput>;
