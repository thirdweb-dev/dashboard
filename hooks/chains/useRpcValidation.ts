import { useQuery } from "@tanstack/react-query";
import { ZodError, z } from "zod";

const rpcUrlSchema = z.string().url();

export function useRpcValidation(rpcUrl: string) {
  const validUrlQuery = useQuery<string, ZodError>({
    queryKey: ["validate-rpc-url", { rpcUrl }],
    queryFn: async () => {
      return rpcUrlSchema.parseAsync(rpcUrl);
    },
    enabled: false,
    retry: false,
  });

  const supportsChainId = useQuery<boolean, Error>({
    queryKey: ["validate-rpc-chain-id", { rpcUrl }],
    queryFn: async () => {
      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_chainId",
          params: [],
          id: 1,
        }),
      });

      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      return true;
    },
    enabled: false,
    retry: false,
  });

  const supportsBlockNumber = useQuery<boolean, Error>({
    queryKey: ["validate-rpc-block-number", { rpcUrl }],
    queryFn: async () => {
      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
      });

      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      return true;
    },
    enabled: false,
    retry: false,
  });

  const validationReport = {
    urlValid: validUrlQuery.isSuccess,
    urlLoading: validUrlQuery.isFetching,
    urlError: validUrlQuery.error,
    chainIdSupported: supportsChainId.isSuccess,
    chainIdLoading: supportsChainId.isFetching,
    chainIdError: supportsChainId.error,
    blockNumberSupported: supportsBlockNumber.isSuccess,
    blockNumberLoading: supportsBlockNumber.isFetching,
    blockNumberError: supportsBlockNumber.error,
    allValid:
      validUrlQuery.isSuccess &&
      supportsChainId.isSuccess &&
      supportsBlockNumber.isSuccess,
  } as const;

  return [
    validationReport,
    () => {
      validUrlQuery.refetch();
      supportsChainId.refetch();
      supportsBlockNumber.refetch();
    },
  ] as const;
}
