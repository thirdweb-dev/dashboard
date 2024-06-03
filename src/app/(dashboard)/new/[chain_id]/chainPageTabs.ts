import type {
  ChainMetadataWithServices,
  ChainSupportedService,
} from "../chainlist/getChain";

export const chainPageTabs: Array<{
  name: string;
  segment: string;
  serviceId?: ChainSupportedService;
}> = [
  {
    name: "Overview",
    segment: "",
  },
  {
    name: "Contracts",
    segment: "contracts",
    serviceId: "contracts",
  },
  {
    name: "Connect SDK",
    segment: "connect",
    serviceId: "connect-sdk",
  },
  {
    name: "Engine",
    segment: "engine",
    serviceId: "engine",
  },
  {
    name: "Account Abstraction",
    segment: "aa",
    serviceId: "account-abstraction",
  },
  {
    name: "Pay",
    segment: "pay",
    serviceId: "pay",
  },
  {
    name: "RPC Edge",
    segment: "rpc",
    serviceId: "rpc-edge",
  },
];

export function getEnabledTabs(chain: ChainMetadataWithServices) {
  return chainPageTabs.filter((tab) => {
    if (tab.serviceId) {
      return chain.services.find((s) => s.service === tab.serviceId)?.enabled;
    }
    return true;
  });
}
