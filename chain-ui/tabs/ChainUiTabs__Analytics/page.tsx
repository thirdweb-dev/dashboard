import { Chain } from "@thirdweb-dev/chains";
import { CodeOverview } from "contract-ui/tabs/code/components/code-overview";
import { ChainUiTabsAnalytics__MetricsContractsByGasUsage } from "./sections/ChainUiTabsAnalytics__Metrics";

export interface IChainUiTabs__Analytics {
  chainsByGasUsage: any;
  chainsByTransactionCount: any;
  chainsByUniqueWallets: any;
  chainsByActiveWallets: any;
  historicalGasPrices: any;
}

export const ChainUiTabs__Analytics: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  return (
    <>
      {/* <ChainUiTabsAnalytics__MetricsBlocksByGasPrice chain={chain} /> */}
      <ChainUiTabsAnalytics__MetricsContractsByGasUsage chain={chain} />
      {/* <ChainUiTabsAnalytics__MetricsContractsByTransactionsCount
        chain={chain}
      /> */}
      {/* <ChainUiTabsAnalytics__MetricsContractsByUniqueWalletsCount
        chain={chain}
      /> */}
      {/* <ChainUiTabsAnalytics__MetricsContractsByValueMoved chain={chain} /> */}
      <CodeOverview onlyInstall chain={chain} noSidebar />
    </>
  );
};
