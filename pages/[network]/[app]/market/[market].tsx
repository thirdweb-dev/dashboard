import {
  useMarketList,
  useMarketModule,
  useMarketModuleMetadata,
} from "@3rdweb-sdk/react";
import { AppLayout } from "components/app-layouts/app";
import { ModuleLayout } from "components/module-pages/module-layout";
import { ModuleItemsTable } from "components/module-pages/table";
import { BigNumber } from "ethers";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React, { useMemo } from "react";
// import { FiFilePlus } from "react-icons/fi";

const MarketPage: ConsolePage = () => {
  const marketAddress = useSingleQueryParam("market");
  const module = useMarketModule(marketAddress);
  const metadata = useMarketModuleMetadata(marketAddress);
  const data = useMarketList(marketAddress);
  const { Track } = useTrack({
    page: "market",
    market: marketAddress,
  });

  const listings = useMemo(() => {
    return data.data?.filter((listing) =>
      BigNumber.from(listing.quantity).gt(0),
    );
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
