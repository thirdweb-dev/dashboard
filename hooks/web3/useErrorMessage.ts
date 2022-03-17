import { UnsupportedChainIdError } from "@web3-react/core";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";

export function useErrorMessage(
  error?: Error,
): { title: string; message: string } | null {
  if (!error) {
    return null;
  }
  if (error instanceof NoEthereumProviderError) {
    return {
      title: "No Ethereum browser extension",
      message:
        "Install MetaMask on desktop or visit from a dApp browser on mobile.",
    };
  } else if (error instanceof UnsupportedChainIdError) {
    return {
      title: "Unsupported network",
      message: "Switch to a supported network to access the console.",
    };
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return {
      title: "Not authorized",
      message:
        "Install MetaMask on desktop or visit from a dApp browser on mobile.",
    };
  }
  console.error(error);
  return {
    title: "An unknown error occurred",
    message: "You may check the browser console for more details.",
  };
}
