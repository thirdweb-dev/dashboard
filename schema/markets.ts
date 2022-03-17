import * as z from "zod";
import { AddressZero } from "@ethersproject/constants";
import {
  MakeInputOutput,
  optionalColorHex,
  optionalFileOrString,
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

const BaseListingSchema = z.object({
  marketplace: z
    .string()
    .nonempty({ message: "A marketplace contract is required." }),
  currency: z.string().default(AddressZero),
  price: z.string().default("0"),
  quantity: z.number().default(1),
});

// nft adds noting special
export const NFTListingSchema = BaseListingSchema.extend({});
// shema for nft
export type NFTListingInput = z.infer<typeof NFTListingSchema>;
export type NFTListingOutput = MakeInputOutput<NFTListingInput>;
