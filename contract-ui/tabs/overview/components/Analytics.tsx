import { useEVMContractInfo } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { GraphWithLoadingState } from "components/analytics/graph-with-loading-state";
import {
  useGasAnalytics,
  useTransactionAnalytics,
  useUniqueWalletsAnalytics,
} from "data/api/hooks/analytics/transactions";
import { utils } from "ethers";
import { Heading } from "tw-components";

interface AnalyticsSectionProps {
  contractAddress: string;
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  contractAddress,
}) => {
  const contractInfo = useEVMContractInfo();

  if (!contractInfo?.chain) {
    return null;
  }

  return (
    <Flex direction="column" gap={4}>
      <Heading size="title.sm">Analytics</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
        <TransactionsOverTimeChart
          chain={contractInfo.chain}
          contractAddress={contractAddress}
        />

        <UniqueWalletsOverTime
          chain={contractInfo.chain}
          contractAddress={contractAddress}
        />
        <GasSpentOverTime
          chain={contractInfo.chain}
          contractAddress={contractAddress}
        />
      </SimpleGrid>
    </Flex>
  );
};

interface TransactionsOverTimeChartProps extends AnalyticsSectionProps {
  chain: Chain;
}
export const TransactionsOverTimeChart: React.FC<
  TransactionsOverTimeChartProps
> = ({ chain, contractAddress }) => {
  const transactionAnalyticsQuery = useTransactionAnalytics({
    address: contractAddress,
    chain,
  });

  return (
    <Flex flexDir="column" gap={4}>
      <Flex p={0} align="center" justify="space-between">
        <Heading as="h3" size="label.md">
          Transactions
        </Heading>
      </Flex>
      <GraphWithLoadingState
        w="full"
        ratio={2.5}
        query={transactionAnalyticsQuery}
        chartType="area"
        tooltipProps={{
          valueLabel: "Transactions",
        }}
        limit={30}
      />
    </Flex>
  );
};

interface UniqueWalletsOverTimeProps extends AnalyticsSectionProps {
  chain: Chain;
}

export const UniqueWalletsOverTime: React.FC<UniqueWalletsOverTimeProps> = ({
  chain,
  contractAddress,
}) => {
  const uniqueWalletsQuery = useUniqueWalletsAnalytics({
    address: contractAddress,
    chain,
  });
  return (
    <Flex flexDir="column" gap={4}>
      <Flex p={0} align="center" justify="space-between">
        <Heading as="h3" size="label.md">
          Unique Wallets
        </Heading>
      </Flex>
      <GraphWithLoadingState
        w="full"
        ratio={2.5}
        query={uniqueWalletsQuery}
        chartType="area"
        tooltipProps={{
          valueLabel: "Unique Wallets",
        }}
        limit={30}
      />
    </Flex>
  );
};

interface GasSpentOverTimeProps extends AnalyticsSectionProps {
  chain: Chain;
}

export const GasSpentOverTime: React.FC<GasSpentOverTimeProps> = ({
  chain,
  contractAddress,
}) => {
  const gasAnalyticsQuery = useGasAnalytics({
    address: contractAddress,
    chain,
  });
  return (
    <Flex flexDir="column" gap={4}>
      <Flex p={0} align="center" justify="space-between">
        <Heading as="h3" size="label.md">
          Gas Burned
        </Heading>
      </Flex>
      <GraphWithLoadingState
        w="full"
        ratio={2.5}
        query={gasAnalyticsQuery}
        chartType="area"
        tooltipProps={{
          valueLabel: "Gas Burned",
          valueFormatter: (value: number) =>
            `${utils.formatEther(value.toString()).slice(0, 5)} ${
              chain.nativeCurrency.symbol || "ETH"
            }`,
        }}
        limit={30}
      />
    </Flex>
  );
};
