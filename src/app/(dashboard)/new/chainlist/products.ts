import { ConnectSDKIcon } from "./components/icons/ConnectSDKIcon";
import { ContractIcon } from "./components/icons/ContractIcon";
import { EngineIcon } from "./components/icons/EngineIcon";
import { PayIcon } from "./components/icons/PayIcon";
import { RPCIcon } from "./components/icons/RPCIcon";
import { SmartAccountIcon } from "./components/icons/SmartAccountIcon";

export const products = [
  {
    name: "Connect SDK",
    href: "/connect",
    icon: ConnectSDKIcon,
  },
  {
    name: "Contracts",
    href: "/contracts",
    icon: ContractIcon,
  },
  {
    name: "thirdweb Pay",
    href: "https://portal.thirdweb.com/connect/pay/overview",
    icon: PayIcon,
  },
  {
    name: "Engine",
    href: "/engine",
    icon: EngineIcon,
  },
  {
    name: "RPC Edge",
    href: "https://portal.thirdweb.com/infrastructure/rpc-edge/overview",
    icon: RPCIcon,
  },
  {
    name: "Account Abstraction",
    href: "https://portal.thirdweb.com/connect/account-abstraction",
    icon: SmartAccountIcon,
  },
];
