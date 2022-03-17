import { ChainId, useConfig, useEthers } from "@usedapp/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useCallback } from "react";

type ActivateWalletConnect = (
  onError?: (error: Error) => void,
  throwErrors?: boolean,
) => void;

export function useActivateWalletConnect(): ActivateWalletConnect {
  const { activate } = useEthers();

  const { supportedChains } = useConfig();
  const activateWalletConnect = useCallback<ActivateWalletConnect>(
    async (onError, throwErrors) => {
      const walletConnector = new WalletConnectConnector({
        supportedChainIds: supportedChains,
        infuraId: "96839a19075645f7ac777be416df9c0d",
        rpc: {
          [ChainId.Polygon]: "https://polygon-rpc.com",
        },
      });
      if (onError instanceof Function) {
        await activate(walletConnector, onError, throwErrors);
      } else {
        await activate(walletConnector, undefined, throwErrors);
      }
    },
    [activate, supportedChains],
  );

  return activateWalletConnect;
}
