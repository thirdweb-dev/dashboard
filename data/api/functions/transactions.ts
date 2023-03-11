import { API_HOSTNAME } from "../constants";
import { TransactionResponse, TransactionsParams } from "../types";

export async function getTransactions(
  params: TransactionsParams,
): Promise<TransactionResponse> {
  const { address, page, cursor, start_block, end_block, limit, chain } =
    params;
  const url = new URL(
    `${API_HOSTNAME}/${chain.slug || chain.chainId}/transactions`,
  );
  url.searchParams.append("address", address);
  if (page) {
    url.searchParams.append("page", page.toString());
  }
  if (cursor) {
    url.searchParams.append("cursor", cursor);
  }
  if (start_block) {
    url.searchParams.append("start_block", start_block);
  }
  if (end_block) {
    url.searchParams.append("end_block", end_block);
  }
  if (limit) {
    url.searchParams.append("limit", limit.toString());
  }
  const result = await fetch(url.toString());

  return result.json();
}
