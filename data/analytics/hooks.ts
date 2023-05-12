import { THIRDWEB_ANALYTICS_API_HOSTNAME } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";

type AnalyticsQueryParams = {
  chainId: number;
  contractAddress: string;
  startDate?: Date;
  endDate?: Date;
  interval?: "minute" | "hour" | "day" | "week" | "month";
};

async function makeQuery(path: string, body: Record<string, any>) {
  return fetch(`${THIRDWEB_ANALYTICS_API_HOSTNAME}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

type TransactionQueryResult = {
  count: number;
  time: string;
};

async function getTransactionAnalytics(
  params: AnalyticsQueryParams,
): Promise<TransactionQueryResult[]> {
  const res = await makeQuery("/transactions", {
    chainId: params.chainId,
    contractAddress: params.contractAddress,
    startDate: params.startDate?.toString(),
    endDate: params.endDate?.toString(),
    interval: params.interval,
  });

  const { results } = await res.json();
  return results.map((item: any) => ({
    count: parseInt(item.cnt),
    time: new Date(item.time).getTime(),
  }));
}

export function useTransactionAnalytics(params: AnalyticsQueryParams) {
  return useQuery({
    queryKey: [
      "analytics",
      "transactions",
      {
        contractAddress: params.contractAddress,
        chainId: params.chainId,
        startDate: `${params.startDate?.getDate()}-${params.startDate?.getMonth()}-${params.startDate?.getFullYear()}`,
      },
    ] as const,
    queryFn: () => {
      return getTransactionAnalytics(params);
    },
    enabled: !!params.contractAddress && !!params.chainId,
    suspense: true,
  });
}

type ValueQueryResult = {
  value: number;
  time: string;
};

async function getValueAnalytics(
  params: AnalyticsQueryParams,
): Promise<ValueQueryResult[]> {
  const res = await makeQuery("/value", {
    chainId: params.chainId,
    contractAddress: params.contractAddress,
    startDate: params.startDate?.toString(),
    endDate: params.endDate?.toString(),
    interval: params.interval,
  });

  const { results } = await res.json();
  return results.map((item: any) => ({
    value: parseFloat(ethers.utils.formatEther(item.value.toString())),
    time: new Date(item.time).getTime(),
  }));
}

export function useValueAnalytics(params: AnalyticsQueryParams) {
  return useQuery({
    queryKey: [
      "analytics",
      "value",
      {
        contractAddress: params.contractAddress,
        chainId: params.chainId,
        startDate: `${params.startDate?.getDate()}-${params.startDate?.getMonth()}-${params.startDate?.getFullYear()}`,
      },
    ] as const,
    queryFn: () => {
      return getValueAnalytics(params);
    },
    enabled: !!params.contractAddress && !!params.chainId,
    suspense: true,
  });
}

type WalletsQueryResult = {
  wallets: number;
  time: string;
};

async function getUniqueWalletsAnalytics(
  params: AnalyticsQueryParams,
): Promise<WalletsQueryResult[]> {
  const res = await makeQuery("/wallets/active", {
    chainId: params.chainId,
    contractAddress: params.contractAddress,
    startDate: params.startDate?.toString(),
    endDate: params.endDate?.toString(),
    interval: params.interval,
  });

  const { results } = await res.json();
  return results.map((item: any) => ({
    wallets: parseInt(item.active_wallets),
    time: new Date(item.time).getTime(),
  }));
}

export function useUniqueWalletsAnalytics(params: AnalyticsQueryParams) {
  return useQuery({
    queryKey: [
      "analytics",
      "unique-wallets",
      {
        contractAddress: params.contractAddress,
        chainId: params.chainId,
        startDate: `${params.startDate?.getDate()}-${params.startDate?.getMonth()}-${params.startDate?.getFullYear()}`,
      },
    ] as const,
    queryFn: () => {
      return getUniqueWalletsAnalytics(params);
    },
    enabled: !!params.contractAddress && !!params.chainId,
    suspense: true,
  });
}

async function getCumulativeWalletsAnalytics(
  params: AnalyticsQueryParams,
): Promise<WalletsQueryResult[]> {
  const res = await makeQuery("/wallets/cumulative", {
    chainId: params.chainId,
    contractAddress: params.contractAddress,
    startDate: params.startDate?.toString(),
    endDate: params.endDate?.toString(),
    interval: params.interval,
  });

  const { results } = await res.json();
  return results.map((item: any) => ({
    wallets: parseInt(item.cumulative_user_count),
    time: new Date(item.time).getTime(),
  }));
}

export function useCumulativeWalletsAnalytics(params: AnalyticsQueryParams) {
  return useQuery({
    queryKey: [
      "analytics",
      "cumulative-wallets",
      {
        contractAddress: params.contractAddress,
        chainId: params.chainId,
        startDate: `${params.startDate?.getDate()}-${params.startDate?.getMonth()}-${params.startDate?.getFullYear()}`,
      },
    ] as const,
    queryFn: () => {
      return getCumulativeWalletsAnalytics(params);
    },
    enabled: !!params.contractAddress && !!params.chainId,
    suspense: true,
  });
}
