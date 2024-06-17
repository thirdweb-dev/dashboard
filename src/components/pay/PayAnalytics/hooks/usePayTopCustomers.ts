import { useQuery } from "@tanstack/react-query";
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
  skip: number;
  take: number;
}) {
  const { user, isLoggedIn } = useLoggedInUser();

  return useQuery(
    ["usePayTopCustomers", user?.address, options],
    async () => {
      const endpoint = new URL(
        "https://pay.thirdweb-dev.com/stats/customers/v1",
      );
      endpoint.searchParams.append("skip", `${options.skip}`);
      endpoint.searchParams.append("take", `${options.take}`);

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
      return resJSON.result.data;
    },
    { enabled: !!user?.address && isLoggedIn },
  );
}
