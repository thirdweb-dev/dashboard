import {
  useMarketplaceList,
  useMarketplaceModule,
  useMarketplaceModuleMetadata,
} from "@3rdweb-sdk/react/hooks/useMarketplace";
import { ListingType } from "@3rdweb/sdk";
import { AppLayout } from "components/app-layouts/app";
import { ModuleLayout } from "components/module-pages/module-layout";
import { ModuleItemsTable } from "components/module-pages/table";
import { BigNumber } from "ethers";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React, { useMemo } from "react";

const MarketPage: ConsolePage = () => {
  const marketplaceAddress = useSingleQueryParam("marketplace");
  const module = useMarketplaceModule(marketplaceAddress);
  const metadata = useMarketplaceModuleMetadata(marketplaceAddress);
  const data = useMarketplaceList(marketplaceAddress);
  const { Track } = useTrack({
    page: "marketplace",
    market: marketplaceAddress,
  });

  const listings = useMemo(() => {
    return data.data?.filter((listing) => {
      if (listing.type === ListingType.Auction) {
        return Date.now() / 1000 < listing.endTimeInEpochSeconds;
      }

      return BigNumber.from(listing.quantity).gt(0);
    });
  }, [data]);

  return (
    <Track>
      <ModuleLayout module={module} metadata={metadata} data={data}>
        {listings && <ModuleItemsTable module={module} items={listings} />}
      </ModuleLayout>
    </Track>
  );
};

MarketPage.Layout = AppLayout;

export default MarketPage;
