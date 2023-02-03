import { useConfiguredChains } from "./configureChains";
import { ChainInfo } from "@thirdweb-dev/sdk";
import { useMemo } from "react";

export function useChainInfos() {
  const configuredNetworks = useConfiguredChains();

  const chainInfos = useMemo(() => {
    const record: Record<number, ChainInfo> = {};
    for (const chain of configuredNetworks) {
      record[chain.chainId] = chain;
    }

    return record;
  }, [configuredNetworks]);
  return chainInfos;
}
