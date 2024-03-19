import { Polygon } from "@thirdweb-dev/chains";
import { FeatureName } from "@thirdweb-dev/sdk/dist/declarations/src/evm/constants/contract-features";
import {
  Abi,
  AddContractInput,
  ValidContractInstance,
  isExtensionEnabled,
  detectFeatures as detectFeaturesFromSdk,
} from "@thirdweb-dev/sdk";
import { Signer } from "ethers";
import { getDashboardChainRpc } from "lib/rpc";
import { getThirdwebSDK } from "lib/sdk";

export function detectFeatures<TContract extends ValidContractInstance | null>(
  contract: ValidContractInstance | null | undefined,
  features: FeatureName[],
  strategy: "any" | "all" = "any",
): contract is TContract {
  if (!contract) {
    return false;
  }
  if (!("abi" in contract)) {
    return false;
  }

  const extensions = detectFeaturesFromSdk(contract.abi as Abi);

  if (strategy === "any") {
    return features.some((feature) =>
      isExtensionEnabled(contract.abi as Abi, feature, extensions),
    );
  }

  return features.every((feature) =>
    isExtensionEnabled(contract.abi as Abi, feature, extensions),
  );
}

export function getGaslessPolygonSDK(signer?: Signer) {
  const polygonSDK = getThirdwebSDK(
    Polygon.chainId,
    getDashboardChainRpc(Polygon),
    {
      gasless: {
        engine: {
          relayerUrl:
            "http://localhost:3005/relayer/813ec596-2187-41fc-93b9-d8deeeb946b3", // replace with engine relayer before merge
          relayerForwarderAddress: "0x409d530a6961297ece29121dbee2c917c3398659",
        },
        experimentalChainlessSupport: true,
      },
    },
    signer,
  );

  return polygonSDK;
}

// TODO - instead of util - create a hook for this to avoid requiring signer
export async function addContractToMultiChainRegistry(
  contractData: AddContractInput,
  signer?: Signer,
) {
  const gaslessPolygonSDK = getGaslessPolygonSDK(signer);
  await gaslessPolygonSDK.multiChainRegistry.addContract(contractData);
}
