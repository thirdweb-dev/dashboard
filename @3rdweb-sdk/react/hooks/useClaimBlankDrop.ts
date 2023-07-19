import { useMutation } from "@tanstack/react-query";

export function useClaimBlankDrop() {
  return useMutation(
    async ({ network, address }: { network: string; address: string }) => {
      const res = await fetch(`/api/blank-drop/claim`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ network, address }),
      });
      const json = await res.json();

      if (json.error) {
        throw new Error(json.error?.message || json.error);
      }

      return json.data;
    },
  );
}
