import {
  useEnglishAuctions,
  useEnglishAuctionsCount,
} from "@thirdweb-dev/react";
import { MarketplaceV3 } from "@thirdweb-dev/sdk";
import { MarketplaceTable } from "contract-ui/tabs/shared-components/marketplace-table";
import { useState } from "react";

export interface EnglishAuctionsTableProps {
  contract: MarketplaceV3;
}

const DEFAULT_QUERY_STATE = { count: 50, start: 0 };

export const EnglishAuctionsTable: React.FC<EnglishAuctionsTableProps> = ({
  contract,
}) => {
  const [queryParams, setQueryParams] = useState(DEFAULT_QUERY_STATE);
  const getAllQueryResult = useEnglishAuctions(contract, queryParams);
  const totalCountQuery = useEnglishAuctionsCount(contract);

  return (
    <MarketplaceTable
      contract={contract}
      getAllQueryResult={getAllQueryResult}
      totalCountQuery={totalCountQuery}
      queryParams={queryParams}
      setQueryParams={setQueryParams}
      type="english-auctions"
    />
  );
};
