import {
  useDashboardEVMChainId,
  useEVMContractInfo,
} from "@3rdweb-sdk/react/hooks/useActiveChainId";
import {
  usePaymentsContractByAddressAndChain,
  usePaymentsDetailedAnalytics,
} from "@3rdweb-sdk/react/hooks/usePayments";
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
  AnalyticsQueryParams,
  SUPPORTED_ANALYTICS_CHAINS,
  TotalQueryResult,
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
import { PaymentsAnalytics } from "./components/payments-analytics";

interface ContractPaymentsPageProps {
  contractAddress?: string;
}

export const ContractPaymentsPage: React.FC<ContractPaymentsPageProps> = ({
  contractAddress,
}) => {
  const chainId = useDashboardEVMChainId();
  const { data: paymentContract } = usePaymentsContractByAddressAndChain(
    contractAddress,
    chainId,
  );
  useEffect(() => {
    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!contractAddress) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap={6}>
      payments page yay
      {paymentContract?.id && (
        <PaymentsAnalytics contractId={paymentContract?.id} />
      )}
    </Flex>
  );
};
