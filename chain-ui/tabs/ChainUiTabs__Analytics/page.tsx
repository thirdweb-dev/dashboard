import { Chain } from "@thirdweb-dev/chains";
import { CodeOverview } from "contract-ui/tabs/code/components/code-overview";
import { ChainUiTabsAnalytics__BlocksByGasPrice } from "./sections/ChainUiTabsAnalytics__Block";
import {
  ChainUiTabsAnalytics__ContractsByGasUsage,
  ChainUiTabsAnalytics__ContractsByTransactionsCount,
  ChainUiTabsAnalytics__ContractsByUniqueWalletsCount,
  ChainUiTabsAnalytics__ContractsByValueMoved,
} from "./sections/ChainUiTabsAnalytics__Contract";

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
      <ChainUiTabsAnalytics__BlocksByGasPrice chain={chain} />
      <ChainUiTabsAnalytics__ContractsByGasUsage chain={chain} />
      <ChainUiTabsAnalytics__ContractsByTransactionsCount chain={chain} />
      <ChainUiTabsAnalytics__ContractsByUniqueWalletsCount chain={chain} />
      <ChainUiTabsAnalytics__ContractsByValueMoved chain={chain} />
      <CodeOverview onlyInstall chain={chain} noSidebar />
    </>
  );
};
