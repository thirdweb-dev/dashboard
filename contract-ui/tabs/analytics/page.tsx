import { useEVMContractInfo } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { ButtonGroup, Flex, SimpleGrid } from "@chakra-ui/react";
import { AreaChart } from "components/analytics/area-chart";
import { ChartContainer } from "components/analytics/chart-container";
import {
  useCumulativeWalletsAnalytics,
  useTransactionAnalytics,
  useUniqueWalletsAnalytics,
  useValueAnalytics,
} from "data/analytics/hooks";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Heading } from "tw-components";

interface ContractAnalyticsPageProps {
  contractAddress?: string;
}

export const ContractAnalyticsPage: React.FC<ContractAnalyticsPageProps> = ({
  contractAddress,
}) => {
  const startDate = (() => {
    const date = new Date();
    date.setDate(new Date().getDate() - 30);
    return date;
  })();

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
          <SimpleGrid columns={{ base: 1, md: 1 }} gap={4}>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Heading as="h3" size="subtitle.sm">
                Transactions
              </Heading>
              <ChartContainer w="full" ratio={4.5 / 1}>
                <TransactionsAnalyticsChart
                  contractAddress={contractAddress}
                  chainId={evmContractInfo.chain.chainId}
                  startDate={startDate}
                />
              </ChartContainer>
            </Flex>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Heading as="h3" size="subtitle.sm">
                Native Value
              </Heading>
              <ChartContainer w="full" ratio={4.5 / 1}>
                <ValueAnalyticsChart
                  contractAddress={contractAddress}
                  chainId={evmContractInfo.chain.chainId}
                  startDate={startDate}
                />
              </ChartContainer>
            </Flex>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Heading as="h3" size="subtitle.sm">
                Unique Wallets
              </Heading>
              <ChartContainer w="full" ratio={4.5 / 1}>
                <UniqueWalletsAnalyticsChart
                  contractAddress={contractAddress}
                  chainId={evmContractInfo.chain.chainId}
                  startDate={startDate}
                />
              </ChartContainer>
            </Flex>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Heading as="h3" size="subtitle.sm">
                Cumulative Wallets
              </Heading>
              <ChartContainer w="full" ratio={4.5 / 1}>
                <CumulativeWalletsAnalyticsChart
                  contractAddress={contractAddress}
                  chainId={evmContractInfo.chain.chainId}
                  startDate={startDate}
                />
              </ChartContainer>
            </Flex>
          </SimpleGrid>
        </>
      )}
    </Flex>
  );
};

interface AnalyticsChartProps {
  chainId: number;
  contractAddress: string;
  startDate: Date;
}

const TransactionsAnalyticsChart: React.FC<AnalyticsChartProps> = ({
  chainId,
  contractAddress,
  startDate,
}) => {
  const transactionAnalyticsQuery = useTransactionAnalytics({
    contractAddress,
    chainId,
    startDate,
  });

  const data = useMemo(() => {
    if (!transactionAnalyticsQuery.data) {
      return [];
    }

    return transactionAnalyticsQuery.data;
  }, [transactionAnalyticsQuery.data]);

  return (
    <AreaChart
      data={data}
      index={{ id: "time" }}
      categories={[{ id: "count", label: "Transactions" }]}
      showXAxis
      showYAxis
      startEndOnly
    />
  );
};

const ValueAnalyticsChart: React.FC<AnalyticsChartProps> = ({
  chainId,
  contractAddress,
  startDate,
}) => {
  const valueAnalyticsQuery = useValueAnalytics({
    contractAddress,
    chainId,
    startDate,
  });

  const data = useMemo(() => {
    if (!valueAnalyticsQuery.data) {
      return [];
    }

    return valueAnalyticsQuery.data;
  }, [valueAnalyticsQuery.data]);

  return (
    <AreaChart
      data={data}
      index={{ id: "time" }}
      categories={[{ id: "value", label: "Native Value" }]}
      showXAxis
      showYAxis
      startEndOnly
    />
  );
};

const UniqueWalletsAnalyticsChart: React.FC<AnalyticsChartProps> = ({
  chainId,
  contractAddress,
  startDate,
}) => {
  const unqiqueWalletsAnalyticsQuery = useUniqueWalletsAnalytics({
    contractAddress,
    chainId,
    startDate,
  });

  const data = useMemo(() => {
    if (!unqiqueWalletsAnalyticsQuery.data) {
      return [];
    }

    return unqiqueWalletsAnalyticsQuery.data;
  }, [unqiqueWalletsAnalyticsQuery.data]);

  return (
    <AreaChart
      data={data}
      index={{ id: "time" }}
      categories={[{ id: "wallets", label: "Unique Wallets" }]}
      showXAxis
      showYAxis
      startEndOnly
    />
  );
};

const CumulativeWalletsAnalyticsChart: React.FC<AnalyticsChartProps> = ({
  chainId,
  contractAddress,
  startDate,
}) => {
  const cumulativeWalletsAnalyticsQuery = useCumulativeWalletsAnalytics({
    contractAddress,
    chainId,
    startDate,
  });

  const data = useMemo(() => {
    if (!cumulativeWalletsAnalyticsQuery.data) {
      return [];
    }

    return cumulativeWalletsAnalyticsQuery.data;
  }, [cumulativeWalletsAnalyticsQuery.data]);

  return (
    <AreaChart
      data={data}
      index={{ id: "time" }}
      categories={[{ id: "wallets", label: "Cumulative Wallets" }]}
      showXAxis
      showYAxis
      startEndOnly
    />
  );
};
