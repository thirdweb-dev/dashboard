import { useQuery } from "@tanstack/react-query";

export type GasEstimate = { gasPrice: number; ethPrice: number };

export const useChainUiHooks__AnalyticsContractsByTransactionsCount = (body: {
  chainId: number;
  startDate?: string;
  endDate?: string;
  rowIndexStart?: number;
  rowIndexEnd?: number;
}) => {
  // Contracts by transaction count endpoint.
  const endpoint = `http://localhost:8000/api/v1/contracts/transactions-count`;

  return useQuery(
    ["analytics", body.chainId, "contracts", "transactions-count"],
    async () => {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const res = (await resp.json()) as {
        success: boolean;
        data: {
          count: number;
          results: {
            chain_id: number;
            to_address: string;
            num_transactions: number;
          }[];
        };
      };
      if (!res.success) {
        return { count: 0, results: [] };
      }
      return res.data;
    },
    {
      refetchInterval: 60_000,
    },
  );
};
