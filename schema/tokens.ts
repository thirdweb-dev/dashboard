import * as z from "zod";
import {
  MakeInputOutput,
  optionalColorHex,
  optionalFileOrString,
  optionalProperties,
  optionalString,
  optionalURL,
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

const BaseTokenSchema = z.object({
  name: z.string().nonempty({ message: "A name is required." }),
  description: optionalString,
  image: optionalFileOrString,
  external_url: optionalURL,
  properties: optionalProperties,
});
// nft adds noting special
export const NftTokenSchema = BaseTokenSchema.extend({
  background_color: optionalColorHex,
});
// shema for nft
export type NFTTokenInput = z.infer<typeof NftTokenSchema>;
export type NFTTokenOutput = MakeInputOutput<NFTTokenInput>;

export const CollectionTokenSchema = BaseTokenSchema.extend({
  amount: z.string().nonempty(),
});
// shema for nft
export type CollectionTokenInput = z.infer<typeof CollectionTokenSchema>;
export type CollectionTokenOutput = MakeInputOutput<CollectionTokenInput>;

export const CurrencyTokenToSchema = z.object({
  to: z.string().nonempty({ message: "address is required" }),
  amount: z.string().nonempty(),
});

export const CurrencyTokenSchema = z.object({
  amount: z.string().nonempty(),
});
export type CurrencyTokenInput = z.infer<typeof CurrencyTokenSchema>;
export type CurrencyTokenOutput = MakeInputOutput<CurrencyTokenInput>;

// union of all inputs
export type AnyTokenInput = NFTTokenInput;
