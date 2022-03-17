import * as z from "zod";
import {
  integer,
  MakeInputOutput,
  optionalFileOrString,
  optionalString,
  optionalURL,
  percentageToBps,
} from "./shared";

const BaseContractSchema = z.object({
  name: z.string().nonempty({ message: "A name is required." }),
  description: optionalString,
  image: optionalFileOrString,
  externalLink: optionalURL,
});

const BaseTokenContractSchema = BaseContractSchema.extend({
  sellerFeeBasisPoints: percentageToBps,
  feeRecipient: optionalString,
});

export type BaseContractInput = z.infer<typeof BaseContractSchema>;
export type BaseContractOutput = MakeInputOutput<BaseContractInput>;

// protocol adds nothing special
export const ProtocolContractSchema = BaseContractSchema;
// shema for protocol
export type ProtocolContractInput = z.infer<typeof ProtocolContractSchema>;
export type ProtocolContractOutput = MakeInputOutput<ProtocolContractInput>;

// nft adds noting special
export const NftContractSchema = BaseTokenContractSchema.extend({
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
export const NftCollectionContractSchema = BaseTokenContractSchema;
// shema for nft
export type NFTCollectionContractInput = z.infer<
  typeof NftCollectionContractSchema
>;
export type NFTCollectionContractOutput =
  MakeInputOutput<NFTCollectionContractInput>;

// pack adds noting special
export const PackContractSchema = BaseTokenContractSchema;
// shema for pack
export type PackContractInput = z.infer<typeof PackContractSchema>;
export type PackContractOutput = MakeInputOutput<PackContractInput>;

// market adds noting special
export const MarketplaceContractSchema = BaseContractSchema.extend({
  marketFeeBasisPoints: percentageToBps,
});
// shema for market
export type MarketplaceContractInput = z.infer<
  typeof MarketplaceContractSchema
>;
export type MarketplaceContractOutput =
  MakeInputOutput<MarketplaceContractInput>;

// coin adds "symbol"
export const TokenContractSchema = BaseContractSchema.extend({
  symbol: z
    .string()
    .regex(/([a-z])+/i, "Symbol must be all uppercase letters.")
    .max(10, "Symbol cannot exceed 10 characters.")
    .refine((val) => val.toUpperCase())
    .or(z.string().length(0)),
});

// shema for coin
export type TokenContractInput = z.infer<typeof TokenContractSchema>;
export type TokenContractOutput = MakeInputOutput<TokenContractInput>;
export const BundleDropContractSchema = BaseTokenContractSchema.extend({
  baseTokenUri: z.string(),
  symbol: z
    .string()
    .regex(/([a-z])+/i, "Symbol must be all uppercase letters.")
    .max(10, "Symbol cannot exceed 10 characters.")
    .refine((val) => val.toUpperCase())
    .or(z.string().length(0)),
  sellerFeeBasisPoints: percentageToBps.default(0),
  feeRecipient: optionalString,
  primarySaleRecipientAddress: optionalString,
});

export type BundleDropContractInput = z.infer<typeof BundleDropContractSchema>;
export type BundleDropContractOutput = MakeInputOutput<BundleDropContractInput>;

export const DropContractSchema = BundleDropContractSchema.extend({
  // TODO this should be a BigNumberIsh check
  maxSupply: integer,
});

export type DropContractInput = z.infer<typeof DropContractSchema>;
export type DropContractOutput = MakeInputOutput<DropContractInput>;

export const SplitsContractSchema = BaseContractSchema.extend({
  isRoyalty: z.boolean(),
  recipientSplits: z.array(
    z.object({
      address: z.string(),
      shares: z.number(),
    }),
  ),
});

export type SplitsContractInput = z.infer<typeof SplitsContractSchema>;
export type SplitsContractOutput = MakeInputOutput<SplitsContractInput>;

export const VoteContractSchema = BaseContractSchema.extend({
  minimumNumberOfTokensNeededToPropose: z.string(),
  proposalStartWaitTimeInSeconds: z.number(),
  proposalVotingTimeInSeconds: z.number(),
  votingQuorumFraction: z.number(),
  votingTokenAddress: z.string(),
  votingDelay: z.number().optional(),
  votingPeriod: z.number().optional(),
});

export type VoteContractInput = z.infer<typeof VoteContractSchema>;
export type VoteContractOutput = MakeInputOutput<VoteContractInput>;

export type AnyContractInput =
  | NFTContractInput
  | NFTCollectionContractInput
  | PackContractInput
  | MarketplaceContractInput
  | TokenContractInput
  | DropContractInput;

export const AnyContractSchema = z.object({
  name: z.string().nonempty({ message: "A name is required." }),
  description: optionalString,
  image: optionalFileOrString,
  externalLink: optionalURL,
  sellerFeeBasisPoints: percentageToBps.default(0),
  marketFeeBasisPoints: percentageToBps.default(0),
  feeRecipient: optionalString,
  symbol: z
    .string()
    .regex(/([a-z])+/i, "Symbol must be all uppercase letters.")
    .max(10, "Symbol cannot exceed 10 characters.")
    .refine((val) => val.toUpperCase())
    .or(z.string().length(0))
    .optional(),
  baseTokenUri: z.string().optional(),
  maxSupply: integer.optional(),
  primarySaleRecipientAddress: optionalString,
  recipientSplits: z
    .object({
      address: z.string(),
      percentage: z.string(),
    })
    .array()
    .optional(),
  isRoyalty: z.boolean().optional(),
  minimumNumberOfTokensNeededToPropose: z.string().optional(),
  proposalStartWaitTimeInSeconds: z.number().optional(),
  proposalVotingTimeInSeconds: z.number().optional(),
  votingDelay: z.number().optional(),
  votingPeriod: z.number().optional(),
  votingQuorumFraction: z.number().optional(),
  votingTokenAddress: z.string().optional(),
});
