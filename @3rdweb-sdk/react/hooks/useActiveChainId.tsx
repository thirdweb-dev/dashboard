import { Chain } from "@thirdweb-dev/chains";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import invariant from "tiny-invariant";
import { SupportedNetwork } from "utils/network";
import { getSolNetworkFromNetworkPath } from "utils/solanaUtils";

export type EVMContractInfo = {
  // using null instead of undefined here so that this type can be JSON stringified
  chain: Chain | null;
  chainSlug: string;
  contractAddress: string;
};

type SetEVMContractInfo = (info: EVMContractInfo) => void;

export const EVMContractInfoContext = createContext<
  EVMContractInfo | undefined
>(undefined);

export const SetEVMContractInfoContext = createContext<
  SetEVMContractInfo | undefined
>(undefined);

// TODO let's move this out of here eventually
export function EVMContractInfoProvider(props: {
  children: React.ReactNode;
  value?: EVMContractInfo;
}) {
  const [value, setValue] = useState(props.value);
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

// TODO remove this and use useEVMContractInfo() if this hook is only for EVM contracts
export function useDashboardNetwork(): SupportedNetwork | undefined {
  const router = useRouter();
  if (router.query.paths) {
    return router.query.paths[0] as SupportedNetwork;
  }
}
