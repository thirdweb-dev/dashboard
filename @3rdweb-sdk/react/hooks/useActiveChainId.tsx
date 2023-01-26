import { Chain } from "@thirdweb-dev/chains";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { createContext, useContext, useState } from "react";
import invariant from "tiny-invariant";
import { SupportedNetwork } from "utils/network";
import { getSolNetworkFromNetworkPath } from "utils/solanaUtils";

type EVMContractInfo = {
  chain?: Chain;
  chainSlug: string;
  contractAddress: string;
};

type SetEVMContractInfo = (info: EVMContractInfo) => void;

export const EVMContractInfoContext = createContext<
  EVMContractInfo | undefined | null
>(undefined);

export const SetEVMContractInfoContext = createContext<
  SetEVMContractInfo | undefined | null
>(undefined);

export function EVMContractInfoProvider(props: { children: React.ReactNode }) {
  const [value, setValue] = useState<EVMContractInfo | null>(null);
  return (
    <EVMContractInfoContext.Provider value={value}>
      <SetEVMContractInfoContext.Provider value={setValue}>
        {props.children}
      </SetEVMContractInfoContext.Provider>
    </EVMContractInfoContext.Provider>
  );
}

export function useEVMContractInfo() {
  const info = useContext(EVMContractInfoContext);
  invariant(
    info !== undefined,
    "useEVMContractInfo must be used inside EVMContractInfoProvider",
  );
  return info;
}

export function useSetEVMContractInfo() {
  const setter = useContext(SetEVMContractInfoContext);
  invariant(
    setter,
    "useSetEVMContractInfo must be used inside EVMContractInfoProvider",
  );
  return setter;
}

// for EVM - get network info from context
export function useDashboardEVMChainId() {
  const contractInfo = useEVMContractInfo();
  return contractInfo?.chain?.chainId;
}

// for SOL - get network name from URL
export function useDashboardSOLNetworkId() {
  const dashboardNetwork = useDashboardNetwork();
  return getSolNetworkFromNetworkPath(dashboardNetwork);
}

export function useDashboardNetwork(): SupportedNetwork | undefined {
  return useSingleQueryParam<SupportedNetwork>("networkOrAddress");
}
