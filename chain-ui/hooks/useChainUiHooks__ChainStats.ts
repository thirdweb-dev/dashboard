import { useQuery } from "@tanstack/react-query";
import { Chain } from "@thirdweb-dev/chains";
import { getDashboardChainRpc } from "lib/rpc";

interface IChainStats {
  latency: number;
  blockNumber: number;
}

export const useChainUiHooks__ChainStats = (
  chain: Chain,
  placeholderData: IChainStats = { latency: 0, blockNumber: 0 },
) => {
  const rpcUrl = getDashboardChainRpc(chain);

  return useQuery({
    queryKey: ["chain_stats", { chainId: chain.chainId, rpcUrl }],
    queryFn: async () => {
      // we'll just ... manually fetch?
      const startTimeStamp = performance.now();
      const res = await fetch(rpcUrl, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
      });

      const json = await res.json();
      const latency = performance.now() - startTimeStamp;

      return {
        latency,
        blockNumber: parseInt(json.result, 16),
      };
    },
    refetchInterval: 5 * 1000,
    enabled: !!rpcUrl,
    placeholderData,
  });
};
