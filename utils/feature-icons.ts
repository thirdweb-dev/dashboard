import { ModuleType } from "@3rdweb/sdk";

export const FeatureIconMap: Record<ModuleType, StaticImageData> = {
  [ModuleType.CURRENCY]: require("public/assets/tw-icons/token.png"),
  [ModuleType.NFT]: require("public/assets/tw-icons/nft-collection.png"),
  [ModuleType.COLLECTION]: require("public/assets/tw-icons/bundle.png"),
  [ModuleType.PACK]: require("public/assets/tw-icons/pack.png"),
  [ModuleType.MARKET]: require("public/assets/tw-icons/market.png"),
  [ModuleType.MARKETPLACE]: require("public/assets/tw-icons/market.png"),
  [ModuleType.DROP]: require("public/assets/tw-icons/drop.png"),
  [ModuleType.BUNDLE_DROP]: require("public/assets/tw-icons/drop.png"),
  [ModuleType.BUNDLE_SIGNATURE]: require("public/assets/tw-icons/drop.png"),
  [ModuleType.DATASTORE]: require("public/assets/tw-icons/datastore.png"),
  [ModuleType.DYNAMIC_NFT]: require("public/assets/tw-icons/dynamic-nft.png"),
  [ModuleType.ACCESS_NFT]: require("public/assets/tw-icons/access-nft.png"),
  [ModuleType.SPLITS]: require("public/assets/tw-icons/splits.png"),
  [ModuleType.VOTE]: require("public/assets/tw-icons/vote.png"),
};
