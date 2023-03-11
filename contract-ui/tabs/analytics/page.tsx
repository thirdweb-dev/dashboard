import { AnalyticsSectionProps } from "../overview/components/Analytics";
import { EventsFeed } from "./components/events-feed";
import { useEVMContractInfo } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { ButtonGroup, Flex } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { GraphWithLoadingState } from "components/analytics/graph-with-loading-state";
import {
  useGasAnalytics,
  useTransactionAnalytics,
  useUniqueWalletsAnalytics,
} from "data/api/hooks/analytics/transactions";
import { useEffect, useState } from "react";
import { Button, Heading } from "tw-components";

interface ContractAnalyticsPageProps {
  contractAddress?: string;
}

export const ContractAnalyticsPage: React.FC<ContractAnalyticsPageProps> = ({
  contractAddress,
}) => {
  useEffect(() => {
    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const evmContractInfo = useEVMContractInfo();

  if (!contractAddress) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap={6}>
      {contractAddress && evmContractInfo?.chain && (
        <>
          <TransactionsOverTimeChart
            contractAddress={contractAddress}
            chain={evmContractInfo.chain}
          />
          <UniqueWalletsOverTimeChart
            contractAddress={contractAddress}
            chain={evmContractInfo.chain}
          />
          <GasUsedOverTimeTimeChart
            contractAddress={contractAddress}
            chain={evmContractInfo.chain}
          />
        </>
      )}
      <EventsFeed contractAddress={contractAddress} />
    </Flex>
  );
};

interface TransactionsOverTimeChartProps extends AnalyticsSectionProps {
  chain: Chain;
}
const TransactionsOverTimeChart: React.FC<TransactionsOverTimeChartProps> = ({
  chain,
  contractAddress,
}) => {
  const [days, setDays] = useState(90);
  const transactionAnalyticsQuery = useTransactionAnalytics({
    address: contractAddress,
    chain,
  });
  return (
    <Flex flexDir="column" gap={4}>
      <Flex p={0} align="center" justify="space-between">
        <Heading as="h2" size="title.sm">
          Transactions
        </Heading>
        <ButtonGroup variant="outline" size="sm" isAttached>
          <Button isActive={days === 30} onClick={() => setDays(30)}>
            30 days
          </Button>
          <Button isActive={days === 60} onClick={() => setDays(60)}>
            60 days
          </Button>
          <Button isActive={days === 90} onClick={() => setDays(90)}>
            90 days
          </Button>
        </ButtonGroup>
      </Flex>
      <GraphWithLoadingState
        w="full"
        ratio={2.5}
        query={transactionAnalyticsQuery}
        chartType="bar"
        tooltipProps={{
          valueLabel: "Transactions",
        }}
        limit={days}
        reverse
        showXAxis
        showYAxis
      />
    </Flex>
  );
};

interface UniqueWalletsOverTimeChartProps extends AnalyticsSectionProps {
  chain: Chain;
}
const UniqueWalletsOverTimeChart: React.FC<UniqueWalletsOverTimeChartProps> = ({
  chain,
  contractAddress,
}) => {
  const [days, setDays] = useState(90);
  const transactionAnalyticsQuery = useUniqueWalletsAnalytics({
    address: contractAddress,
    chain,
  });
  return (
    <Flex flexDir="column" gap={4}>
      <Flex p={0} align="center" justify="space-between">
        <Heading as="h2" size="title.sm">
          Unique Wallets
        </Heading>
        <ButtonGroup variant="outline" size="sm" isAttached>
          <Button isActive={days === 30} onClick={() => setDays(30)}>
            30 days
          </Button>
          <Button isActive={days === 60} onClick={() => setDays(60)}>
            60 days
          </Button>
          <Button isActive={days === 90} onClick={() => setDays(90)}>
            90 days
          </Button>
        </ButtonGroup>
      </Flex>
      <GraphWithLoadingState
        w="full"
        ratio={2.5}
        query={transactionAnalyticsQuery}
        chartType="bar"
        tooltipProps={{
          valueLabel: "Unique Wallets",
        }}
        limit={days}
        reverse
        showXAxis
        showYAxis
      />
    </Flex>
  );
};

interface GasUsedOverTimeTimeChartProps extends AnalyticsSectionProps {
  chain: Chain;
}
const GasUsedOverTimeTimeChart: React.FC<GasUsedOverTimeTimeChartProps> = ({
  chain,
  contractAddress,
}) => {
  const [days, setDays] = useState(90);
  const transactionAnalyticsQuery = useGasAnalytics({
    address: contractAddress,
    chain,
  });
  return (
    <Flex flexDir="column" gap={4}>
      <Flex p={0} align="center" justify="space-between">
        <Heading as="h2" size="title.sm">
          Gas Burned
        </Heading>
        <ButtonGroup variant="outline" size="sm" isAttached>
          <Button isActive={days === 30} onClick={() => setDays(30)}>
            30 days
          </Button>
          <Button isActive={days === 60} onClick={() => setDays(60)}>
            60 days
          </Button>
          <Button isActive={days === 90} onClick={() => setDays(90)}>
            90 days
          </Button>
        </ButtonGroup>
      </Flex>
      <GraphWithLoadingState
        w="full"
        ratio={2.5}
        query={transactionAnalyticsQuery}
        chartType="bar"
        tooltipProps={{
          valueLabel: "Gas Burned",
          valueFormatter: (value: number) => {
            return `${NumberFormatter.format(
              value / 10 ** chain.nativeCurrency.decimals,
            )} ${chain.nativeCurrency.symbol}`;
          },
        }}
        limit={days}
        reverse
        showXAxis
        showYAxis
      />
    </Flex>
  );
};

const NumberFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 3,
});
