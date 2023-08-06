import { SidebarNav } from "./nav";
import { Route } from "./types";

type SettingsSidebarProps = {
  activePage: string;
};

const links: Route[] = [
  { path: "/dashboard/settings/api-keys", title: "API Keys", name: "apiKeys" },
  {
    path: "/dashboard/settings/wallet-options",
    title: "Wallet Options",
    name: "walletOptions",
  },
];

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activePage,
}) => {
  return <SidebarNav links={links} activePage={activePage} title="Settings" />;
};
