import type { QueryClient } from "@tanstack/query-core";
import { publishedContractQuery } from "components/explore/contract-card";

export type PublishedContractID = `${string}/${string}`;

export interface ExploreCategory {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  contracts: Readonly<PublishedContractID[]>;
}

const POPULAR = {
  id: "popular",
  name: "Popular",
  description: "Contracts that are popular among the community.",
  contracts: [
    "deployer.thirdweb.eth/DropERC721",
    "deployer.thirdweb.eth/Marketplace",
    "unlock-protocol.eth/PublicLock",
  ],
} as const;

const NFTS = {
  id: "nft",
  name: "NFTs",
  description:
    "NFT Collections, Editions, Drops and everything else NFT-related.",
  contracts: [
    "deployer.thirdweb.eth/Multiwrap",
    "deployer.thirdweb.eth/TokenERC721",
    "deployer.thirdweb.eth/TokenERC1155",
    "flairsdk.eth/ERC721CommunityStream",
    "deployer.thirdweb.eth/Pack",
    "doubledev.eth/ERC4907",
    "unlock-protocol.eth/PublicLock",
    "deployer.thirdweb.eth/DropERC721",
  ],
} as const;

const MARKETS = {
  id: "marketplace",
  name: "Marketplaces",
  description:
    "Spin up your own marketplace in minutes with these pre-built contracts.",
  contracts: [
    "deployer.thirdweb.eth/Marketplace",
    "deployer.thirdweb.eth/TokenERC20",
    "deployer.thirdweb.eth/Split",
  ],
} as const;

const DROPS = {
  id: "drops",
  name: "Drops",
  description:
    "NFT Collections, Editions, Drops and everything else NFT-related.",
  contracts: [
    "deployer.thirdweb.eth/DropERC721",
    "deployer.thirdweb.eth/DropERC1155",
    "deployer.thirdweb.eth/SignatureDrop",
    "deployer.thirdweb.eth/DropERC20",
  ],
} as const;
const OSRoyalty = {
  id: "opensea-royalty-filter",
  name: "Opensea Royalty Filter",
  shortName: "OS-RF",
  description: "Contracts that implement the Opensea Royalty Filter.",
  contracts: [
    "deployer.thirdweb.eth/DropERC721_OSRoyaltyFilter",
    "deployer.thirdweb.eth/DropERC1155_OSRoyaltyFilter",
    "deployer.thirdweb.eth/Multiwrap_OSRoyaltyFilter",
    "deployer.thirdweb.eth/Pack_OSRoyaltyFilter",
    "deployer.thirdweb.eth/SignatureDrop_OSRoyaltyFilter",
    "deployer.thirdweb.eth/TokenERC1155_OSRoyaltyFilter",
    "deployer.thirdweb.eth/TokenERC721_OSRoyaltyFilter",
  ],
} as const;

const GOVERNANCE = {
  id: "governance",
  name: "Governance",
  description:
    "Create your own DAO, vote on proposals, and more with these contracts.",
  contracts: [
    "deployer.thirdweb.eth/VoteERC20",
    "deployer.thirdweb.eth/TokenERC20",
  ],
} as const;

const TESTNET = {
  id: "testnet",
  name: "Testnet Only",
  shortName: "Testnet",
  description:
    "Contracts fresh off the presses, available only on testnet for feedback and testing.",
  contracts: [
    "deployer.thirdweb.eth/NFTStake",
    "deployer.thirdweb.eth/TieredDrop",
    "deployer.thirdweb.eth/AirdropERC20",
    "deployer.thirdweb.eth/AirdropERC721",
    "deployer.thirdweb.eth/AirdropERC1155",
  ],
} as const;

const CATEGORIES = {
  [POPULAR.id]: POPULAR,
  [NFTS.id]: NFTS,
  [MARKETS.id]: MARKETS,
  [DROPS.id]: DROPS,
  [GOVERNANCE.id]: GOVERNANCE,
  [OSRoyalty.id]: OSRoyalty,
  [TESTNET.id]: TESTNET,
} as const;

export function getCategory(id: string): ExploreCategory | null {
  if (isExploreCategory(id)) {
    return CATEGORIES[id];
  }
  return null;
}

export function isExploreCategory(
  category: string,
): category is keyof typeof CATEGORIES {
  return category in CATEGORIES;
}

export type ExploreCategoryName = keyof typeof CATEGORIES;

export const EXPLORE_PAGE_DATA = Object.values(CATEGORIES);

export const ALL_CATEGORIES = Object.values(CATEGORIES).map((v) => v.id);

export function prefetchCategory(
  category: ExploreCategory,
  queryClient: QueryClient,
) {
  return Promise.all(
    category.contracts.map((contract) =>
      queryClient.fetchQuery(
        publishedContractQuery(`${contract}/latest`, queryClient),
      ),
    ),
  );
}
