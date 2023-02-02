import { useUpdateConfiguredChains } from "./configureChains";
import { Chain } from "@thirdweb-dev/chains";
import { StoredChain } from "contexts/configured-chains";
import { useCallback, useEffect, useMemo, useState } from "react";

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

export function useAllChainsSlugRecord() {
  const chains = useAllChains();
  return useMemo(() => {
    return chains.reduce((acc, chain) => {
      acc[chain.slug] = chain;
      return acc;
    }, {} as Record<string, Chain>);
  }, [chains]);
}

/**
 * provides a function to resolve + auto configure given set of chains using allChainsRecord
 */
export function useAutoConfigureChains() {
  const allChainsRecord = useAllChainsRecord();
  const updateConfiguredChains = useUpdateConfiguredChains();

  return useCallback(
    (chainIdSet: Set<number>) => {
      // instead of configuring one by one, configure all at once to avoid triggering re-rendering entire app multiple times

      const chainsToAutoConfigure: StoredChain[] = [];
      chainIdSet.forEach((chainId) => {
        // if we can resolve the chainId
        if (chainId in allChainsRecord) {
          // auto configure it
          chainsToAutoConfigure.push({
            ...allChainsRecord[chainId],
            isAutoConfigured: true,
          });
        }
      });

      if (chainsToAutoConfigure.length > 0) {
        updateConfiguredChains.add(chainsToAutoConfigure);
      }
    },
    [allChainsRecord, updateConfiguredChains],
  );
}
