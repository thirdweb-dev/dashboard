import Nav from "./nav";
import { IRoute } from "./types";

type SettingsSidebarProps = {
  activePage: "apiKeys";
};

const links: IRoute[] = [
  { path: "/settings/api-keys", title: "API Keys", name: "apiKeys" },
];

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activePage,
}) => {
  return <Nav links={links} activePage={activePage} title="Settings" />;
};
