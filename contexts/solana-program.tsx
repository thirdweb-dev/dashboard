import { createContext, useContext } from "react";
import invariant from "tiny-invariant";
import { DashboardSolanaNetwork } from "utils/solanaUtils";

export type SolanaProgramInfo = {
  network: DashboardSolanaNetwork;
  slug: string;
  programAddress: string;
};

export const SolanaProgramInfoContext = createContext<
  SolanaProgramInfo | undefined
>(undefined);

export const SolanaProgramInfoProvider = SolanaProgramInfoContext.Provider;

export function useSolanaProgramInfo() {
  const data = useContext(SolanaProgramInfoContext);
  invariant(
    data,
    "useSolanaProgramInfo must be used inside SolanaProgramInfoProvider",
  );
  return data;
}
