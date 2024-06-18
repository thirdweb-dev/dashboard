import { useInfiniteQuery } from "@tanstack/react-query";
import { useLoggedInUser } from "../../../../@3rdweb-sdk/react/hooks/useLoggedInUser";

export type PayTopCustomersData = {
  count: number;
  customers: Array<{
    walletAddress: string;
    totalSpendUSDCents: number;
  }>;
};

type Response = {
  result: {
    data: PayTopCustomersData;
  };
};

export function usePayTopCustomers(options: {
  clientId: string;
  from: Date;
  to: Date;
  pageSize: number;
}) {
  const { user, isLoggedIn } = useLoggedInUser();

  return useInfiniteQuery({
    queryKey: ["usePayTopCustomers", user?.address, options],
    queryFn: async ({ pageParam = 0 }) => {
      const endpoint = new URL(
        "https://pay.thirdweb-dev.com/stats/customers/v1",
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
