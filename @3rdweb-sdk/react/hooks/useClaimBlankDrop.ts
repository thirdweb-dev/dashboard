import { useMutation } from "@tanstack/react-query";
import { useUser } from "@thirdweb-dev/react";
import invariant from "tiny-invariant";

export function useClaimBlankDrop() {
  const { user } = useUser();

  return useMutation(async (network: string) => {
    invariant(user, "No user is logged in");

    const res = await fetch(`/api/blank-drop/claim`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ network, address: user?.address }),
    });
    const json = await res.json();

    if (json.error) {
      throw new Error(json.error?.message || json.error);
    }

    return json.data;
  });
}
