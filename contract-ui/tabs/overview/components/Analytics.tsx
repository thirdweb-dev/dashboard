import { useEVMContractInfo } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { AspectRatio, Flex, SimpleGrid } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import {
  useGasAnalytics,
  useTransactionAnalytics,
  useUniqueWalletsAnalytics,
} from "data/api/hooks/analytics/transactions";
import { utils } from "ethers";
import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { Heading, Text } from "tw-components";
import { Card } from "tw-components/card";

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

type CustomToolTipProps = {
  valueLabel: string;
  active?: boolean;
  payload?: any;
  valueFormatter?: (value: any) => string;
};

const CustomToolTip: React.FC<CustomToolTipProps> = ({
  active,
  payload,
  valueLabel,
  valueFormatter,
}) => {
  if (active && payload && payload.length) {
    return (
      <Card
        p={2}
        bg="backgroundCardHighlight"
        as={Flex}
        flexDirection="column"
        gap={2}
        border="none"
        outline="none"
      >
        {payload[0]?.payload?.timestamp && (
          <Flex direction="column" gap={0.5}>
            <Heading as="label" size="label.sm">
              Date
            </Heading>
            <Text size="body.sm">
              {new Date(payload[0].payload.timestamp).toLocaleDateString()}
            </Text>
          </Flex>
        )}
        <Flex direction="column" gap={0.5}>
          <Heading as="label" size="label.sm">
            {valueLabel}
          </Heading>
          <Text size="body.sm">
            {valueFormatter
              ? valueFormatter(payload[0].value)
              : payload[0].value}
          </Text>
        </Flex>
      </Card>
    );
  }

  return null;
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

  const data = useMemo(() => {
    if (!transactionAnalyticsQuery.data) {
      return [];
    }
    return [...transactionAnalyticsQuery.data.result.slice(0, 30)].reverse();
  }, [transactionAnalyticsQuery.data]);

  return (
    <Flex flexDir="column" gap={4}>
      <Flex p={0} align="center" justify="space-between">
        <Heading as="h3" size="label.md">
          Transactions
        </Heading>
      </Flex>
      <AspectRatio ratio={2.5 / 1} w="100%">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="barColor"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#3385FF" />
                <stop offset="1" stopColor="#224A85" />
              </linearGradient>
              <linearGradient
                id="areaColor"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#3385FF" />
                <stop offset="1" stopColor="transparent" />
              </linearGradient>
            </defs>
            <Area
              type="natural"
              dataKey="count"
              stroke="url(#barColor)"
              fill="url(#areaColor)"
              dot={<></>}
              activeDot={<></>}
            />
            <Tooltip
              content={(props) => (
                <CustomToolTip
                  active={props.active}
                  payload={props.payload}
                  valueLabel="Transactions"
                />
              )}
              cursor={{
                stroke: "#3385FF",
                opacity: 0.3,
                strokeDasharray: 3,
              }}
            />
            {/* <XAxis
              dataKey="timestamp"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              ticks={
                (data.length
                  ? [data[0].timestamp, data.at(-1)?.timestamp || new Date()]
                  : []) as any
              }
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 10,
              }}
              minTickGap={0}
              axisLine={false}
            /> */}
          </AreaChart>
        </ResponsiveContainer>
      </AspectRatio>
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

  const data = useMemo(() => {
    if (!uniqueWalletsQuery.data) {
      return [];
    }
    return [...uniqueWalletsQuery.data.result.slice(0, 30)].reverse();
  }, [uniqueWalletsQuery.data]);

  return (
    <Flex flexDir="column" gap={4}>
      <Flex p={0} align="center" justify="space-between">
        <Heading as="h3" size="label.md">
          Unique Wallets
        </Heading>
      </Flex>
      <AspectRatio ratio={2.5 / 1} w="100%">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="barColor"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#3385FF" />
                <stop offset="1" stopColor="#224A85" />
              </linearGradient>
              <linearGradient
                id="areaColor"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#3385FF" />
                <stop offset="1" stopColor="transparent" />
              </linearGradient>
            </defs>
            <Area
              type="natural"
              dataKey="count"
              stroke="url(#barColor)"
              fill="url(#areaColor)"
              dot={<></>}
              activeDot={<></>}
            />
            <Tooltip
              content={(props) => (
                <CustomToolTip
                  active={!!props.active}
                  payload={props.payload}
                  valueLabel="Wallets"
                />
              )}
              cursor={{
                stroke: "#3385FF",
                opacity: 0.3,
                strokeDasharray: 3,
              }}
            />
            {/* <XAxis
              dataKey="timestamp"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              ticks={
                (data.length
                  ? [data[0].timestamp, data.at(-1)?.timestamp || new Date()]
                  : []) as any
              }
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 10,
              }}
              minTickGap={0}
              axisLine={false}
            /> */}
          </AreaChart>
        </ResponsiveContainer>
      </AspectRatio>
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

  const data = useMemo(() => {
    if (!gasAnalyticsQuery.data) {
      return [];
    }
    return [...gasAnalyticsQuery.data.result.slice(0, 30)].reverse();
  }, [gasAnalyticsQuery.data]);

  return (
    <Flex flexDir="column" gap={4}>
      <Flex align="center" justify="space-between">
        <Heading as="h3" size="label.md">
          Gas Burnt
        </Heading>
      </Flex>
      <AspectRatio ratio={2.5 / 1} w="100%">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="barColor"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#3385FF" />
                <stop offset="1" stopColor="#224A85" />
              </linearGradient>
              <linearGradient
                id="areaColor"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#3385FF" />
                <stop offset="1" stopColor="transparent" />
              </linearGradient>
            </defs>
            <Area
              type="natural"
              dataKey="value"
              stroke="url(#barColor)"
              fill="url(#areaColor)"
              dot={<></>}
              activeDot={<></>}
            />
            <Tooltip
              content={(props) => (
                <CustomToolTip
                  active={props.active}
                  payload={props.payload}
                  valueLabel="Gas Burnt"
                  valueFormatter={(value) =>
                    `${utils.formatEther(value.toString()).slice(0, 5)} ETH`
                  }
                />
              )}
              cursor={{
                stroke: "#3385FF",
                opacity: 0.3,
                strokeDasharray: 3,
              }}
            />
            {/* <XAxis
              dataKey="timestamp"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              ticks={
                (data.length
                  ? [data[0].timestamp, data.at(-1)?.timestamp || new Date()]
                  : []) as any
              }
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 10,
              }}
              minTickGap={0}
              axisLine={false}
            /> */}
          </AreaChart>
        </ResponsiveContainer>
      </AspectRatio>
    </Flex>
  );
};
