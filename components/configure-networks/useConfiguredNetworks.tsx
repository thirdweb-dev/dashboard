import {
  getConfiguredNetworkListFromCookie,
  setConfiguredNetworkListCookie,
} from "./cookies";
import { ConfiguredNetworkInfo } from "./types";
import { SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk";
import { EVM_RPC_URL_MAP } from "constants/rpc";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import invariant from "tiny-invariant";
import {
  SupportedChainIdToNetworkMap,
  supportedNetworkNameToShortNameRecord,
} from "utils/network";

type SetConfiguredNetworks = (
  newConfiguredNetworks: ConfiguredNetworkInfo[],
) => void;
// create context for ConfiguredNetworks and setConfiguredNetworks
const ConfiguredNetworksContext = createContext<
  ConfiguredNetworkInfo[] | undefined
>(undefined);
const SetConfiguredNetworksContext = createContext<
  SetConfiguredNetworks | undefined
>(undefined);

// Providers
export function ConfiguredNetworksProvider(props: {
  children: React.ReactNode;
}) {
  const [configuredNetworks, setConfiguredNetworks] = useState(() =>
    typeof window === "undefined" ? [] : getConfiguredNetworkListFromCookie(),
  );

  // update cookie when configuredNetworks changes
  useEffect(() => {
    setConfiguredNetworkListCookie(configuredNetworks);
  }, [configuredNetworks]);

  return (
    <ConfiguredNetworksContext.Provider value={configuredNetworks}>
      <SetConfiguredNetworksContext.Provider value={setConfiguredNetworks}>
        {props.children}
      </SetConfiguredNetworksContext.Provider>
    </ConfiguredNetworksContext.Provider>
  );
}

export function useConfiguredNetworks() {
  const networks = useContext(ConfiguredNetworksContext);
  invariant(
    networks,
    "useConfiguredNetworks must be used within a ConfiguredNetworksProvider",
  );
  return networks;
}

export function useSetConfiguredNetworks() {
  const setter = useContext(SetConfiguredNetworksContext);
  invariant(
    setter,
    "useSetConfiguredNetworks must be used within a ConfiguredNetworksProvider",
  );
  return setter;
}

// maps chainId to ConfiguredNetworkInfo
export type ConfiguredNetworkRecord = Record<number, ConfiguredNetworkInfo>;

export function useConfiguredNetworksRecord(): ConfiguredNetworkRecord {
  const configuredNetworks = useConfiguredNetworks();

  const configuredNetworksRecord: ConfiguredNetworkRecord = useMemo(() => {
    // use for loop
    const record: ConfiguredNetworkRecord = {};
    configuredNetworks.forEach((network) => {
      record[network.chainId] = network;
    });

    return record;
  }, [configuredNetworks]);

  return configuredNetworksRecord;
}

type ResolvedNetworkInfo = {
  fullName: string;
  shortName: string;
  rpcUrl: string;
};

export function useResolvedNetworkInfo(
  chainId: number,
): ResolvedNetworkInfo | undefined {
  const configuredNetworks = useConfiguredNetworks();

  // if "supported" network
  if (chainId in SupportedChainIdToNetworkMap) {
    // get old name from chainId
    const oldName = SupportedChainIdToNetworkMap[chainId as SUPPORTED_CHAIN_ID];

    // get shortName from old name
    const shortName =
      supportedNetworkNameToShortNameRecord[
        oldName as keyof typeof supportedNetworkNameToShortNameRecord
      ];

    return {
      fullName: oldName,
      shortName,
      rpcUrl: EVM_RPC_URL_MAP[chainId as SUPPORTED_CHAIN_ID],
    };
  }

  const configuredNetwork = configuredNetworks.find(
    (network) => network.chainId === chainId,
  );

  // if "configured" network
  if (configuredNetwork) {
    return {
      fullName: configuredNetwork.name,
      shortName: configuredNetwork.shortName,
      rpcUrl: configuredNetwork.rpcUrl,
    };
  }
}
