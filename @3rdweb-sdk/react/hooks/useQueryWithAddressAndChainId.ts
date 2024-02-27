import { QueryKey, useQuery } from "@tanstack/react-query";
import { contractKeys, networkKeys } from "../cache-keys";

export function useQueryWithAddressAndChainId<T>(
  key: string,
  address: string,
  queryFn: () => Promise<T>,
  chainId: number,
) {
  return useQuery<T>(
    [key, ...networkKeys.chain(chainId), ...contractKeys.detail(address)] as QueryKey,
    () => queryFn(),
    { enabled: !!key && !!address && typeof queryFn === "function" && !!chainId },
  );
}
