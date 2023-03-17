import { getTransactions } from "../functions/transactions";
import { TransactionsParams } from "../types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";

export function useInfiniteTransactionsQuery(
  params: Partial<TransactionsParams>,
) {
  return useInfiniteQuery({
    queryKey: [
      "contract-transactions",
      {
        contractAddress: params.address || "UNKNOWN_CONTRACT_ADDRESS",
        chainId: params.chain?.chainId || -1,
        startBlock: params.start_block || -1,
        endBlock: params.end_block || -1,
      },
    ] as const,
    queryFn: async ({ pageParam = "" }) => {
      invariant(params.address, "Address is required");
      invariant(params.chain, "Chain is required");
      return await getTransactions({
        address: params.address,
        chain: params.chain,
        cursor: pageParam,
        end_block: params.end_block,
        start_block: params.start_block,
        limit: 10,
      });
    },
    getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    // REQUIRES a start block so we stay fixed!
    enabled: !!params.address && !!params.chain && !!params.end_block,
    // never re-fetch these
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // these never go stale
    staleTime: Infinity,
  });
}

// this always returns the *latest* transaction only (used to calculate if there are newer transactions than the first one we have)
export function useLatestTransactionQuery(
  params: Partial<TransactionsParams> & {
    isEnabled?: boolean;
  },
) {
  return useQuery({
    queryKey: [
      "latest-contract-transaction",
      {
        contractAddress: params.address || "UNKNOWN_CONTRACT_ADDRESS",
        chainId: params.chain?.chainId || -1,
        end_block: params.end_block || -1,
        start_block: params.start_block || -1,
      },
    ] as const,
    queryFn: async () => {
      invariant(params.address, "Address is required");
      invariant(params.chain, "Chain is required");
      return getTransactions({
        address: params.address,
        chain: params.chain,
        limit: 1,
        end_block: params.end_block,
      });
    },
    // refetch every 10 seconds for now
    refetchInterval: 10 * 1000,

    enabled: !!params.address && !!params.chain && !!params.isEnabled,
  });
}
