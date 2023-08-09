import { Chain } from "@thirdweb-dev/chains";
import { CodeOverview } from "contract-ui/tabs/code/components/code-overview";
import { ChainUiTabsAnalyticsBlocksByGasPrice } from "./sections/ChainUiTabsAnalyticsBlock";
import {
  ChainUiTabsAnalyticsContractsByGasUsage,
  ChainUiTabsAnalyticsContractsByTransactionsCount,
  ChainUiTabsAnalyticsContractsByUniqueWalletsCount,
  ChainUiTabsAnalyticsContractsByValueMoved,
} from "./sections/ChainUiTabsAnalyticsContract";

export interface IChainUiTabsAnalytics {
  chainsByGasUsage: any;
  chainsByTransactionCount: any;
  chainsByUniqueWallets: any;
  chainsByActiveWallets: any;
  historicalGasPrices: any;
}

export const ChainUiTabsAnalytics: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  return (
    <>
      <ChainUiTabsAnalyticsBlocksByGasPrice chain={chain} />
      <ChainUiTabsAnalyticsContractsByGasUsage chain={chain} />
      <ChainUiTabsAnalyticsContractsByTransactionsCount chain={chain} />
      <ChainUiTabsAnalyticsContractsByUniqueWalletsCount chain={chain} />
      <ChainUiTabsAnalyticsContractsByValueMoved chain={chain} />
      <CodeOverview onlyInstall chain={chain} noSidebar />
    </>
  );
};
