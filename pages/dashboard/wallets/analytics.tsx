import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { WalletsSidebar } from "core-ui/sidebar/wallets";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Button, Card, Heading, MenuItem, Text } from "tw-components";
import React, { useEffect, useMemo, useState } from "react";
import {
  ApiKey,
  useApiKeys,
  useWalletStats,
} from "@3rdweb-sdk/react/hooks/useApi";
import { ChartContainer } from "components/analytics/chart-container";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  AutoBarChart,
  BAR_COLORS_DARK,
  BAR_COLORS_LIGHT,
} from "components/analytics/auto-bar-chart";
import { FiChevronDown } from "react-icons/fi";
import { shortenString } from "utils/usedapp-external";
import { useAddress } from "@thirdweb-dev/react";

const TRACKING_CATEGORY = "wallet-analytics";

const DashboardWalletsAnalytics: ThirdwebNextPage = () => {
  // TODO useApiKeys
  const { colorMode } = useColorMode();
  const chartColors = useMemo(() => {
    if (colorMode === "light") {
      return BAR_COLORS_LIGHT;
    }
    return BAR_COLORS_DARK;
  }, [colorMode]);
  const address = useAddress();
  const keysQuery = useApiKeys();
  const apiKeys = keysQuery?.data || [];
  const hasApiKeys = apiKeys.length > 0;
  const [selectedKey, setSelectedKey] = useState<undefined | ApiKey>();
  useEffect(() => {
    if (
      apiKeys.length > 0 &&
      (!selectedKey || !apiKeys.find((key) => key.id === selectedKey.id))
    ) {
      setSelectedKey(apiKeys[0]);
    } else {
      setSelectedKey(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKeys]);
  const statsQuery = useWalletStats(selectedKey?.id);
  const pieChartData = useMemo(() => {
    return statsQuery.data
      ? Object.values(
          statsQuery.data.timeSeries.reduce(
            (acc, curr) => {
              if (!acc[curr.walletType]) {
                acc[curr.walletType] = {
                  walletType: curr.walletType,
                  totalWallets: curr.totalWallets,
                };
              } else {
                acc[curr.walletType].totalWallets += curr.totalWallets;
              }
              return acc;
            },
            {} as Record<string, any>,
          ),
        )
      : [];
  }, [statsQuery.data]);
  const barChartData = useMemo(() => {
    return statsQuery.data
      ? Object.values(
          statsQuery.data.timeSeries.reduce(
            (acc, curr) => {
              if (!acc[curr.dayTime]) {
                acc[curr.dayTime] = {
                  time: new Date(curr.dayTime).getTime(),
                  totalWallets: curr.totalWallets,
                  uniqueWallets: curr.uniqueWallets,
                };
              } else {
                acc[curr.dayTime].totalWallets += curr.totalWallets;
                acc[curr.dayTime].uniqueWallets += curr.uniqueWallets;
              }
              return acc;
            },
            {} as Record<string, any>,
          ),
        )
      : [];
  }, [statsQuery.data]);
  return (
    <Flex flexDir="column" gap={10} mt={{ base: 2, md: 6 }}>
      <Flex flexDir="column" gap={4}>
        <Heading size="title.lg" as="h1">
          Connect Analytics
        </Heading>
        <Text>Monitor your user growth and behaviors</Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        flexDir={{ base: "column", lg: "row" }}
        gap={4}
      >
        {address && hasApiKeys && selectedKey && (
          <Menu>
            {({ isOpen }) => (
              <>
                <Flex
                  w="full"
                  alignItems={{ base: "flex-start", lg: "center" }}
                  gap={1}
                  flexDir={{ base: "column", lg: "row" }}
                >
                  <Text minW={32}>Select an API Key:</Text>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    rightIcon={<FiChevronDown />}
                    variant="outline"
                    minW={60}
                  >
                    <Flex gap={2} alignItems="center">
                      <Heading size="label.md" isTruncated>
                        {selectedKey.name}
                      </Heading>
                      <Text isTruncated>
                        ({shortenString(selectedKey.key)})
                      </Text>
                    </Flex>
                  </MenuButton>
                </Flex>
                <MenuList>
                  {apiKeys.map((apiKey) => (
                    <MenuItem
                      key={apiKey.id}
                      value={apiKey.key}
                      onClick={() => setSelectedKey(apiKey)}
                    >
                      {apiKey.name} ({shortenString(apiKey.key)})
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
        )}
      </Flex>
      <Flex flexDir="column" gap={8}>
        {statsQuery.data && (
          <>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Stack spacing={0} padding={6}>
                <Heading as="h3" size="subtitle.sm">
                  Unique Wallets
                </Heading>
                <Text>
                  Total and unique wallets addresses that connected to your app.
                </Text>
              </Stack>
              <ChartContainer w="full" ratio={21 / 9}>
                <AutoBarChart
                  data={barChartData}
                  showXAxis
                  showYAxis
                  index={{
                    id: "time",
                  }}
                />
              </ChartContainer>
            </Flex>
            <Flex flexDir="column" gap={4} as={Card} bg="backgroundHighlight">
              <Stack spacing={0} padding={6}>
                <Heading as="h3" size="subtitle.sm">
                  Wallet Connectors
                </Heading>
                <Text>
                  The different types of wallets used to connect to your app.
                </Text>
              </Stack>
              <ChartContainer w="full" ratio={21 / 9}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="totalWallets"
                      valueKey="walletType"
                      nameKey="walletType"
                      label={({ walletType }) => walletType}
                      labelLine={false}
                      strokeWidth={3}
                      stroke={"var(--chakra-colors-backgroundHighlight)"}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

DashboardWalletsAnalytics.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <WalletsSidebar activePage="analytics" />
    {page}
  </AppLayout>
);

DashboardWalletsAnalytics.pageId = PageId.DashboardWalletsAnalytics;

export default DashboardWalletsAnalytics;
