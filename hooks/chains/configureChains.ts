import { Chain } from "@thirdweb-dev/chains";
import {
  ConfiguredChainsContext,
  UpdateConfiguredChainsContext,
} from "contexts/configured-chains";
import { useContext, useMemo } from "react";
import invariant from "tiny-invariant";

/**
 * @returns a list of all the chains that are configured
 */
export function useConfiguredChains() {
  const chains = useContext(ConfiguredChainsContext);
  invariant(
    chains,
    "useConfiguredChains must be used within a ConfiguredNetworksProvider",
  );
  return chains;
}

/**
 * @returns an object with methods to update the configured chains - `add`, `remove`, `update`
 */
export function useUpdateConfiguredChains() {
  const methods = useContext(UpdateConfiguredChainsContext);
  invariant(
    methods,
    "useUpdateConfiguredChains must be used within a ConfiguredNetworksProvider",
  );
  return methods;
}

// maps chainId to Chain
export type ConfiguredChainRecord = Record<number, Chain>;

/**
 * @returns a list of record that maps configured chainId to `Chain` object
 */
export function useConfiguredChainsRecord() {
  const configuredNetworks = useConfiguredChains();

  const configuredNetworksRecord = useMemo(() => {
    const record: ConfiguredChainRecord = {};
    configuredNetworks.forEach((network) => {
      record[network.chainId] = network;
    });

    return record;
  }, [configuredNetworks]);

  return configuredNetworksRecord;
}

/**
 * @returns `Chain` object for the given chainId if it is configured, otherwise `undefined`
 */
export function useConfiguredChain(chainId: number) {
  const record = useConfiguredChainsRecord();
  if (chainId in record) {
    return record[chainId];
  }
}
