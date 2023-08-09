import { Stack } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { ChainUiComponentsAnalyticsTable } from "chain-ui/components/ChainUiComponentsAnalytics";
import { useChainUiHooksAnalyticsBlocksByGasPrice } from "chain-ui/hooks/useChainUiHooksAnalyticsBlocksByGasPrice";
import { ethers } from "ethers";
import { Heading } from "tw-components";

export const ChainUiTabsAnalyticsBlocksByGasPrice: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  const { data } = useChainUiHooksAnalyticsBlocksByGasPrice({
    chainId: chain.chainId,
  });
  if (!data) {
    return null;
  }

  const restructuredData = data.results.map((row) => {
    const headers = Object.keys(row);
    const restructuredRow = headers.reduce(
      (store, header) => {
        switch (header) {
          case "chain_id": {
            break;
          }
          case "block_number": {
            store["Block Number"] = row["block_number"];
            break;
          }
          case "block_time": {
            store["Block Time"] = new Date(row["block_time"]).toLocaleString();
            break;
          }
          case "median_gas_price": {
            store["Gas Price (gwei)"] = ethers.utils
              .formatUnits(row["median_gas_price"], "gwei")
              .slice(0, 5);
            break;
          }
        }
        return store;
      },
      {} as Record<string, any>,
    );
    return restructuredRow;
  });

  return (
    <Stack>
      <Heading fontSize="x-large">Historical Gas Prices</Heading>
      <ChainUiComponentsAnalyticsTable data={restructuredData} />
    </Stack>
  );
};
