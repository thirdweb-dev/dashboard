import { Mumbai, Avalanche, Linea, Arbitrum } from "@thirdweb-dev/chains";

export const allowedNetworks = [
  Mumbai /* Polygon */,
  Avalanche,
  Linea,
  Arbitrum,
];

export const allowedNetworksSlugs = allowedNetworks.map(
  (network) => network.slug,
);

// type for slug of all allowed networks slugs
export type AllowedNetworksSlugs = (typeof allowedNetworksSlugs)[number];
