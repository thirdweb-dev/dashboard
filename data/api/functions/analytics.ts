import { API_HOSTNAME } from "../constants";
import {
  AnalyticsBalanceParams,
  AnalyticsGasParams,
  AnalyticsGasResponse,
  AnalyticsTransactionParams,
  AnalyticsTransactionResponse,
  AnalyticsUniqueAddressesParams,
  AnalyticsUniqueAddressesResponse,
} from "../types";

export async function getTransactionAnalytics(
  params: AnalyticsTransactionParams,
) {
  const { address, chain } = params;
  const url = new URL(
    `${API_HOSTNAME}/${chain.slug || chain.chainId}/analytics/transactions`,
  );
  url.searchParams.append("address", address);

  const res = await fetch(url.toString());

  const { result } = (await res.json()) as AnalyticsTransactionResponse;
  return {
    result: result.map((item) => ({
      value: item.count,
      timestamp: item.timestamp,
    })),
  };
}

export async function getUniqueAddressesAnalytics(
  params: AnalyticsUniqueAddressesParams,
) {
  const { address, type, chain } = params;
  const url = new URL(
    `${API_HOSTNAME}/${chain.slug || chain.chainId}/analytics/unique_addresses`,
  );
  url.searchParams.append("address", address);
  url.searchParams.append("type", type);
  const res = await fetch(url.toString());

  const { result } = (await res.json()) as AnalyticsUniqueAddressesResponse;
  return {
    result: result.map((item) => ({
      value: item.count,
      timestamp: item.timestamp,
    })),
  };
}

export async function getGasAnalytics(params: AnalyticsGasParams) {
  const { address, type, chain } = params;
  const url = new URL(
    `${API_HOSTNAME}/${chain.slug || chain.chainId}/analytics/gas`,
  );
  url.searchParams.append("address", address);
  url.searchParams.append("type", type);
  const res = await fetch(url.toString());

  const { result } = (await res.json()) as AnalyticsGasResponse;
  return {
    result,
  };
}

export async function getBalanceAnalytics(params: AnalyticsBalanceParams) {
  const { address, chain } = params;
  const url = new URL(
    `${API_HOSTNAME}/${chain.slug || chain.chainId}/analytics/balance`,
  );
  url.searchParams.append("address", address);
  const result = await fetch(url.toString());

  return result.json() as Promise<AnalyticsGasResponse>;
}
