import type { ChainMetadata } from "thirdweb/chains";

export async function getChain(chainIdOrSlug: string): Promise<ChainMetadata> {
  const res = await fetch(
    `https://api.thirdweb.com/v1/chains/${chainIdOrSlug}`,
  );
  const result = await res.json();
  if (!result.data) {
    throw new Error(`Chain not found for : ${chainIdOrSlug}`);
  }
  return result.data as ChainMetadata;
}
