import { useSingleQueryParam } from "hooks/useQueryParam";
import { createContext, useContext } from "react";
import { SupportedNetwork, getSolNetworkFromNetworkPath } from "utils/network";

export type ActiveNetworkInfo = {
  chainId: number;
  network: string;
  rpcUrl: string;
};

export const ActiveNetworkInfoContext = createContext<
  ActiveNetworkInfo | undefined
>(undefined);

/**
 * info of the network that the contract is deployed on
 *
 * for example: If you are on contract details page and that contract is deployed on polygon
 * in that case - this hook will return polygon network info
 *
 * if you are on a page where we are not seeing details of any particular contract
 * then this hook will return undefined. Ex: /dashboard page
 */
export function useActiveNetworkInfo() {
  return useContext(ActiveNetworkInfoContext);
}

// for EVM - get network info from context
export function useDashboardEVMChainId() {
  const network = useActiveNetworkInfo();
  return network?.chainId;
}

// for SOL - get network name from URL
export function useDashboardSOLNetworkId() {
  const dashboardNetwork = useDashboardNetwork();
  return getSolNetworkFromNetworkPath(dashboardNetwork);
}

export function useDashboardNetwork(): SupportedNetwork | undefined {
  return useSingleQueryParam<SupportedNetwork>("networkOrAddress");
}
