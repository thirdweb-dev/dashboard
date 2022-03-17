import { ModuleType, Role } from "@3rdweb/sdk";
import { AddressZero } from "@ethersproject/constants";
import { SupportedChainId } from "utils/network";

export const networkKeys = {
  all: ["network"] as const,
  chain: (chainId?: SupportedChainId) => [...networkKeys.all, chainId] as const,
};

export const dashboardKeys = {
  all: ["dashboard"] as const,
  lists: () => [...dashboardKeys.all, "list"] as const,
  list: (address = AddressZero) => [...dashboardKeys.lists(), address] as const,
};

export const appKeys = {
  all: ["apps"] as const,
  lists: () => [...appKeys.all, "list"] as const,
  list: (address = AddressZero) => [...appKeys.lists(), address] as const,
  details: () => [...appKeys.all, "detail"] as const,
  detail: (address: string = AddressZero) =>
    [...appKeys.details(), address] as const,
  royaltyTreasury: (address: string = AddressZero) =>
    [...appKeys.detail(address), "royaltyTreasury"] as const,
  shouldUpgradeToV2: (address: string = AddressZero) =>
    [...appKeys.detail(address), "shouldUpgradeToV2"] as const,
  shouldUpgradeModuleList: (address: string = AddressZero) =>
    [...appKeys.detail(address), "shouldUpgradeModuleList"] as const,
};

export const bundleKeys = {
  all: ["bundle"] as const,
  lists: () => [...bundleKeys.all, "list"] as const,
  list: (address = AddressZero) => [...bundleKeys.lists(), address] as const,
  listWithActor: (address = AddressZero, actingAddress = "") =>
    [...bundleKeys.list(address), { actingAddress }] as const,
};

export const dropKeys = {
  all: ["drop"] as const,
  lists: () => [...dropKeys.all, "list"] as const,
  list: (address = AddressZero) => [...dropKeys.lists(), address] as const,
  details: () => [...dropKeys.all, "detail"] as const,
  detail: (address = AddressZero) => [...dropKeys.details(), address] as const,
  canCreateBatch: (address = AddressZero) =>
    [...dropKeys.details(), address, "canCreateBatch"] as const,
  hasDelayedReveal: (address = AddressZero) =>
    [...dropKeys.detail(), address, "hasDelayedReveal"] as const,
  batchesToReveal: (address = AddressZero) =>
    [...dropKeys.details(), address, "batchesToReveal"] as const,
  supply: (address = AddressZero) =>
    [...dropKeys.detail(address), "supply"] as const,
  activeClaimCondition: (address = AddressZero) =>
    [...dropKeys.detail(address), "activeClaimCondition"] as const,
  balanceOf: (address = AddressZero, userAddress = AddressZero) =>
    [
      ...dropKeys.detail(address),
      "balanceOf",
      { address: userAddress },
    ] as const,
};

export const bundleDropKeys = {
  all: ["bundle-drop"] as const,
  lists: () => [...dropKeys.all, "list"] as const,
  list: (address = AddressZero) => [...dropKeys.lists(), address] as const,
  details: () => [...dropKeys.all, "detail"] as const,
  detail: (address = AddressZero) => [...dropKeys.details(), address] as const,
  activeClaimCondition: (address = AddressZero, tokenId = "-1") =>
    [...dropKeys.detail(address), "activeClaimCondition", { tokenId }] as const,
  owned: (address = AddressZero, ownerAddress = AddressZero) =>
    [...dropKeys.detail(address), "owned", { ownerAddress }] as const,
  balanceOf: (
    address = AddressZero,
    userAddress = AddressZero,
    tokenId = "-1",
  ) =>
    [
      ...dropKeys.detail(address),
      "balanceOf",
      { address: userAddress, tokenId },
    ] as const,
};

export const bundleSignatureKeys = {
  all: ["bundle-signature"] as const,
  lists: () => [...dropKeys.all, "list"] as const,
  list: (address = AddressZero) => [...dropKeys.lists(), address] as const,
  details: () => [...dropKeys.all, "detail"] as const,
  detail: (address = AddressZero) => [...dropKeys.details(), address] as const,
};

export const moduleKeys = {
  all: ["module"] as const,
  lists: () => [...moduleKeys.all, "list"] as const,
  list: (address = AddressZero) => [...moduleKeys.lists(), address] as const,
  listWithFilters: (address = AddressZero, filters?: ModuleType[]) =>
    [...moduleKeys.list(address), { filters }] as const,
  details: () => [...moduleKeys.all, "detail"] as const,
  detail: (address: string = AddressZero) =>
    [...moduleKeys.details(), address] as const,
};

export const moduleRoleKeys = {
  all: ["module_roles"] as const,
  lists: () => [...moduleRoleKeys.all, "list"] as const,
  list: (address = AddressZero) =>
    [...moduleRoleKeys.lists(), address] as const,

  details: () => [...moduleRoleKeys.all, "detail"] as const,
  detail: (address: string = AddressZero, role: Role) =>
    [...moduleRoleKeys.details(), address, { role }] as const,
};

