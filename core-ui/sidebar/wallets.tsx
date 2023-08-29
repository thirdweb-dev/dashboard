import { SidebarNav } from "./nav";
import { Route } from "./types";

type WalletsSidebarProps = {
  activePage: "overview" | "connect" | "create" | "smart-wallet";
};

const links: Route[] = [
  { path: "/dashboard/wallets", title: "Overview", name: "overview" },
  {
    path: "/dashboard/wallets/connect",
    title: "Connect",
    name: "connect",
  },
  {
    path: "/dashboard/wallets/create",
    title: "Create",
    name: "create",
    children: [
      {
        path: "/dashboard/wallets/create/smart-wallet",
        title: "Smart Wallet",
        name: "smart-wallet",
      },
    ],
  },
];

export const WalletsSidebar: React.FC<WalletsSidebarProps> = ({
  activePage,
}) => {
  return <SidebarNav links={links} activePage={activePage} title="Wallets" />;
};
