import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import {
  BundleDropModule,
  BundleModule,
  DropModule,
  MarketModule,
  MarketplaceModule,
  NFTModule,
  PackModule,
} from "@3rdweb/sdk";
import { useMemo } from "react";
import { Column } from "react-table";
import { TTableType } from "../types";
import { generateBundleDropTableColumns } from "./bundledrop";
import { generateCollectionableColumns } from "./collection";
import { generateDropTableColumns } from "./drop";
import { generateMarketTableColumns } from "./market";
import { generateMarketplaceTableColumns } from "./marketplace";
import { generateNFTableColumns } from "./nft";
import { generatePackColumns } from "./pack";

export function useTableColumns<TModule extends EitherBaseModuleType>(
  module?: TModule,
) {
  return useMemo(() => {
    if (!module) {
      return [];
    }
    if (module instanceof NFTModule) {
      return generateNFTableColumns() as Column<TTableType<TModule>>[];
    }
    if (module instanceof DropModule) {
      return generateDropTableColumns() as Column<TTableType<TModule>>[];
    }
    if (module instanceof BundleDropModule) {
      return generateBundleDropTableColumns() as Column<TTableType<TModule>>[];
    }
    if (module instanceof MarketModule) {
      return generateMarketTableColumns() as Column<TTableType<TModule>>[];
    }
    if (module instanceof MarketplaceModule) {
      return generateMarketplaceTableColumns() as Column<TTableType<TModule>>[];
    }
    if (module instanceof BundleModule) {
      return generateCollectionableColumns() as Column<TTableType<TModule>>[];
    }
    if (module instanceof PackModule) {
      return generatePackColumns() as Column<TTableType<TModule>>[];
    }
    throw new Error(`module table not implemented for contract: ${module}`);
  }, [module]);
}
