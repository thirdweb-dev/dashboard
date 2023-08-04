import { useQuery } from "@tanstack/react-query";

export type GasEstimate = { gasPrice: number; ethPrice: number };

export const useChainUiHooks__AnalyticsBlocksByGasPrice = (body: {
  chainId: number;
  startDate?: string;
  endDate?: string;
  rowIndexStart?: number;
  rowIndexEnd?: number;
}) => {
  // Historical gas prices endpoint.
  const endpoint = `http://localhost:8000/api/v1/blocks/avg-gas-price`;

  return useQuery(
    ["analytics", body.chainId, "blocks", "gas-price"],
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
            block_number: number;
            block_time: number;
            median_gas_price: number;
          }[];
        };
      };
      if (!res.success) {
        return { count: 0, results: [] };
      }
      return res.data;
    },
    {
      refetchInterval: 5_000,
    },
  );
};
