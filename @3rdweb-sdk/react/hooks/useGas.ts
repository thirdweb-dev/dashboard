import { useQuery } from "react-query";
import { dashboardKeys } from "..";

export function useGas() {
  return useQuery(
    dashboardKeys.gas(),
    async () => {
      const res = await fetch(`/api/gas`);
      return res.json();
    },
    {
      refetchInterval: 10000,
    },
  );
}