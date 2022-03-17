import { useActiveChainId } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { useWeb3 } from "@3rdweb/hooks";
import { useMemo } from "react";
import { SupportedChainId } from "utils/network";

export function useNetworkMismatch(): boolean {
  const { address, chainId } = useWeb3();
  const activeChainId = useActiveChainId();
  return useMemo(() => {
    const signerChainId = chainId as SupportedChainId | undefined;
    if (
      !address ||
      !chainId ||
      !activeChainId ||
      signerChainId === activeChainId
    ) {
      return false;
    }
    return true;
  }, [address, activeChainId, chainId]);
}
