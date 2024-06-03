import { ConnectSDKIcon } from "./components/icons/ConnectSDKIcon";
import { ContractIcon } from "./components/icons/ContractIcon";
import { EngineIcon } from "./components/icons/EngineIcon";
import { PayIcon } from "./components/icons/PayIcon";
import { RPCIcon } from "./components/icons/RPCIcon";
import { SmartAccountIcon } from "./components/icons/SmartAccountIcon";
import type { ChainSupportedService } from "./getChain";

export const products: Array<{
  name: string;
  id: ChainSupportedService;
  href: string;
  icon: React.FC<{ className?: string }>;
}> = [
  {
    name: "Connect SDK",
    id: "connect-sdk",
    href: "/connect",
    icon: ConnectSDKIcon,
  },
  {
    name: "Contracts",
    id: "contracts",
    href: "/contracts",
    icon: ContractIcon,
  },
  {
    name: "Engine",
    id: "engine",
    href: "/engine",
    icon: EngineIcon,
  },
  {
    name: "RPC Edge",
    id: "rpc-edge",
    href: "https://portal.thirdweb.com/infrastructure/rpc-edge/overview",
    icon: RPCIcon,
  },
  {
    name: "Account Abstraction",
    id: "account-abstraction",
    href: "https://portal.thirdweb.com/connect/account-abstraction",
    icon: SmartAccountIcon,
  },
  {
    name: "thirdweb Pay",
    id: "pay",
    href: "https://portal.thirdweb.com/connect/pay/overview",
    icon: PayIcon,
  },
];
