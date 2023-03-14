import { Chain } from "@thirdweb-dev/chains";

interface SharedParams {
  chain: Pick<Chain, "slug" | "chainId">;
}

interface PaginationParams {
  start_block?: string;
  end_block?: string;
  cursor?: string;
  page?: number;
  limit?: number;
}

// https://data.thirdweb.com/ethereum/balance?address=0x0138d6b372c92096da771fbb5856c1d5631c7b9c
export interface BalanceResponse {
  result: 0;
}
// https://data.thirdweb.com/ethereum/block_number
export interface BlockNumberResponse {
  result: string;
}

// https://data.thirdweb.com/ethereum/transactions?address=0x0138d6b372c92096da771fbb5856c1d5631c7b9c
export interface TransactionsParams extends PaginationParams, SharedParams {
  address: string;
}

export interface TransactionResponse {
  count: number;
  result: Transaction[];
  previous: string | null;
  next: string | null;
}

export interface Transaction {
  block_number: string;
  hash: string;
  nonce: string;
  block_hash: string;
  transaction_index: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gas_price: string;
  is_error: string;
  input: string;
  contract_address: string;
  cumulative_gas_used: string;
  gas_used: string;
  confirmations: string;
  method_id: string;
  function_name: string;
  function_signature: string;
  tx_receipt_status: string;
  timestamp: string;
}
// https://data.thirdweb.com/ethereum/analytics/balance?address=0x0138d6b372c92096da771fbb5856c1d5631c7b9c
export interface AnalyticsBalanceParams extends SharedParams {
  address: string;
}

export interface AnalyticsBalanceResponse {
  result: AnalyticsBalanceResult[];
}

interface AnalyticsBalanceResult {
  timestamp: string;
  value: number;
}

// https://data.thirdweb.com/ethereum/analytics/transactions?address=0x0138d6b372c92096da771fbb5856c1d5631c7b9c
export interface AnalyticsTransactionParams extends SharedParams {
  address: string;
}

export interface AnalyticsTransactionResponse {
  result: AnalyticsTransactionResult[];
}

interface AnalyticsTransactionResult {
  timestamp: string;
  count: number;
}

// https://data.thirdweb.com/ethereum/analytics/unique_addresses?address=0x0138d6b372c92096da771fbb5856c1d5631c7b9c&type=senders
export interface AnalyticsUniqueAddressesParams extends SharedParams {
  address: string;
  type: "senders" | "receivers";
}

export interface AnalyticsUniqueAddressesResponse {
  result: AnalyticsUniqueAddressesResult[];
}

interface AnalyticsUniqueAddressesResult {
  timestamp: string;
  count: number;
}

// https://data.thirdweb.com/ethereum/analytics/gas?address=0x0138d6b372c92096da771fbb5856c1d5631c7b9c&type=used
export interface AnalyticsGasParams extends SharedParams {
  address: string;
  type: "used" | "spent";
}

export interface AnalyticsGasResponse {
  result: AnalyticsGasResult[];
}

interface AnalyticsGasResult {
  timestamp: string;
  value: number;
}
