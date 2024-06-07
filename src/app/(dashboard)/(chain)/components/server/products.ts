import { ConnectSDKIcon } from "./icons/ConnectSDKIcon";
import { ContractIcon } from "./icons/ContractIcon";
import { EngineIcon } from "./icons/EngineIcon";
import { PayIcon } from "./icons/PayIcon";
import { RPCIcon } from "./icons/RPCIcon";
import { SmartAccountIcon } from "./icons/SmartAccountIcon";
import type { ChainSupportedService } from "../../types/chain";

export const products = [
  {
    name: "Contracts",
    id: "contracts",
    href: "/contracts",
    icon: ContractIcon,
  },
  {
    name: "Connect SDK",
    id: "connect-sdk",
    href: "/connect",
    icon: ConnectSDKIcon,
  },
  {
    name: "RPC Edge",
    id: "rpc-edge",
    href: "https://portal.thirdweb.com/infrastructure/rpc-edge/overview",
    icon: RPCIcon,
  },
  {
    name: "Engine",
    id: "engine",
    href: "/engine",
    icon: EngineIcon,
  },
  {
    name: "Account Abstraction",
    id: "account-abstraction",
    href: "https://portal.thirdweb.com/connect/account-abstraction",
    icon: SmartAccountIcon,
  },
  {
    name: "Pay",
    id: "pay",
    href: "https://portal.thirdweb.com/connect/pay/overview",
    icon: PayIcon,
  },
] satisfies Array<{
  name: string;
  id: ChainSupportedService;
  href: string;
  icon: React.FC<{ className?: string }>;
}>;
