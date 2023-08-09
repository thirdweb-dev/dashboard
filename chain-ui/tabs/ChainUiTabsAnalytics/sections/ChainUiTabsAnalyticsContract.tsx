import { Stack } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { ChainUiComponentsAnalyticsTable } from "chain-ui/components/ChainUiComponentsAnalytics";
import { useChainUiHooksAnalyticsContractsByGasUsage } from "chain-ui/hooks/useChainUiHooksAnalyticsContractsByGasUsage";
import { useChainUiHooksAnalyticsContractsByTransactionsCount } from "chain-ui/hooks/useChainUiHooksAnalyticsContractsByTransactionsCount";
import { useChainUiHooksAnalyticsContractsByUniqueWalletsCount } from "chain-ui/hooks/useChainUiHooksAnalyticsContractsByUniqueWalletsCount";
import { useChainUiHooksAnalyticsContractsByValueMoved } from "chain-ui/hooks/useChainUiHooksAnalyticsContractsByValueMoved";
import { ethers } from "ethers";
import { Heading } from "tw-components";

export const ChainUiTabsAnalyticsContractsByGasUsage: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  const { data } = useChainUiHooksAnalyticsContractsByGasUsage({
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
          case "to_address": {
            store["Contract Address"] = row["to_address"];
            break;
          }
          case "total_gas_spent_wei": {
            store[`Total Gas Spent (${chain.nativeCurrency.symbol})`] =
              ethers.utils
                .formatEther(
                  ethers.BigNumber.from(
                    expToDec(row["total_gas_spent_wei"].toString()),
                  ).toString(),
                )
                .toString();
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
      <ChainUiComponentsAnalyticsTable data={restructuredData} />
    </Stack>
  );
};

export const ChainUiTabsAnalyticsContractsByTransactionsCount: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  const { data } = useChainUiHooksAnalyticsContractsByTransactionsCount({
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
          case "to_address": {
            store["Contract Address"] = row["to_address"];
            break;
          }
          case "num_transactions": {
            store[`Number of Transactions`] = row["num_transactions"];
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
      <ChainUiComponentsAnalyticsTable data={restructuredData} />
    </Stack>
  );
};

export const ChainUiTabsAnalyticsContractsByUniqueWalletsCount: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  const { data } = useChainUiHooksAnalyticsContractsByUniqueWalletsCount({
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
          case "to_address": {
            store["Contract Address"] = row["to_address"];
            break;
          }
          case "num_unique_wallets": {
            store[`Number of Unique Wallets`] = row["num_unique_wallets"];
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
      <ChainUiComponentsAnalyticsTable data={restructuredData} />
    </Stack>
  );
};

export const ChainUiTabsAnalyticsContractsByValueMoved: React.FC<{
  chain: Chain;
}> = ({ chain }) => {
  const { data } = useChainUiHooksAnalyticsContractsByValueMoved({
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
          case "to_address": {
            store["Contract Address"] = row["to_address"];
            break;
          }
          case "value_moved_wei": {
            store[`${chain.nativeCurrency.symbol} Moved`] = parseFloat(
              ethers.utils
                .formatEther(
                  ethers.BigNumber.from(
                    expToDec(row["value_moved_wei"].toString()),
                  ).toString(),
                )
                .toString(),
            ).toFixed(2);
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
      <ChainUiComponentsAnalyticsTable data={restructuredData} />
    </Stack>
  );
};

function expToDec(expString: string | number) {
  const [lead, decimal, pow] = expString.toString().split(/e|\./);
  const final =
    lead + (decimal || "") + "0".repeat(parseInt(pow) - (decimal || "").length);
  return final;
}
