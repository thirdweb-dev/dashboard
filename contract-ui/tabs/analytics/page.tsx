import { AnalyticsSectionProps } from "../overview/components/Analytics";
import { EventsFeed } from "./components/events-feed";
import { useEVMContractInfo } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { AspectRatio, ButtonGroup, Flex, SimpleGrid } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { BarChart } from "components/analytics/bar-chart";
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

  const [days, setDays] = useState(90);

  if (!contractAddress) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap={6}>
      {contractAddress && evmContractInfo?.chain && (
        <>
          <Flex gap={2} direction="column">
            <Heading as="h2" size="title.md">
              Analytics
            </Heading>
            <ButtonGroup variant="ghost" size="xs">
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
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <TransactionsOverTimeChart
              contractAddress={contractAddress}
              chain={evmContractInfo.chain}
              limit={days}
            />
            <UniqueWalletsOverTimeChart
              contractAddress={contractAddress}
              chain={evmContractInfo.chain}
              limit={days}
            />
            <GasUsedOverTimeTimeChart
              contractAddress={contractAddress}
              chain={evmContractInfo.chain}
              limit={days}
            />
          </SimpleGrid>
        </>
      )}
      <EventsFeed contractAddress={contractAddress} />
    </Flex>
  );
};

interface TransactionsOverTimeChartProps extends AnalyticsSectionProps {
  chain: Chain;
  limit: number;
}
const TransactionsOverTimeChart: React.FC<TransactionsOverTimeChartProps> = ({
  chain,
  contractAddress,
  limit,
}) => {
  const transactionAnalyticsQuery = useTransactionAnalytics({
    address: contractAddress,
    chain,
  });

  return (
    <Flex flexDir="column" gap={4}>
      <Heading as="h3" size="subtitle.sm">
        Transactions
      </Heading>

      <AspectRatio w="full" ratio={2}>
        <BarChart
          data={transactionAnalyticsQuery.data?.result.slice(0, limit) || []}
          index={{ id: "timestamp" }}
          categories={[{ id: "count" }]}
          showXAxis
          showYAxis
        />
      </AspectRatio>
    </Flex>
  );
};

interface UniqueWalletsOverTimeChartProps extends AnalyticsSectionProps {
  chain: Chain;
  limit: number;
}
const UniqueWalletsOverTimeChart: React.FC<UniqueWalletsOverTimeChartProps> = ({
  chain,
  contractAddress,
  limit,
}) => {
  const walletAnalyticsQuery = useUniqueWalletsAnalytics({
    address: contractAddress,
    chain,
  });
  return (
    <Flex flexDir="column" gap={4}>
      <Heading as="h3" size="subtitle.sm">
        Unique Wallets
      </Heading>

      <AspectRatio w="full" ratio={2}>
        <BarChart
          data={walletAnalyticsQuery.data?.result.slice(0, limit) || []}
          index={{ id: "timestamp" }}
          categories={[{ id: "count" }]}
          showXAxis
          showYAxis
        />
      </AspectRatio>
    </Flex>
  );
};

interface GasUsedOverTimeTimeChartProps extends AnalyticsSectionProps {
  chain: Chain;
  limit: number;
}
const GasUsedOverTimeTimeChart: React.FC<GasUsedOverTimeTimeChartProps> = ({
  chain,
  contractAddress,
  limit,
}) => {
  const gasAnalyticsQuery = useGasAnalytics({
    address: contractAddress,
    chain,
  });
  return (
    <Flex flexDir="column" gap={4}>
      <Heading as="h3" size="subtitle.sm">
        Gas Burned
      </Heading>

      <AspectRatio w="full" ratio={2}>
        <BarChart
          data={gasAnalyticsQuery.data?.result.slice(0, limit) || []}
          index={{ id: "timestamp" }}
          categories={[
            {
              id: "value",
              format: (value: number) => {
                return `${NumberFormatter.format(
                  value / 10 ** chain.nativeCurrency.decimals,
                )} ${chain.nativeCurrency.symbol}`;
              },
            },
          ]}
          showXAxis
          showYAxis
        />
      </AspectRatio>
    </Flex>
  );
};

const NumberFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 3,
});
