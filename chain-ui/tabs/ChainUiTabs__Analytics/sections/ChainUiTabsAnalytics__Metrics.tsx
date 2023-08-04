import { Stack } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { ChainUiComponents__AnalyticsTable } from "chain-ui/components/ChainUiComponents__Analytics";
import { useChainUiHooks__AnalyticsBlocksByGasPrice } from "chain-ui/hooks/useChainUiHooks__AnalyticsBlocksByGasPrice";
import { useChainUiHooks__AnalyticsContractsByGasUsage } from "chain-ui/hooks/useChainUiHooks__AnalyticsContractsByGasUsage";
import { useChainUiHooks__AnalyticsContractsByTransactionsCount } from "chain-ui/hooks/useChainUiHooks__AnalyticsContractsByTransactionsCount";
import { useChainUiHooks__AnalyticsContractsByUniqueWalletsCount } from "chain-ui/hooks/useChainUiHooks__AnalyticsContractsByUniqueWalletsCount";
import { useChainUiHooks__AnalyticsContractsByValueMoved } from "chain-ui/hooks/useChainUiHooks__AnalyticsContractsByValueMoved";
import { ethers } from "ethers";
import { Heading } from "tw-components";

export const ChainUiTabsAnalytics__MetricsBlocksByGasPrice: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  const { data } = useChainUiHooks__AnalyticsBlocksByGasPrice({
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
            return store;
          }
          case "block_number": {
            store["block_number"] = row["block_number"];
            break;
          }
          case "block_time": {
            store["block_time"] = new Date(row["block_time"]).toLocaleString();
            break;
          }
          case "median_gas_price": {
            store["median_gas_price_(gwei)"] = ethers.utils
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
      <ChainUiComponents__AnalyticsTable data={restructuredData} />
    </Stack>
  );
};

export const ChainUiTabsAnalytics__MetricsContractsByGasUsage: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  const { data } = useChainUiHooks__AnalyticsContractsByGasUsage({
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
          case "to_address":
          case "chain_id": {
            return store;
          }
          case "total_gas_spent_wei": {
            store["total_gas_spent_wei_(gwei)"] = ethers.utils
              .formatUnits(row["total_gas_spent_wei"], "gwei")
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
      <Heading fontSize="x-large">Contracts that Spent the Most Gas</Heading>
      <ChainUiComponents__AnalyticsTable data={restructuredData} />
    </Stack>
  );
};

export const ChainUiTabsAnalytics__MetricsContractsByTransactionsCount: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  const { data } = useChainUiHooks__AnalyticsContractsByTransactionsCount({
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
            return store;
          }
          case "block_number": {
            store["block_number"] = row["block_number"];
            break;
          }
          case "block_time": {
            store["block_time"] = new Date(row["block_time"]).toLocaleString();
            break;
          }
          case "median_gas_price": {
            store["median_gas_price_(gwei)"] = ethers.utils
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
      <Heading fontSize="x-large">Most Interacted Contracts</Heading>
      <ChainUiComponents__AnalyticsTable data={restructuredData} />
    </Stack>
  );
};

export const ChainUiTabsAnalytics__MetricsContractsByUniqueWalletsCount: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  const { data } = useChainUiHooks__AnalyticsContractsByUniqueWalletsCount({
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
            return store;
          }
          case "block_number": {
            store["block_number"] = row["block_number"];
            break;
          }
          case "block_time": {
            store["block_time"] = new Date(row["block_time"]).toLocaleString();
            break;
          }
          case "median_gas_price": {
            store["median_gas_price_(gwei)"] = ethers.utils
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
      <Heading fontSize="x-large">
        Contracts with the Most Unique Wallet Interactions
      </Heading>
      <ChainUiComponents__AnalyticsTable data={restructuredData} />
    </Stack>
  );
};

export const ChainUiTabsAnalytics__MetricsContractsByValueMoved: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  const { data } = useChainUiHooks__AnalyticsContractsByValueMoved({
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
            return store;
          }
          case "block_number": {
            store["block_number"] = row["block_number"];
            break;
          }
          case "block_time": {
            store["block_time"] = new Date(row["block_time"]).toLocaleString();
            break;
          }
          case "median_gas_price": {
            store["median_gas_price_(gwei)"] = ethers.utils
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
      <Heading fontSize="x-large">
        Contracts that Moved the most {chain.nativeCurrency.symbol}
      </Heading>
      <ChainUiComponents__AnalyticsTable data={restructuredData} />
    </Stack>
  );
};
