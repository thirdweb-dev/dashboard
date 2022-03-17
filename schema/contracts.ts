import * as z from "zod";
import {
  MakeInputOutput,
  optionalFileOrString,
  optionalString,
  optionalURL,
  percentageToBps,
} from "./shared";
/* Opensea contract meta, aka: minimum we want to support
{
  "name": "OpenSea Creatures",
  "description": "OpenSea Creatures are adorable aquatic beings primarily for demonstrating what can be done using the OpenSea platform. Adopt one today to try out all the OpenSea buying, selling, and bidding feature set.",
  "image": "https://openseacreatures.io/image.png",
  "external_link": "https://openseacreatures.io",
  "seller_fee_basis_points": 100, # Indicates a 1% seller fee.
  "fee_recipient": "0xA97F337c39cccE66adfeCB2BF99C1DdC54C2D721" # Where seller fees will be paid to.
}
*/

const BaseContractSchema = z.object({
  name: z.string().nonempty({ message: "A name is required." }),
  description: optionalString,
  image: optionalFileOrString,
  external_link: optionalURL,
  seller_fee_basis_points: percentageToBps.optional(),
  fee_recipient: optionalString,
});

export type BaseContractInput = z.infer<typeof BaseContractSchema>;
export type BaseContractOutput = MakeInputOutput<BaseContractInput>;

// protocol adds nothing special
export const ProtocolContractSchema = BaseContractSchema;
// shema for protocol
export type ProtocolContractInput = z.infer<typeof ProtocolContractSchema>;
export type ProtocolContractOutput = MakeInputOutput<ProtocolContractInput>;

// nft adds noting special
export const NftContractSchema = BaseContractSchema.extend({
  symbol: z
    .string()
    .regex(/([a-z])+/i, "Symbol must be all uppercase letters.")
    .max(10, "Symbol cannot exceed 10 characters.")
    .refine((val) => val.toUpperCase())
    .or(z.string().length(0))
    .optional(),
});
// shema for nft
export type NFTContractInput = z.infer<typeof NftContractSchema>;
export type NFTContractOutput = MakeInputOutput<NFTContractInput>;

// nft adds noting special
export const NftCollectionContractSchema = BaseContractSchema;
// shema for nft
export type NFTCollectionContractInput = z.infer<
  typeof NftCollectionContractSchema
>;
export type NFTCollectionContractOutput =
  MakeInputOutput<NFTCollectionContractInput>;

// pack adds noting special
export const PackContractSchema = BaseContractSchema;
// shema for pack
export type PackContractInput = z.infer<typeof PackContractSchema>;
export type PackContractOutput = MakeInputOutput<PackContractInput>;

// market adds noting special
export const MarketContractSchema = BaseContractSchema;
// shema for market
export type MarketContractInput = z.infer<typeof MarketContractSchema>;
export type MarketContractOutput = MakeInputOutput<MarketContractInput>;

// coin adds "symbol"
export const CoinContractSchema = BaseContractSchema.extend({
  symbol: z
    .string()
    .regex(/([a-z])+/i, "Symbol must be all uppercase letters.")
    .max(10, "Symbol cannot exceed 10 characters.")
    .refine((val) => val.toUpperCase())
    .or(z.string().length(0))
    .optional(),
});

// shema for coin
export type CoinContractInput = z.infer<typeof CoinContractSchema>;
export type CoinContractOutput = MakeInputOutput<CoinContractInput>;

export type AnyContractInput =
  | NFTContractInput
  | NFTCollectionContractInput
  | PackContractInput
  | MarketContractInput
  | CoinContractInput;
