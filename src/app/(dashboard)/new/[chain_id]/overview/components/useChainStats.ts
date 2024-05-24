import { useQuery } from "@tanstack/react-query";
import { thirdwebClient } from "../../../../../../@/constants/client";
import { isProd } from "../../../../../../constants/rpc";
import { hostnameEndsWith } from "../../../../../../utils/url";

export function useChainStatswithRPC(_rpcUrl: string) {
  let rpcUrl = _rpcUrl.replace(
    // eslint-disable-next-line no-template-curly-in-string
    "${THIRDWEB_API_KEY}",
    thirdwebClient.clientId,
  );

  // based on the environment hit dev or production
  if (hostnameEndsWith(rpcUrl, "rpc.thirdweb.com")) {
    if (!isProd) {
      rpcUrl = rpcUrl.replace("rpc.thirdweb.com", "rpc.thirdweb-dev.com");
    }
  }

  return useQuery({
    queryKey: ["chain-stats", { rpcUrl }],
    queryFn: async () => {
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
      const latency = (performance.now() - startTimeStamp).toFixed(0);

      return {
        latency,
        blockNumber: parseInt(json.result, 16),
      };
    },
    refetchInterval: 5 * 1000,
    enabled: !!rpcUrl,
  });
}
