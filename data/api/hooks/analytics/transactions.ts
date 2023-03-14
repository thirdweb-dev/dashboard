import { useQuery } from "@tanstack/react-query";
import {
  getGasAnalytics,
  getTransactionAnalytics,
  getUniqueAddressesAnalytics,
} from "data/api/functions/analytics";
import {
  AnalyticsGasParams,
  AnalyticsTransactionParams,
  AnalyticsUniqueAddressesParams,
} from "data/api/types";
import invariant from "tiny-invariant";

export function queryTransactionAnalytics({
  address,
  chain,
}: Partial<AnalyticsTransactionParams>) {
  return {
    queryKey: ["transactions-analytics", { address, chain }] as const,
    queryFn: () => {
      invariant(address, "Address is required");
      invariant(chain, "Chain is required");
      return getTransactionAnalytics({ address, chain });
    },
    enabled: !!address && !!chain,
    suspense: true,
  };
}

export function useTransactionAnalytics(
  params: Partial<AnalyticsTransactionParams>,
) {
  return useQuery(queryTransactionAnalytics(params));
}

export function queryUniqueWalletsAnalytics({
  address,
  chain,
  type = "senders",
}: Partial<AnalyticsUniqueAddressesParams>) {
  return {
    queryKey: ["transactions-analytics", { address, chain, type }] as const,
    queryFn: () => {
      invariant(address, "Address is required");
      invariant(chain, "Chain is required");
      invariant(type, "Type is required");
      return getUniqueAddressesAnalytics({ address, chain, type });
    },
    enabled: !!address && !!chain && !!type,
    suspense: true,
  };
}

export function useUniqueWalletsAnalytics(
  params: Partial<AnalyticsUniqueAddressesParams>,
) {
  return useQuery(queryUniqueWalletsAnalytics(params));
}

export function queryGasAnalytics({
  address,
  chain,
  type = "used",
}: Partial<AnalyticsGasParams>) {
  return {
    queryKey: ["transactions-analytics", { address, chain, type }] as const,
    queryFn: () => {
      invariant(address, "Address is required");
      invariant(chain, "Chain is required");
      invariant(type, "Type is required");
      return getGasAnalytics({ address, chain, type });
    },
    enabled: !!address && !!chain && !!type,
    suspense: true,
  };
}

export function useGasAnalytics(params: Partial<AnalyticsGasParams>) {
  return useQuery({ ...queryGasAnalytics(params) });
}
