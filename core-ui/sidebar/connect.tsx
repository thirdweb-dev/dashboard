import { SidebarNav } from "./nav";
import { Route } from "./types";

type ConnectSidebarProps = {
  activePage:
    | "playground"
    | "analytics"
    | "embedded-wallets"
    | "account-abstraction"
    | "payments-contracts"
    | "payments-settings"
    | "pay-settings";
};

const links: Route[] = [
  {
    path: "/dashboard/connect/playground",
    title: "Playground",
    name: "playground",
  },
  {
    path: "/dashboard/connect/analytics",
    title: "Analytics",
    name: "analytics",
  },
  {
    path: "/dashboard/connect/embedded-wallets",
    title: "Embedded Wallets",
    name: "embedded-wallets",
  },
  {
    path: "/dashboard/connect/account-abstraction",
    title: "Account Abstraction",
    name: "account-abstraction",
  },
  {
    path: "/dashboard/payments/contracts",
    title: "Checkouts Contracts",
    name: "payments-contracts",
  },
  {
    path: "/dashboard/payments/settings",
    title: "Checkouts Settings",
    name: "payments-settings",
  },
  {
    path: "/dashboard/connect/pay",
    title: "Pay",
    name: "pay-settings",
  },
];

export const ConnectSidebar: React.FC<ConnectSidebarProps> = ({
  activePage,
}) => {
  return <SidebarNav links={links} activePage={activePage} title="Connect" />;
};
