import { useQuery } from "@tanstack/react-query";
import { useLoggedInUser } from "../../../@3rdweb-sdk/react/hooks/useLoggedInUser";

export type PayVolumeData = {
  intervalType: "day" | "week";
  intervalResults: Array<{
    interval: string;
    buyWithCrypto: {
      succeded: number;
      failed: number;
    };
    buyWithFiat: {
      succeded: number;
      failed: number;
    };
    sum: {
      succeeded: number;
      failed: number;
    };
    payouts: {
      succeded: number;
    };
  }>;
  aggregate: {
    buyWithCrypto: {
      succeded: number;
      failed: number;
      bpsIncreaseFromPriorRange: number;
    };
    buyWithFiat: {
      succeded: number;
      failed: number;
      bpsIncreaseFromPriorRange: number;
    };
    sum: {
      succeeded: number;
      failed: number;
      bpsIncreaseFromPriorRange: number;
    };
    payouts: {
      succeded: number;
      bpsIncreaseFromPriorRange: number;
    };
  };
};

type Response = {
  result: {
    data: PayVolumeData;
  };
};

export function usePayVolume(options: {
  clientId: string;
  from: Date;
  to: Date;
  intervalType: "day" | "week";
}) {
  const { user, isLoggedIn } = useLoggedInUser();

  return useQuery(
    ["pay-volume", user?.address, options],
    async () => {
      const endpoint = new URL(
        "https://pay.thirdweb-dev.com/stats/aggregate/volume/v1",
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
        throw new Error("Failed to fetch pay volume");
      }

      const resJSON = (await res.json()) as Response;
      return resJSON.result.data;
    },
    { enabled: !!user?.address && isLoggedIn },
  );
}
