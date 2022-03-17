import invariant from "ts-invariant";

export enum SupportedChainId {
  Mainnet = 1,
  Rinkeby = 4,
  Polygon = 137,
  Mumbai = 80001,
  Fantom = 250,
  Avalanche = 43114,
}

export const SupportedChainIdToNetworkMap = {
  [SupportedChainId.Mainnet]: "mainnet",
  [SupportedChainId.Rinkeby]: "rinkeby",
  [SupportedChainId.Polygon]: "polygon",
  [SupportedChainId.Mumbai]: "mumbai",
  [SupportedChainId.Fantom]: "fantom",
  [SupportedChainId.Avalanche]: "avalanche",
} as const;

export type ValueOf<T> = T[keyof T];

export const SupportedNetworkToChainIdMap: Record<
  ValueOf<typeof SupportedChainIdToNetworkMap>,
  SupportedChainId
> = {
  mainnet: SupportedChainId.Mainnet,
  rinkeby: SupportedChainId.Rinkeby,
  polygon: SupportedChainId.Polygon,
  mumbai: SupportedChainId.Mumbai,
  fantom: SupportedChainId.Fantom,
  avalanche: SupportedChainId.Avalanche,
} as const;

export type SupportedNetwork = keyof typeof SupportedNetworkToChainIdMap;

export function getChainIdFromNetwork(
  network?: SupportedNetwork,
): SupportedChainId | undefined {
  if (!network || !SupportedNetworkToChainIdMap[network]) {
    return undefined;
  }

  return SupportedNetworkToChainIdMap[network];
}

export function isSupportedNetwork(network?: string): boolean {
  return network ? network in SupportedNetworkToChainIdMap : false;
}

export function getNetworkFromChainId<T extends SupportedChainId>(
  chainId: T,
): SupportedNetwork {
  invariant(
    chainId && chainId in SupportedChainIdToNetworkMap,
    "chainId not supported",
  );

  return SupportedChainIdToNetworkMap[chainId];
}
