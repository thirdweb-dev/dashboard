import { ThirdwebSDK } from "@3rdweb/sdk";
import { useContext } from "react";
import { invariant } from "ts-invariant";
import { ThirdwebSDKContext } from "../Provider";

export function useSDK(): ThirdwebSDK | undefined {
  const { _inProvider, sdk, activeChainId } = useContext(ThirdwebSDKContext);
  if (
    !sdk ||
    !(sdk as any)._chainId ||
    (sdk as any)?._chainId !== activeChainId
  ) {
    // this is a hack to make sure the sdk is always on the correct network before we try to use it
    return undefined;
  }

  invariant(
    _inProvider,
    "Attempting to access ThirdwebSDKContext from outside provider",
  );
  return sdk;
}
