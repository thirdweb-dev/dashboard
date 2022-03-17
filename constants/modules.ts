import {
  BundleDropModule,
  BundleModule,
  DropModule,
  MarketModule,
  MarketplaceModule,
  ModuleType,
  NFTModule,
  PackModule,
  TokenModule,
  VoteModule,
} from "@3rdweb/sdk";
import { SplitsModule } from "@3rdweb/sdk/dist/modules/royalty";

export type SupportedModule =
  | NFTModule
  | BundleModule
  | TokenModule
  | DropModule
  | BundleDropModule
  | MarketModule
  | MarketplaceModule
  | SplitsModule
  | PackModule
  | VoteModule;

export const SUPPORTED_MODULE_TYPES = [
  ModuleType.NFT,
  ModuleType.BUNDLE,
  ModuleType.TOKEN,
  ModuleType.DROP,
  ModuleType.BUNDLE_DROP,
  ModuleType.BUNDLE_SIGNATURE,
  ModuleType.MARKET,
  ModuleType.MARKETPLACE,
  ModuleType.SPLITS,
  ModuleType.PACK,
  ModuleType.VOTE,
];
