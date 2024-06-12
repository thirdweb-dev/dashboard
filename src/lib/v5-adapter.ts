import { defineChain } from "thirdweb";
import { useSupportedChainsRecord } from "../hooks/chains/configureChains";
import type { Chain } from "@thirdweb-dev/chains";
import { PROD_OR_DEV_URL } from "../constants/rpc";
import { useActiveWalletChain } from "thirdweb/react";

export function defineDashboardChain(chainId: number, dashboardChain?: Chain) {
  return defineChain({
    id: chainId,
    rpc:
      dashboardChain?.rpc?.[0] || `https://${chainId}.rpc.${PROD_OR_DEV_URL}`,
    slug: dashboardChain?.slug,
    nativeCurrency: dashboardChain?.nativeCurrency,
  });
}

export function useV5DashboardChain(chainId: number) {
  const configuredChainsRecord = useSupportedChainsRecord();
  let configuedChain = undefined;
  if (chainId in configuredChainsRecord) {
    configuedChain = configuredChainsRecord[chainId as number];
  }
  return defineDashboardChain(chainId, configuedChain);
}

/**
 * same behavior as v4 `useChain()` but for v5
 */
export function useActiveChainAsDashboardChain(): Chain | undefined {
  const activeChain = useActiveWalletChain()?.id;
  const configuredChainsRecord = useSupportedChainsRecord();

  if (activeChain && activeChain in configuredChainsRecord) {
    return configuredChainsRecord[activeChain as number];
  }
  return undefined;
}
