import {
  Avalanche,
  Linea,
  Arbitrum,
  Polygon,
  /*   Mumbai, */
} from "@thirdweb-dev/chains";

export const blankDropAllowedNetworks = [
  /*   Mumbai, */
  Polygon,
  Avalanche,
  Linea,
  Arbitrum,
];

export const blankDropNetworkMapping: Record<
  BlankDropAllowedNetworksSlugs,
  { contractAddress: string; image: string }
> = {
  /*   [Mumbai.slug]: {
    contractAddress: "0x2602E80ce4e70A4A17afDe1C34fFA8A4D3901F72",
    image: "ipfs://QmZE7KNwYiNHLuibdadcmLk2vdaAU9DByqs3fd3vdmkqKy/cookie.webp",
  }, */
  [Polygon.slug]: {
    contractAddress: "0x0",
    image: "ipfs://QmZE7KNwYiNHLuibdadcmLk2vdaAU9DByqs3fd3vdmkqKy/cookie.webp",
  },
  [Avalanche.slug]: {
    contractAddress: "0x0",
    image: "ipfs://QmZE7KNwYiNHLuibdadcmLk2vdaAU9DByqs3fd3vdmkqKy/cookie.webp",
  },
  [Linea.slug]: {
    contractAddress: "0x0",
    image: "ipfs://QmZE7KNwYiNHLuibdadcmLk2vdaAU9DByqs3fd3vdmkqKy/cookie.webp",
  },
  [Arbitrum.slug]: {
    contractAddress: "0x0",
    image: "ipfs://QmZE7KNwYiNHLuibdadcmLk2vdaAU9DByqs3fd3vdmkqKy/cookie.webp",
  },
};

export const blankDropAllowedNetworksSlugs = blankDropAllowedNetworks.map(
  (network) => network.slug,
);

// type for slug of all allowed networks slugs
export type BlankDropAllowedNetworksSlugs =
  (typeof blankDropAllowedNetworksSlugs)[number];
