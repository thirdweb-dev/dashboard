import { useInfiniteQuery } from "@tanstack/react-query";
import { useLoggedInUser } from "../../../../@3rdweb-sdk/react/hooks/useLoggedInUser";

export type PayPurchasesData = {
  count: number;
  purchases: Array<
    {
      createdAt: string;
      estimatedFeesUSDCents: number;
      fromAmountUSDCents: number;
      fromAmountWei: string;

      purchaseId: string;

      status: "COMPLETED" | "FAILED" | "PENDING";
      toAddress: string;
      toAmountUSDCents: number;
      toAmountWei: string;
      updatedAt: string;
      toToken: {
        chainId: number;
        decimals: number;
        symbol: string;
        name: string;
        tokenAddress: string;
      };
    } & (
      | {
          purchaseType: "ONRAMP";
          fromCurrencyDecimals: number;
          fromCurrencySymbol: string;
        }
      | {
          purchaseType: "SWAP";
          fromToken: {
            chainId: number;
            decimals: number;
            symbol: string;
            name: string;
            tokenAddress: string;
          };
        }
    )
  >;
};

type Response = {
  result: {
    data: PayPurchasesData;
  };
};

export function usePayPurchases(options: {
  clientId: string;
  from: Date;
  to: Date;
  pageSize: number;
}) {
  const { user, isLoggedIn } = useLoggedInUser();

  return useInfiniteQuery({
    queryKey: ["usePayPurchases", user?.address, options],
    queryFn: async ({ pageParam = 0 }) => {
      const endpoint = new URL(
        "https://pay.thirdweb-dev.com/stats/purchases/v1",
      );

      const start = options.pageSize * pageParam;

      endpoint.searchParams.append("skip", `${start}`);
      endpoint.searchParams.append("take", `${options.pageSize}`);

      endpoint.searchParams.append("clientId", options.clientId);
      endpoint.searchParams.append("fromDate", `${options.from.getTime()}`);
      endpoint.searchParams.append("toDate", `${options.to.getTime()}`);

      const res = await fetch(endpoint.toString(), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch pay volume");
      }

      const resJSON = (await res.json()) as Response;

      const pageData = resJSON.result.data;

      const itemsRequested = options.pageSize * (pageParam + 1);
      const totalItems = pageData.count;

      let nextPageIndex: number | null = null;
      if (itemsRequested < totalItems) {
        nextPageIndex = pageParam + 1;
      }

      return {
        pageData: resJSON.result.data,
        nextPageIndex,
      };
    },
    enabled: !!user?.address && isLoggedIn,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageIndex;
    },
  });
}
