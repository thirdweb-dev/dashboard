import { useQuery } from "@tanstack/react-query";
import { useLoggedInUser } from "../../../../@3rdweb-sdk/react/hooks/useLoggedInUser";

export type PayNewCustomersData = {
  intervalType: "day" | "week";
  intervalResults: Array<{
    /**
     * Date formatted in ISO 8601 format
     */
    interval: string;
    distinctCustomers: number;
  }>;
  aggregate: {
    // totals in the [fromDate, toDate] range
    distinctCustomers: number;
    bpsIncreaseFromPriorRange: number;
  };
};

type Response = {
  result: {
    data: PayNewCustomersData;
  };
};

export function usePayNewCustomers(options: {
  clientId: string;
  from: Date;
  to: Date;
  intervalType: "day" | "week";
}) {
  const { user, isLoggedIn } = useLoggedInUser();

  return useQuery(
    ["usePayNewCustomers", user?.address, options],
    async () => {
      const endpoint = new URL(
        "https://pay.thirdweb-dev.com/stats/aggregate/customers/v1",
      );
      endpoint.searchParams.append("intervalType", options.intervalType);
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
        throw new Error("Failed to fetch new customers");
      }

      const resJSON = (await res.json()) as Response;

      return resJSON.result.data;
    },
    { enabled: !!user?.address && isLoggedIn },
  );
}
