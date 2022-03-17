import type {
  AuctionListing,
  BundleDropMetadata,
  BundleDropModule,
  BundleMetadata,
  CollectionModule,
  DirectListing,
  DropModule,
  ListingMetadata,
  MarketModule,
  MarketplaceModule,
  NFTMetadataOwner,
  NFTModule,
  PackMetadata,
  PackModule,
} from "@3rdweb/sdk";

export type TTableType<TModule> = TModule extends NFTModule
  ? NFTMetadataOwner
  : TModule extends PackModule
  ? PackMetadata
  : TModule extends MarketModule
  ? ListingMetadata
  : TModule extends MarketplaceModule
  ? AuctionListing | DirectListing
  : TModule extends CollectionModule
  ? BundleMetadata
  : TModule extends DropModule
  ? NFTMetadataOwner
  : TModule extends BundleDropModule
  ? BundleDropMetadata
  : never;
