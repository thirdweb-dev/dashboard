import type { ChainMetadata } from "thirdweb/chains";
import { THIRDWEB_API_HOST } from "../../../../constants/urls";

export type ChainSupportedService =
  | "contracts"
  | "connect-sdk"
  | "engine"
  | "account-abstraction"
  | "pay"
  | "rpc-edge";

export type ChainMetadataWithServices = ChainMetadata & {
  services: Array<{
    service: ChainSupportedService;
    enabled: boolean;
  }>;
};

export async function getChain(
  chainIdOrSlug: string,
): Promise<ChainMetadataWithServices> {
  const res = await fetch(
    `${THIRDWEB_API_HOST}/v1/chains/${chainIdOrSlug}?includeServices=true`,
  );

  const result = await res.json();
  if (!result.data) {
    throw new Error(`Chain not found for : ${chainIdOrSlug}`);
  }
  return result.data as ChainMetadataWithServices;
}

export async function getChains() {
  const response = await fetch(
    `${THIRDWEB_API_HOST}/v1/chains?includeServices=true`,
  );

  if (!response.ok) {
    response.body?.cancel();
    throw new Error("Failed to fetch chains");
  }

  return (await response.json()).data as ChainMetadataWithServices[];
}