export const nftCollectionKeys = {
  all: ["nft_collection"] as const,
  lists: () => [...nftCollectionKeys.all, "list"] as const,
  list: (address = AddressZero) =>
    [...nftCollectionKeys.lists(), address] as const,
};

export const packKeys = {
  all: ["pack"] as const,
  lists: () => [...packKeys.all, "list"] as const,
  list: (address = AddressZero) => [...packKeys.lists(), address] as const,
  details: () => [...packKeys.all, "detail"] as const,
  detail: (address: string = AddressZero) =>
    [...packKeys.details(), address] as const,
  rewards: (address: string = AddressZero, tokenId = "-1") =>
    [...packKeys.detail(address), "rewards", tokenId] as const,
  linkBalance: (address: string = AddressZero) => [
    ...packKeys.detail(address),
    "linkBalance",
  ],
  balanceOf: (
    address = AddressZero,
    userAddress = AddressZero,
    tokenId = "-1",
  ) =>
    [
      ...packKeys.detail(address),
      "balanceOf",
      { address: userAddress, tokenId },
    ] as const,
};

export const tokenKeys = {
  all: ["token"] as const,
  details: () => [...tokenKeys.all, "detail"] as const,
  decimals: (address: string = AddressZero) =>
    [...tokenKeys.details(), "decimals", address] as const,
  detail: (
    address: string = AddressZero,
    walletAddress: string = AddressZero,
  ) => [...tokenKeys.details(), address, { walletAddress }] as const,
};

export const marketplaceKeys = {
  all: ["marketplace"] as const,
  lists: () => [...marketplaceKeys.all, "list"] as const,
  list: (address = AddressZero) =>
    [...marketplaceKeys.lists(), address] as const,
  detail: (address = AddressZero) => [...marketplaceKeys.all, address] as const,
  isRestricted: (address = AddressZero) =>
    [...marketplaceKeys.detail(address), "isOpen"] as const,
};

export const splitsKeys = {
  all: ["splits"] as const,
  lists: () => [...splitsKeys.all, "list"] as const,
  list: (address = AddressZero) => [...splitsKeys.lists(), address] as const,
};

export const voteKeys = {
  all: ["vote"] as const,
  detail: (address = AddressZero) => [...voteKeys.all, address] as const,
  proposals: (address = AddressZero) =>
    [...voteKeys.detail(address), "proposals"] as const,
  proposal: (proposalId = "-1", address = AddressZero) =>
    [...voteKeys.proposals(address), proposalId] as const,
  balances: (address = AddressZero, addresses = [] as string[]) =>
    [...voteKeys.detail(address), "balances", { addresses }] as const,
  delegations: (address = AddressZero) =>
    [...voteKeys.detail(address), "delegations"] as const,
  delegation: (address = AddressZero, userAddress = AddressZero) =>
    [...voteKeys.delegations(address), userAddress] as const,
  userHasVotedOnProposal: (
    proposalId = "-1",
    address = AddressZero,
    userAddress = AddressZero,
  ) =>
    [
      ...voteKeys.proposal(proposalId, address),
      "hasVotedOnProposal",
      userAddress,
    ] as const,
  canExecuteProposal: (proposalId = "-1", address = AddressZero) =>
    [...voteKeys.proposal(proposalId, address), "canExecute"] as const,
};

export const transferRestrictedKeys = {
  all: ["transferRestricted"] as const,
  detail: (address = AddressZero) =>
    [...transferRestrictedKeys.all, address] as const,
};

export const recipientKeys = {
  all: ["recipient"] as const,
  detail: (address = AddressZero) => [...recipientKeys.all, address] as const,
  token: (address = AddressZero, tokenId = "-1") =>
    [...recipientKeys.detail(address), tokenId] as const,
};

// NFTs owned by wallet for wrapping
export const assetKeys = {
  all: ["assets"] as const,
  detail: (userAddress = AddressZero) =>
    [...assetKeys.all, userAddress] as const,
};

// Tokens owned by wallet for wrapping
export const tokenAssetKeys = {
  all: ["tokenAssets"] as const,
  detail: (userAddress = AddressZero) =>
    [...tokenAssetKeys.all, userAddress] as const,
};

// Link balance
export const linkBalanceKeys = {
  all: ["linkBalance"] as const,
  detail: (userAddress = AddressZero) =>
    [...linkBalanceKeys.all, userAddress] as const,
};

export const cacheKeyMap = {
  [ModuleType.COLLECTION]: bundleKeys,
  [ModuleType.DROP]: dropKeys,
  [ModuleType.BUNDLE_DROP]: bundleDropKeys,
  [ModuleType.BUNDLE_SIGNATURE]: bundleSignatureKeys,
  [ModuleType.NFT]: nftCollectionKeys,
  [ModuleType.PACK]: packKeys,
  [ModuleType.CURRENCY]: tokenKeys,
  [ModuleType.ACCESS_NFT]: {} as never,
  [ModuleType.DYNAMIC_NFT]: {} as never,
  [ModuleType.DATASTORE]: {} as never,
  [ModuleType.MARKET]: marketplaceKeys,
  [ModuleType.MARKETPLACE]: marketplaceKeys,
  [ModuleType.SPLITS]: splitsKeys,
  [ModuleType.VOTE]: {} as never,
};
