import { useEVMContractInfo } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import {
  AreaChartProps,
  GenericDataType,
} from "components/analytics/area-chart";
import { AutoBarChart } from "components/analytics/auto-bar-chart";
import { BarChart } from "components/analytics/bar-chart";
import { ChartContainer } from "components/analytics/chart-container";
import {
  type TotalQueryResult,
  useAnalyticsSupportedChains,
  useEventsAnalytics,
  useFunctionsAnalytics,
  useLogsAnalytics,
  useTotalLogsAnalytics,
  useTotalTransactionAnalytics,
  useTotalWalletsAnalytics,
  useTransactionAnalytics,
  useUniqueWalletsAnalytics,
} from "data/analytics/hooks";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Card, Heading, Text } from "tw-components";

interface ContractAnalyticsPageProps {
  contractAddress: string;
}

export const ContractAnalyticsPage: React.FC<ContractAnalyticsPageProps> = ({
  contractAddress,
}) => {
  const [startDate] = useState(
    (() => {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return date;
    })(),
  );
  const [endDate] = useState(new Date());

  useEffect(() => {
    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const evmContractInfo = useEVMContractInfo();

  return (
    <Flex direction="column" gap={6}>
      <Flex gap={10} direction="column">
        <Flex direction="column" gap={2}>
          <Alert status="info" borderRadius="md" mb={4}>
            <AlertIcon />
            <AlertTitle>Analytics is in beta.</AlertTitle>
            <AlertDescription>
              Some data may be partially inaccurate or incomplete.
            </AlertDescription>
          </Alert>
          <Heading as="h2" size="title.md">
            Analytics
          </Heading>
          <Flex gap={4}>
            <AnalyticsStat
              queryResult={useTotalWalletsAnalytics({
                contractAddress,
                // if `0` then the query is just not enabled below
                chainId: evmContractInfo?.chain?.chainId || 0,
                startDate,
                endDate,
              })}
              label="Unique Wallets"
            />
            <AnalyticsStat
              queryResult={useTotalTransactionAnalytics({
                contractAddress,
                // if `0` then the query is just not enabled below
                chainId: evmContractInfo?.chain?.chainId || 0,
                startDate,
                endDate,
              })}
              label="Total Transactions"
            />
            <AnalyticsStat
              queryResult={useTotalLogsAnalytics({
                contractAddress,
                // if `0` then the query is just not enabled below
                chainId: evmContractInfo?.chain?.chainId || 0,
                startDate,
                endDate,
              })}
              label="Total Events"
            />
          </Flex>
        </Flex>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 1 }} gap={4}>
        <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
          <Stack spacing={0}>
            <Heading as="h3" size="subtitle.sm">
              Unique Wallets
            </Heading>
            <Text>
              The number of unique wallet addresses that have sent a transaction
              to this contract.
            </Text>
          </Stack>
          <ChartContainer w="full" ratio={4.5 / 1}>
            <AnalyticsChart
              chainId={evmContractInfo?.chain?.chainId || 0}
              index={"time"}
              categories={[{ id: "wallets", label: "Unique Wallets" }]}
              queryResult={useUniqueWalletsAnalytics({
                contractAddress,
                chainId: evmContractInfo?.chain?.chainId || 0,
                startDate,
                endDate,
              })}
            />
          </ChartContainer>
        </Flex>
        <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
          <Stack spacing={0}>
            <Heading as="h3" size="subtitle.sm">
              Total Transactions
            </Heading>
            <Text>
              The number of transactions that have been sent to this contract.
            </Text>
          </Stack>
          <ChartContainer w="full" ratio={4.5 / 1}>
            <AnalyticsChart
              chainId={evmContractInfo?.chain?.chainId || 0}
              index={"time"}
              categories={[{ id: "count", label: "Transactions" }]}
              queryResult={useTransactionAnalytics({
                contractAddress,
                chainId: evmContractInfo?.chain?.chainId || 0,
                startDate,
                endDate,
              })}
            />
          </ChartContainer>
        </Flex>

        <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
          <Stack spacing={0}>
            <Heading as="h3" size="subtitle.sm">
              Total Events
            </Heading>
            <Text>
              The number of on-chain events that have been emitted from this
              contract.
            </Text>
          </Stack>
          <ChartContainer w="full" ratio={4.5 / 1}>
            <AnalyticsChart
              chainId={evmContractInfo?.chain?.chainId || 0}
              index={"time"}
              categories={[{ id: "count", label: "Events" }]}
              queryResult={useLogsAnalytics({
                contractAddress,
                chainId: evmContractInfo?.chain?.chainId || 0,
                startDate,
                endDate,
              })}
            />
          </ChartContainer>
        </Flex>
        <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
          <Stack spacing={0}>
            <Heading as="h3" size="subtitle.sm">
              Function Breakdown
            </Heading>
            <Text>
              The breakdown of calls to each write function from transactions.
            </Text>
          </Stack>
          <ChartContainer w="full" ratio={4.5 / 1}>
            <AnalyticsChart
              chainId={evmContractInfo?.chain?.chainId || 0}
              index={"time"}
              categories={"auto"}
              queryResult={useFunctionsAnalytics({
                contractAddress,
                chainId: evmContractInfo?.chain?.chainId || 0,
                startDate,
                endDate,
              })}
            />
          </ChartContainer>
        </Flex>
        <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
          <Stack spacing={0}>
            <Heading as="h3" size="subtitle.sm">
              Event Breakdown
            </Heading>
            <Text>The breakdown of events emitted by this contract.</Text>
          </Stack>
          <ChartContainer w="full" ratio={4.5 / 1}>
            <AnalyticsChart
              chainId={evmContractInfo?.chain?.chainId || 0}
              index={"time"}
              categories={"auto"}
              queryResult={useEventsAnalytics({
                contractAddress,
                chainId: evmContractInfo?.chain?.chainId || 0,
                startDate,
                endDate,
              })}
            />
          </ChartContainer>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

interface AnalyticsChartProps<
  TAnalytics extends GenericDataType = GenericDataType,
> {
  chainId: number;
  index: string;
  categories: AreaChartProps<TAnalytics, "time">["categories"] | "auto";
  queryResult: UseQueryResult<TAnalytics[]>;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  chainId,
  index,
  categories,
  queryResult,
  showXAxis,
  showYAxis,
}) => {
  const supportedChainsQuery = useAnalyticsSupportedChains();

  const data = useMemo(() => {
    if (!queryResult.data) {
      return [];
    }

    return queryResult.data;
  }, [queryResult.data]);

  if (data.length <= 1) {
    const supportedChains = supportedChainsQuery.data ?? [];

    return (
      <Alert status="info" borderRadius="md" mb={4}>
        <AlertIcon />
        {supportedChains.includes(chainId) ? (
          <AlertDescription>No recent activity.</AlertDescription>
        ) : (
          <AlertDescription>
            Analytics for this chain not currently supported.
          </AlertDescription>
        )}
      </Alert>
    );
  }

  if (categories === "auto") {
    return (
      <AutoBarChart
        data={data}
        index={{ id: index }}
        showXAxis
        showYAxis
        stacked
      />
    );
  }

  return (
    <BarChart
      data={data}
      index={{ id: index }}
      categories={categories}
      showXAxis={showXAxis !== undefined ? showXAxis : true}
      showYAxis={showYAxis !== undefined ? showYAxis : true}
    />
  );
};

interface AnalyticsStatProps {
  label: string;

  queryResult: UseQueryResult<TotalQueryResult>;
}

const AnalyticsStat: React.FC<AnalyticsStatProps> = ({
  label,

  queryResult,
}) => {
  return (
    <Suspense fallback={<AnalyticsSkeleton label={label} />}>
      <AnalyticsData queryResult={queryResult} label={label} />
    </Suspense>
  );
};

const AnalyticsSkeleton: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Card as={Stat}>
      <StatLabel mb={{ base: 1, md: 0 }}>{label}</StatLabel>
      <Skeleton isLoaded={false}>
        <StatNumber>{0}</StatNumber>
      </Skeleton>
    </Card>
  );
};

const AnalyticsData: React.FC<AnalyticsStatProps> = ({
  label,

  queryResult,
}) => {
  const data = useMemo(() => {
    if (!queryResult.data) {
      return 0;
    }

    return queryResult.data.count;
  }, [queryResult.data]);

  return (
    <Card as={Stat}>
      <StatLabel mb={{ base: 1, md: 0 }}>{label}</StatLabel>
      <Skeleton isLoaded={queryResult.isFetched}>
        <StatNumber>{data.toLocaleString()}</StatNumber>
      </Skeleton>
    </Card>
  );
};
