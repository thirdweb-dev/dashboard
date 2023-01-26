import { useConfiguredChains } from "./configureChains";
import { ChainInfo } from "@thirdweb-dev/sdk";
import { useMemo } from "react";

export function useChainInfos() {
  const configuredNetworks = useConfiguredChains();

  const chainInfos = useMemo(() => {
    const record: Record<number, ChainInfo> = {};
    for (const chain of configuredNetworks) {
      record[chain.chainId] = {
        rpc: chain.rpc[0],
      };
    }

    return record;
  }, [configuredNetworks]);
  return chainInfos;
}
