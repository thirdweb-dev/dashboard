import { useWeb3 } from "./useWeb3";
import { useQuery } from "react-query";

export function useProjects() {
  const { address } = useWeb3();
  return useQuery(
    ["projects", { address }],
    () => {
      return [];
    },
    {
      enabled: !!address,
    },
  );
}
