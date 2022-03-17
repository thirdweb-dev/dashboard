import { BigNumberish } from "ethers";
import * as z from "zod";
import {
  MakeInputOutput,
  optionalColorHex,
  optionalFileOrString,
  optionalProperties,
  optionalString,
} from "./shared";

const BaseTokenSchema = z.object({
  name: z.string().nonempty({ message: "A name is required." }),
  description: optionalString,
  image: optionalFileOrString,
  external_url: optionalFileOrString,
});
// nft adds noting special
export const NftTokenSchema = BaseTokenSchema.extend({
  animation_url: optionalFileOrString,
  background_color: optionalColorHex,
  properties: optionalProperties,
});
// shema for nft
export type NFTTokenInput = z.infer<typeof NftTokenSchema>;
export type NFTTokenOutput = MakeInputOutput<NFTTokenInput>;

export const CollectionTokenSchema = NftTokenSchema.extend({
  amount: z.string().nonempty(),
});
// shema for collection
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

// nft adds noting special
export const DropTokenSchema = NftTokenSchema.extend({});

export const DelayedRevealSchema = BaseTokenSchema.extend({
  password: z.string().nonempty({ message: "A password is required." }),
  confirmPassword: z
    .string()
    .nonempty({ message: "Please confirm your password." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type DelayedRevealInput = z.infer<typeof DelayedRevealSchema>;

export const RevealSchema = z.object({
  password: z.string().nonempty({ message: "A password is required." }),
});

export type RevealInput = z.infer<typeof RevealSchema>;

// shema for drop
export type DropTokenInput = z.infer<typeof DropTokenSchema>;
export type DropTokenOutput = MakeInputOutput<DropTokenInput>;
export type DropTokenDelayedRevealInput = {
  placeholder: DropTokenInput;
  tokens: DropTokenInput[];
  password: string;
};
export type DropTokenRevealInput = {
  batchId: BigNumberish;
  password: string;
};

// nft adds noting special
export const BundleDropTokenSchema = NftTokenSchema.extend({});
// shema for bundle drop
export type BundleDropTokenInput = z.infer<typeof BundleDropTokenSchema>;
export type BundleDropTokenOutput = MakeInputOutput<DropTokenInput>;

export const WrappedTokenSchema = NftTokenSchema.extend({
  tokenAmount: z.string().nonempty(),
  supply: z.string().nonempty(),
});
// schema for wrapped token
export type WrappedTokenInput = z.infer<typeof WrappedTokenSchema>;
export type WrappedTokenOutput = MakeInputOutput<WrappedTokenInput>;

export const PackTokenSchema = z.object({
  assetContract: z
    .string()
    .nonempty({ message: "contract address is required" }),
  metadata: NftTokenSchema,
  assets: z
    .object({
      tokenId: z.string().nonempty(),
      amount: z.string().nonempty(),
    })
    .array(),
  secondsUntilOpenStart: optionalString,
  rewardsPerOpen: optionalString,
});
// schema for pack
export type PackTokenInput = z.infer<typeof PackTokenSchema>;
export type PackTokenOutput = MakeInputOutput<PackTokenInput>;

export const ProposalTokenSchema = z.object({
  description: z.string().nonempty({ message: "description is required" }),
});

// schema for proposal
export type ProposalTokenInput = z.infer<typeof ProposalTokenSchema>;
export type ProposalTokenOutput = MakeInputOutput<ProposalTokenInput>;
