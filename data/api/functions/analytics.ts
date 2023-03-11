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

  const result = await fetch(url.toString());

  return result.json() as Promise<AnalyticsTransactionResponse>;
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
  const result = await fetch(url.toString());

  return result.json() as Promise<AnalyticsUniqueAddressesResponse>;
}

export async function getGasAnalytics(params: AnalyticsGasParams) {
  const { address, type, chain } = params;
  const url = new URL(
    `${API_HOSTNAME}/${chain.slug || chain.chainId}/analytics/gas`,
  );
  url.searchParams.append("address", address);
  url.searchParams.append("type", type);
  const result = await fetch(url.toString());

  return result.json() as Promise<AnalyticsGasResponse>;
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
