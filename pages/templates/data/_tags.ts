export const TemplateTags = [
  {
    id: "engine",
    displayValue: "Engine",
  },
  {
    id: "unity",
    displayValue: "Unity",
  },
  {
    id: "farcaster",
    displayValue: "Farcaster",
  },
  {
    id: "gaming",
    displayValue: "Gaming",
  },
  {
    id: "typescript",
    displayValue: "TypeScript",
  },
  {
    id: "react",
    displayValue: "React",
  },
  {
    id: "unreal",
    displayValue: "Unreal",
  },
  {
    id: "erc721",
    displayValue: "ERC721",
  },
  {
    id: "erc1155",
    displayValue: "ERC1155",
  },
  {
    id: "erc20",
    displayValue: "ERC20",
  },
  {
    id: "vite",
    displayValue: "Vite",
  },
  {
    id: "nft",
    displayValue: "NFT",
  },
  {
    id: "marketplace",
    displayValue: "Marketplace",
  },
  {
    id: "nft-drop",
    displayValue: "NFT Drop",
  },
  {
    id: "edition-drop",
    displayValue: "edition-drop",
  },
  {
    id: "loyalty-card",
    displayValue: "Loyalty Card",
  },
  {
    id: "signature-minting",
    displayValue: "Signature Minting",
  },
  {
    id: "loyalty",
    displayValue: "Loyalty",
  },
  {
    id: "next-js",
    displayValue: "Next.js",
  },
  {
    id: "vite-js",
    displayValue: "Vite.",
  },
  {
    id: "starter",
    displayValue: "Starter",
  },
  {
    id: "claim-conditions",
    displayValue: "Claim conditions",
  },
  {
    id: "multi-currency",
    displayValue: "Multi-currency",
  },
  {
    id: "buy-&-sell",
    displayValue: "Buy & Sell",
  },
] as const satisfies { id: string; displayValue: string }[];

export type TemplateTagId = (typeof TemplateTags)[number]["id"];
