import { useEVMContractInfo } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { Flex, Input, SimpleGrid, Stack } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import {
  AreaChartProps,
  GenericDataType,
} from "components/analytics/area-chart";
import { AutoBarChart } from "components/analytics/auto-bar-chart";
import { BarChart } from "components/analytics/bar-chart";
import { ChartContainer } from "components/analytics/chart-container";
import {
  AnalyticsQueryParams,
  useEventsAnalytics,
  useFunctionsAnalytics,
  useLogsAnalytics,
  useTransactionAnalytics,
  useUniqueWalletsAnalytics,
  useValueAnalytics,
} from "data/analytics/hooks";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Heading, Text } from "tw-components";
import { toDateString, toDateTimeLocal } from "utils/date-utils";

interface ContractAnalyticsPageProps {
  contractAddress?: string;
}

export const ContractAnalyticsPage: React.FC<ContractAnalyticsPageProps> = ({
  contractAddress,
}) => {
  const [startDate, setStartDate] = useState(
    (() => {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return date;
    })(),
  );
  const [endDate, setEndDate] = useState(new Date());
  const { handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      startDate: (() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date;
      })(),
      endDate: new Date(),
    },
  });

  useEffect(() => {
    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const evmContractInfo = useEVMContractInfo();

  if (!contractAddress) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  console.log(watch("startDate"));

  return (
    <Flex direction="column" gap={6}>
      {contractAddress && evmContractInfo?.chain && (
        <>
          <Flex gap={2} direction="column">
            <Heading as="h2" size="title.md">
              Analytics
            </Heading>
            <form
              onSubmit={handleSubmit((data) => {
                setStartDate(data.startDate);
                setEndDate(data.endDate);
              })}
            >
              <Flex gap={4}>
                <Flex flexDirection="column" gap={1}>
                  <Text size="body.sm">Start Date</Text>
                  <Input
                    size="sm"
                    type="date"
                    max={toDateString(watch("endDate"))}
                    value={toDateString(watch("startDate"))}
                    onChange={(e) =>
                      setValue("startDate", new Date(e.target.value))
                    }
                  />
                </Flex>
                <Flex flexDirection="column" gap={1}>
                  <Text size="body.sm">End Date</Text>
                  <Input
                    size="sm"
                    type="date"
                    min={toDateString(watch("startDate"))}
                    value={toDateString(watch("endDate"))}
                    onChange={(e) =>
                      setValue("endDate", new Date(e.target.value))
                    }
                  />
                </Flex>
                <Button alignSelf="flex-end" type="submit" size="sm">
                  Apply
                </Button>
              </Flex>
            </form>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 1 }} gap={4}>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Stack spacing={0}>
                <Heading as="h3" size="subtitle.sm">
                  Total Transactions
                </Heading>
                <Text>
                  The number of transactions that have been sent to this
                  contract.
                </Text>
              </Stack>
              <ChartContainer w="full" ratio={4.5 / 1}>
                <AnalyticsChart
                  contractAddress={contractAddress}
                  chainId={evmContractInfo.chain.chainId}
                  startDate={startDate}
                  endDate={endDate}
                  index={"time"}
                  categories={[{ id: "count", label: "Transactions" }]}
                  useAnalytics={useTransactionAnalytics}
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
                  contractAddress={contractAddress}
                  chainId={evmContractInfo.chain.chainId}
                  startDate={startDate}
                  endDate={endDate}
                  index={"time"}
                  categories={[{ id: "count", label: "Events" }]}
                  useAnalytics={useLogsAnalytics}
                />
              </ChartContainer>
            </Flex>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Stack spacing={0}>
                <Heading as="h3" size="subtitle.sm">
                  Function Breakdown
                </Heading>
                <Text>
                  The breakdown of calls to each write function from
                  transactions.
                </Text>
              </Stack>
              <ChartContainer w="full" ratio={4.5 / 1}>
                <AnalyticsChart
                  contractAddress={contractAddress}
                  chainId={evmContractInfo.chain.chainId}
                  startDate={startDate}
                  endDate={endDate}
                  index={"time"}
                  categories={"auto"}
                  useAnalytics={useFunctionsAnalytics}
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
                  contractAddress={contractAddress}
                  chainId={evmContractInfo.chain.chainId}
                  startDate={startDate}
                  endDate={endDate}
                  index={"time"}
                  categories={"auto"}
                  useAnalytics={useEventsAnalytics}
                />
              </ChartContainer>
            </Flex>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Stack spacing={0}>
                <Heading as="h3" size="subtitle.sm">
                  Unique Wallets
                </Heading>
                <Text>
                  The number of unique wallet addresses that have sent a
                  transaction to this contract.
                </Text>
              </Stack>
              <ChartContainer w="full" ratio={4.5 / 1}>
                <AnalyticsChart
                  contractAddress={contractAddress}
                  chainId={evmContractInfo.chain.chainId}
                  startDate={startDate}
                  endDate={endDate}
                  index={"time"}
                  categories={[{ id: "wallets", label: "Unique Wallets" }]}
                  useAnalytics={useUniqueWalletsAnalytics}
                />
              </ChartContainer>
            </Flex>
          </SimpleGrid>
        </>
      )}
    </Flex>
  );
};

interface AnalyticsChartProps<
  TAnalytics extends GenericDataType = GenericDataType,
> {
  chainId: number;
  contractAddress: string;
  startDate: Date;
  endDate: Date;
  index: string;
  categories: AreaChartProps<TAnalytics, "time">["categories"] | "auto";
  useAnalytics: (params: AnalyticsQueryParams) => UseQueryResult<TAnalytics[]>;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  chainId,
  contractAddress,
  startDate,
  endDate,
  index,
  categories,
  useAnalytics,
}) => {
  const analyticsQuery = useAnalytics({
    contractAddress,
    chainId,
    startDate,
    endDate,
  });

  const data = useMemo(() => {
    if (!analyticsQuery.data) {
      return [];
    }

    return analyticsQuery.data;
  }, [analyticsQuery.data]);

  if (categories === "auto") {
    return (
      <AutoBarChart
        data={data}
        index={{ id: index }}
        showXAxis
        showYAxis
        startEndOnly
      />
    );
  }

  return (
    <BarChart
      data={data}
      index={{ id: index }}
      categories={categories}
      showXAxis
      showYAxis
      startEndOnly
    />
  );
};
