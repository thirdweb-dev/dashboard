import { ConnectSDKIcon } from "../chainlist/components/icons/ConnectSDKIcon";
import { ContractIcon } from "../chainlist/components/icons/ContractIcon";
import { EngineIcon } from "../chainlist/components/icons/EngineIcon";
import { PayIcon } from "../chainlist/components/icons/PayIcon";
import { RPCIcon } from "../chainlist/components/icons/RPCIcon";
import { SmartAccountIcon } from "../chainlist/components/icons/SmartAccountIcon";
import type {
  ChainMetadataWithServices,
  ChainSupportedService,
} from "../chainlist/getChain";

export const chainPageTabs: Array<{
  name: string;
  segment: string;
  serviceId?: ChainSupportedService;
  icon: React.FC<{ className?: string }>;
}> = [
  {
    name: "Contracts",
    segment: "",
    serviceId: "contracts",
    icon: ContractIcon,
  },
  {
    name: "Connect SDK",
    segment: "connect",
    serviceId: "connect-sdk",
    icon: ConnectSDKIcon,
  },
  {
    name: "Engine",
    segment: "engine",
    serviceId: "engine",
    icon: EngineIcon,
  },
  {
    name: "Account Abstraction",
    segment: "account-abstraction",
    serviceId: "account-abstraction",
    icon: SmartAccountIcon,
  },
  {
    name: "Pay",
    segment: "pay",
    serviceId: "pay",
    icon: PayIcon,
  },
  {
    name: "RPC Edge",
    segment: "rpc",
    serviceId: "rpc-edge",
    icon: RPCIcon,
  },
];

export function getEnabledTabs(chain: ChainMetadataWithServices) {
  return chainPageTabs
    .map((tab) => {
      const isEnabled =
        chain.services.find((s) => s.service === tab.serviceId)?.enabled ??
        false;
      return {
        ...tab,
        isEnabled,
      };
    })
    .sort((a, b) => {
      if (a.isEnabled && !b.isEnabled) {
        return -1;
      }
      if (!a.isEnabled && b.isEnabled) {
        return 1;
      }
      return 0;
    });
}
