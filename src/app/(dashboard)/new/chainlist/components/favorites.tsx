import { THIRDWEB_API_HOST } from "../../../../../constants/urls";

export async function isChainToFavorites(chainId: number) {
  const res = await fetch(
    `${THIRDWEB_API_HOST}/v1/chains/${chainId}/favorite`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = await res.json();

  return data.data.favorite as boolean;
}

export function addChainToFavorites(chainId: number) {
  fetch(`${THIRDWEB_API_HOST}/v1/chains/${chainId}/favorite`, {
    method: "POST",
    credentials: "include",
  });
}

export function removeChainFromFavorites(chainId: number) {
  fetch(`${THIRDWEB_API_HOST}/v1/chains/${chainId}/favorite`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function getAllFavoriteChainIds(): Promise<number[]> {
  const res = await fetch(`${THIRDWEB_API_HOST}/v1/chains/favorites`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch favorite chains");
  }

  const data: string[] = (await res.json()).data;

  return data.map(Number);
}
