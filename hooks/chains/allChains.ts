import { Chain } from "@thirdweb-dev/chains";
import { useEffect, useMemo, useState } from "react";

/**
 * @returns a list of ALL the chains from `@thirdweb-dev/chains` package
 *
 * initial value is an empty array, and it is updated when the module is loaded asynchronously
 */
export function useAllChains() {
  const [chains, setChains] = useState<Chain[]>([]);

  // TODO - get, set in indexedDB
  useEffect(() => {
    if (chains.length !== 0) {
      return;
    }

    // when network is idle, load the module
    requestIdleCallback(() => {
      // TODO cache this in indexedDB
      import("@thirdweb-dev/chains").then((module) => {
        setChains(module.allChains);
      });
    });
  }, [chains.length]);

  return chains;
}

export function useAllChainsRecord() {
  const chains = useAllChains();
  return useMemo(() => {
    return chains.reduce((acc, chain) => {
      acc[chain.chainId] = chain;
      return acc;
    }, {} as Record<number, Chain>);
  }, [chains]);
}
