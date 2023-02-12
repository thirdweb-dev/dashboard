import {
  ThirdwebSDK as EVMThirdwebSDK,
  SDKOptions,
} from "@thirdweb-dev/sdk/evm";
import { ThirdwebSDK as SOLThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { IpfsUploader, ThirdwebStorage } from "@thirdweb-dev/storage";
import { DASHBOARD_THIRDWEB_API_KEY, getSOLRPC } from "constants/rpc";
import type { Signer } from "ethers";
import { DashboardSolanaNetwork } from "utils/solanaUtils";

// use env var to set IPFS gateway or fallback to ipfscdn.io
const IPFS_GATEWAY_URL =
  (process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL as string) ||
  "https://gateway.ipfscdn.io/ipfs";

export const StorageSingleton = new ThirdwebStorage({
  gatewayUrls: {
    "ipfs://": [IPFS_GATEWAY_URL],
  },
});

export function replaceIpfsUrl(url: string) {
  return StorageSingleton.resolveScheme(url);
}

// EVM SDK
const EVM_SDK_MAP = new Map<string, EVMThirdwebSDK>();

export function getEVMThirdwebSDK(
  chainId: number,
  rpcUrl: string,
  sdkOptions?: SDKOptions,
  signer?: Signer,
): EVMThirdwebSDK {
  // PERF ISSUE - if the sdkOptions is a huge object, stringify will be slow
  const sdkKey = chainId + (sdkOptions ? JSON.stringify(sdkOptions) : "");

  let sdk: EVMThirdwebSDK | null = null;

  if (EVM_SDK_MAP.has(sdkKey)) {
    sdk = EVM_SDK_MAP.get(sdkKey) as EVMThirdwebSDK;
  } else {
    sdk = new EVMThirdwebSDK(
      rpcUrl,
      {
        readonlySettings: {
          rpcUrl,
          chainId,
        },
        thirdwebApiKey: DASHBOARD_THIRDWEB_API_KEY,
        ...sdkOptions,
      },
      StorageSingleton,
    );

    EVM_SDK_MAP.set(sdkKey, sdk);
  }

  if (signer) {
    sdk.updateSignerOrProvider(signer);
  }

  return sdk;
}

// SOLANA SDK
const SOL_SDK_MAP = new Map<DashboardSolanaNetwork, SOLThirdwebSDK>();

export function getSOLThirdwebSDK(
  network: DashboardSolanaNetwork,
): SOLThirdwebSDK {
  if (SOL_SDK_MAP.has(network)) {
    return SOL_SDK_MAP.get(network) as SOLThirdwebSDK;
  }
  const rpcUrl = getSOLRPC(network);
  const sdk = SOLThirdwebSDK.fromNetwork(
    rpcUrl,
    new ThirdwebStorage({
      uploader: new IpfsUploader({ uploadWithGatewayUrl: true }),
    }),
  );
  SOL_SDK_MAP.set(network, sdk);
  return sdk;
}
