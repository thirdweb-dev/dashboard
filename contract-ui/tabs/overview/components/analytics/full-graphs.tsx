import { AspectRatio, ButtonGroup, Flex } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import {
  useGasAnalytics,
  useTransactionAnalytics,
  useUniqueWalletsAnalytics,
} from "data/api/hooks/analytics/transactions";
import { utils } from "ethers";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button, Heading, Text } from "tw-components";
import { Card } from "tw-components/card";

interface AnalyticsSectionProps {
  contractAddress: string;
}

type CustomToolTipProps = {
  active: boolean;
  payload: Array<{ value: string; payload?: Record<string, string> }>;
};

const CustomToolTip: React.FC<CustomToolTipProps> = ({ active, payload }) => {
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
            Transactions
          </Heading>
          <Text size="body.sm">{payload[0].value}</Text>
        </Flex>
      </Card>
    );
  }

  return null;
};

CustomToolTip.displayName = "CustomToolTip";

interface TransactionsOverTimeChartProps extends AnalyticsSectionProps {
  chain: Chain;
}

export const TransactionsOverTimeChart: React.FC<
  TransactionsOverTimeChartProps
> = ({ chain, contractAddress }) => {
  const [days, setDays] = useState(30);

  const transactionAnalyticsQuery = useTransactionAnalytics({
    address: contractAddress,
    chain,
  });

  const data = useMemo(() => {
    if (!transactionAnalyticsQuery.data) {
      return [];
    }
    return [...transactionAnalyticsQuery.data.result.slice(0, days)].reverse();
  }, [days, transactionAnalyticsQuery.data]);

  return (
    <Card as={Flex} flexDir="column" pb={0} pl={0} overflow="hidden" gap={4}>
      <Flex pl={6} pr={2} align="center" justify="space-between">
        <Heading as="h3" size="label.lg">
          Transactions
        </Heading>
        <ButtonGroup size="xs" isAttached variant="outline">
          <Button isActive={days === 7} onClick={() => setDays(7)}>
            7 day
          </Button>
          <Button isActive={days === 30} onClick={() => setDays(30)}>
            30 day
          </Button>
        </ButtonGroup>
      </Flex>
      <AspectRatio ratio={16 / 9} w="100%">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
          >
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
            </defs>
            <Bar dataKey="count" fill="url(#barColor)" />
            <Tooltip
              content={CustomToolTip as any}
              cursor={{
                fill: "#3385FF",
                opacity: 0.3,
              }}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              minTickGap={10}
              tickLine={false}
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 12,
              }}
            />
            <YAxis
              minTickGap={10}
              tickLine={false}
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 12,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </AspectRatio>
    </Card>
  );
};

interface UniqueWalletsOverTimeProps extends AnalyticsSectionProps {
  chain: Chain;
}

export const UniqueWalletsOverTime: React.FC<UniqueWalletsOverTimeProps> = ({
  chain,
  contractAddress,
}) => {
  const [days, setDays] = useState(30);

  const uniqueWalletsQuery = useUniqueWalletsAnalytics({
    address: contractAddress,
    chain,
  });

  const data = useMemo(() => {
    if (!uniqueWalletsQuery.data) {
      return [];
    }
    return [...uniqueWalletsQuery.data.result.slice(0, days)].reverse();
  }, [days, uniqueWalletsQuery.data]);

  return (
    <Card as={Flex} flexDir="column" p={0} overflow="hidden">
      <Flex align="center" justify="space-between" p={2}>
        <Heading as="h3" size="label.md">
          Unique Wallets
        </Heading>
        <ButtonGroup size="xs" isAttached variant="outline">
          <Button isActive={days === 7} onClick={() => setDays(7)}>
            7 day
          </Button>
          <Button isActive={days === 30} onClick={() => setDays(30)}>
            30 day
          </Button>
        </ButtonGroup>
      </Flex>
      <AspectRatio ratio={16 / 9} w="100%">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
          >
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
            </defs>
            <Bar dataKey="count" fill="url(#barColor)" />
            <Tooltip
              content={CustomToolTip as any}
              cursor={{
                fill: "#3385FF",
                opacity: 0.3,
              }}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              minTickGap={10}
              tickLine={false}
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 12,
              }}
            />
            <YAxis
              minTickGap={10}
              tickLine={false}
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 12,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </AspectRatio>
    </Card>
  );
};

interface GasSpentOverTimeProps extends AnalyticsSectionProps {
  chain: Chain;
}

export const GasSpentOverTime: React.FC<GasSpentOverTimeProps> = ({
  chain,
  contractAddress,
}) => {
  const [days, setDays] = useState(30);

  const gasAnalyticsQuery = useGasAnalytics({
    address: contractAddress,
    chain,
  });

  const data = useMemo(() => {
    if (!gasAnalyticsQuery.data) {
      return [];
    }
    return [...gasAnalyticsQuery.data.result.slice(0, days)].reverse();
  }, [days, gasAnalyticsQuery.data]);

  return (
    <Card as={Flex} flexDir="column" p={0} overflow="hidden">
      <Flex align="center" justify="space-between" p={2}>
        <Heading as="h3" size="label.md">
          Gas Analytics
        </Heading>
        <ButtonGroup size="xs" isAttached variant="outline">
          <Button isActive={days === 7} onClick={() => setDays(7)}>
            7 day
          </Button>
          <Button isActive={days === 30} onClick={() => setDays(30)}>
            30 day
          </Button>
        </ButtonGroup>
      </Flex>
      <AspectRatio ratio={16 / 9} w="100%">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
          >
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
            </defs>
            <Bar dataKey="value" fill="url(#barColor)" />
            <Tooltip
              content={CustomToolTip as any}
              cursor={{
                fill: "#3385FF",
                opacity: 0.3,
              }}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
              minTickGap={10}
              tickLine={false}
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 12,
              }}
            />
            <YAxis
              minTickGap={10}
              tickLine={false}
              tickFormatter={(value) => {
                if (!value || value < 0) {
                  return "0";
                }
                return `${utils.formatEther(value.toString())} ETH`;
              }}
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: 12,
                lineBreak: "strict",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </AspectRatio>
    </Card>
  );
};
