import { useQuery } from "@tanstack/react-query";

export function useContractBadge(address: string) {
  return useQuery(["badge", "contract", address], async () => {
    const res = await fetch(`/api/badges/contract`, {
      method: "POST",
      body: JSON.stringify({ address }),
    });
    if (res.status >= 400) {
      throw new Error(await res.json().then((r) => r.error));
    }
    return res.json() as Promise<any>;
  });
}
