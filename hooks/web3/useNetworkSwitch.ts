import { ChainId, useConfig, useEthers } from "@usedapp/core";
import {
  getNetworkSetupForChainId,
  NETWORK_ADDITIONS,
} from "constants/networks";
import { useCallback, useMemo, useState } from "react";
import invariant from "ts-invariant";
import { isBrowser } from "utils/isBrowser";

type useNetworkSwitchReturn =
  | {
      canSwitch: true;
      supportedChains: number[];
      chainId: ChainId;
      switchChain: (newChainId: ChainId) => Promise<any>;
      isSwitching: boolean;
    }
  | {
      canSwitch: false;
      supportedChains: number[];
    };

export function useNetworkSwitch(): useNetworkSwitchReturn {
  const { chainId, library } = useEthers();
  const { supportedChains } = useConfig();
  const [isSwitching, setIsSwitching] = useState(false);
  const providerRequest = useMemo(() => {
    return library?.provider.request;
  }, [library?.provider.request]);
  const windowRequest = useMemo(() => {
    if (isBrowser()) {
      return (window as any)?.ethereum?.request;
    }
    return undefined;
  }, []);

  const canSwitchEthers = useMemo(
    () => !!(chainId && providerRequest),
    [providerRequest, chainId],
  );

  const canSwitchWindow = useMemo(() => {
    return !!windowRequest;
  }, [windowRequest]);
  const canSwitch = canSwitchEthers || canSwitchWindow;
  const switchChain = useCallback(
    async (newChainId: ChainId) => {
      invariant(supportedChains.includes(newChainId), "Network not supported");
      invariant(canSwitch, "Wallet not ready to switch yet");
      const requestFn = canSwitchEthers
        ? providerRequest
        : canSwitchWindow
        ? windowRequest
        : undefined;
      invariant(requestFn, "cannot switch if there is no FN to request with");

      if (newChainId === chainId) {
        // noop
        console.debug("trying to switch to active chainId, this is a noop");
        return;
      }
      setIsSwitching(true);
      const chainHex = `0x${newChainId.toString(16)}`;

      try {
        await requestFn({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainHex }],
        });
      } catch (switchError) {
        if (
          (switchError as any).code === 4902 &&
          newChainId in NETWORK_ADDITIONS
        ) {
          try {
            await requestFn({
              method: "wallet_addEthereumChain",
              params: [getNetworkSetupForChainId(newChainId)],
            });
          } catch (addError) {
            console.error("failed to add chain", addError);
            throw addError;
          }
        }
        console.error("failed to switch chains", switchError);
        throw switchError;
      } finally {
        setIsSwitching(false);
      }
    },
    [
      supportedChains,
      canSwitch,
      canSwitchEthers,
      providerRequest,
      canSwitchWindow,
      windowRequest,
      chainId,
    ],
  );

  return canSwitch
    ? {
        isSwitching,
        canSwitch,
        supportedChains,
        chainId: chainId as ChainId,
        switchChain,
      }
    : {
        canSwitch,
        supportedChains,
      };
}
