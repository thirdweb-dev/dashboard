import { THIRDWEB_API_HOST } from "../../../../../constants/urls";

export function addChainToFavorites(chainId: number) {
  fetch(`${THIRDWEB_API_HOST}/v1/chains/${chainId}/favorite`, {
    method: "POST",
  });
}

export function removeChainFromFavorites(chainId: number) {
  fetch(`${THIRDWEB_API_HOST}/v1/chains/${chainId}/favorite`, {
    method: "DELETE",
  });
}

export async function getAllFavoriteChainIds(): Promise<number[]> {
  const res = await fetch(`${THIRDWEB_API_HOST}/v1/chains/favorites`, {
    method: "GET",
    credentials: "include",
  });

  const data: number[] = await res.json();

  return data;
}
