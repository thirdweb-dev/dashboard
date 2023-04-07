import {
  AddRecentlyUsedChainsContext,
  RecentlyUsedChainsContext,
} from "contexts/configured-chains";
import { useContext } from "react";
import invariant from "tiny-invariant";

export function useRecentlyUsedChains() {
  const context = useContext(RecentlyUsedChainsContext);
  invariant(
    context,
    "useRecentlyUsedChains must be used within ModifyChainContext",
  );
  return context;
}

export function useAddRecentlyUsedChains() {
  const context = useContext(AddRecentlyUsedChainsContext);
  invariant(
    context,
    "useRecentlyUsedChains must be used within ModifyChainContext",
  );
  return context;
}
