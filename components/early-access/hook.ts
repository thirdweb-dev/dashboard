import { alchemyUrlMap, useBundleDropOwned } from "@3rdweb-sdk/react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { EARLY_ACCESS_DROP } from "constants/early-access";
import { useMemo } from "react";
import { isBrowser } from "utils/isBrowser";
import { SupportedChainId } from "utils/network";

export function useEarlyAccessMetadata() {
  const sdk = useMemo(() => {
    if (!isBrowser()) {
      return undefined;
    }
    return new ThirdwebSDK(alchemyUrlMap[SupportedChainId.Polygon], {
      ipfsGatewayUrl: process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL,
      readOnlyRpcUrl: alchemyUrlMap[SupportedChainId.Polygon],
    });
  }, []);

  return useBundleDropOwned(EARLY_ACCESS_DROP, sdk);
}

export function useEarlyAccessToken() {
  const metadata = useEarlyAccessMetadata();
  if (Array.isArray(metadata.data) && metadata.data.length > 0) {
    return parseInt(metadata.data[0].metadata.id);
  }
}
