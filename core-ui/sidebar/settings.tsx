import { SidebarNav } from "./nav";
import { Route } from "./types";

type SettingsSidebarProps = {
  activePage: string;
};

const links:Route[] = [
  { path: "/settings/api-keys", title: "API Keys", name: "apiKeys" },
  {
    path: "/settings/ipfs-gateways",
    title: "IPFS Gateways",
    name: "ipfsGateways",
  },
];

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activePage,
}) => {
  return <SidebarNav links={links} activePage={activePage} title="Settings" />;
};
