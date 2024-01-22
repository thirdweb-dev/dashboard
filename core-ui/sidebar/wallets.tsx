import { SidebarNav } from "./nav";
import { Route } from "./types";

type WalletsSidebarProps = {
  activePage: "connect" | "analytics" | "smart-wallet" | "embedded";
};

const links: Route[] = [
  {
    path: "/dashboard/wallets/connect",
    title: "Connect",
    name: "connect",
  },
  {
    path: "/dashboard/wallets/analytics",
    title: "Analytics",
    name: "analytics",
  },
  {
    path: "/dashboard/wallets/smart-wallet",
    title: "Smart Wallets",
    name: "smart-wallet",
  },
  {
    path: "/dashboard/wallets/embedded",
    title: "Embedded Wallets",
    name: "embedded",
  },
];

export const WalletsSidebar: React.FC<WalletsSidebarProps> = ({
  activePage,
}) => {
  return <SidebarNav links={links} activePage={activePage} title="Wallets" />;
};
