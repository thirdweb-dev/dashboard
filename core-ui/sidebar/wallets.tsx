import { SidebarNav } from "./nav";
import { Route } from "./types";

type WalletsSidebarProps = {
  activePage: "overview" | "connect-wallet" | "wallet-sdk" | "smart-wallet";
};

const links: Route[] = [
  { path: "/dashboard/wallets", title: "Overview", name: "overview" },
  {
    path: "/dashboard/wallets/connect-wallet",
    title: "Connect Wallet",
    name: "connect-wallet",
  },
  {
    path: "/dashboard/wallets/wallet-sdk",
    title: "Wallet SDK",
    name: "wallet-sdk",
  },
  {
    path: "/dashboard/wallets/smart-wallet",
    title: "Smart Wallet",
    name: "smart-wallet",
  },
];

export const WalletsSidebar: React.FC<WalletsSidebarProps> = ({
  activePage,
}) => {
  return <SidebarNav links={links} activePage={activePage} title="Wallets" />;
};
