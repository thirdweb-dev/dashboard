import { useContext } from "react";
import { invariant } from "ts-invariant";
import {
  getNetworkFromChainId,
  SupportedChainId,
  SupportedNetwork,
} from "utils/network";
import { ThirdwebSDKContext } from "../Provider";

export function useActiveChainId(): SupportedChainId | undefined {
  const { _inProvider, activeChainId } = useContext(ThirdwebSDKContext);
  invariant(
    _inProvider,
    "Attempting to access ThirdwebSDKContext from outside provider",
  );
  return activeChainId;
}

export function useActiveNetwork(): SupportedNetwork | undefined {
  const activeChainId = useActiveChainId();
  return activeChainId && getNetworkFromChainId(activeChainId);
}
