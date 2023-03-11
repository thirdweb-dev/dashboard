import { useEVMContractInfo } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { GraphWithLoadingState } from "components/analytics/graph-with-loading-state";
import { useTabHref } from "contract-ui/utils";
import {
  useGasAnalytics,
  useTransactionAnalytics,
  useUniqueWalletsAnalytics,
} from "data/api/hooks/analytics/transactions";
import { Heading, TrackedLink, TrackedLinkProps } from "tw-components";

export interface AnalyticsSectionProps {
  contractAddress: string;
}

export const AnalyticsSection: React.FC<
  AnalyticsSectionProps & { trackingCategory: TrackedLinkProps["category"] }
> = ({ contractAddress, trackingCategory }) => {
  const contractInfo = useEVMContractInfo();
  const analyticsHref = useTabHref("analytics");

  if (!contractInfo?.chain) {
    return null;
  }

  return (
    <Flex direction="column" gap={4}>
      <Flex align="center" justify="space-between" w="full">
        <Heading size="title.sm">Analytics</Heading>
        <TrackedLink
          category={trackingCategory}
          label="view_all_events"
          color="blue.400"
          _light={{
            color: "blue.600",
          }}
          gap={4}
          href={analyticsHref}
        >
          View all -&gt;
        </TrackedLink>
      </Flex>
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
        reverse
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
        reverse
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
          valueFormatter: (value: number) => {
            return `${NumberFormatter.format(
              value / 10 ** chain.nativeCurrency.decimals,
            )} ${chain.nativeCurrency.symbol}`;
          },
        }}
        limit={30}
        reverse
      />
    </Flex>
  );
};

const NumberFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 3,
});
