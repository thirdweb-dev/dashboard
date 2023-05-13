import { useEVMContractInfo } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import {
  ButtonGroup,
  Flex,
  Input,
  InputGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import { AreaChart } from "components/analytics/area-chart";
import { ChartContainer } from "components/analytics/chart-container";
import {
  useCumulativeWalletsAnalytics,
  useTransactionAnalytics,
  useUniqueWalletsAnalytics,
  useValueAnalytics,
} from "data/analytics/hooks";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Heading, Text } from "tw-components";
import { toDateTimeLocal } from "utils/date-utils";

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
                    type="datetime-local"
                    value={toDateTimeLocal(watch("startDate"))}
                    onChange={(e) =>
                      setValue("startDate", new Date(e.target.value))
                    }
                  />
                </Flex>
                <Flex flexDirection="column" gap={1}>
                  <Text size="body.sm">End Date</Text>
                  <Input
                    size="sm"
                    type="datetime-local"
                    value={toDateTimeLocal(watch("endDate"))}
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
              <Heading as="h3" size="subtitle.sm">
                Transactions
              </Heading>
              <ChartContainer w="full" ratio={4.5 / 1}>
                <TransactionsAnalyticsChart
                  contractAddress={contractAddress}
                  chainId={evmContractInfo.chain.chainId}
                  startDate={startDate}
                  endDate={endDate}
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
                  endDate={endDate}
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
                  endDate={endDate}
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
                  endDate={endDate}
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
  endDate: Date;
}

const TransactionsAnalyticsChart: React.FC<AnalyticsChartProps> = ({
  chainId,
  contractAddress,
  startDate,
  endDate,
}) => {
  const transactionAnalyticsQuery = useTransactionAnalytics({
    contractAddress,
    chainId,
    startDate,
    endDate,
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
  endDate,
}) => {
  const valueAnalyticsQuery = useValueAnalytics({
    contractAddress,
    chainId,
    startDate,
    endDate,
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
  endDate,
}) => {
  const unqiqueWalletsAnalyticsQuery = useUniqueWalletsAnalytics({
    contractAddress,
    chainId,
    startDate,
    endDate,
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
  endDate,
}) => {
  const cumulativeWalletsAnalyticsQuery = useCumulativeWalletsAnalytics({
    contractAddress,
    chainId,
    startDate,
    endDate,
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
