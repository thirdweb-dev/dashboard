import { contractKeys, networkKeys } from "../cache-keys";
import { useQuery } from "@tanstack/react-query";

export function useContractExtensions(
  address: string,
  queryFn: () => Promise<any>,
  chainId: number,
) {
  return useQuery(
    [
      "extensions",
      ...networkKeys.chain(chainId),
      ...contractKeys.detail(address),
    ],
    () => queryFn(),
    { enabled: !!address && typeof queryFn === "function" && !!chainId },
  );
}
