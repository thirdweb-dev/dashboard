import { SidebarNav } from "./nav";
import { Route } from "./types";

type EngineSidebarProps = {
  activePage: "config";
};

const links: Route[] = [
  { path: "/dashboard/engine/config", title: "Configuration", name: "config" },
];

export const EngineSidebar: React.FC<EngineSidebarProps> = ({ activePage }) => {
  return <SidebarNav links={links} activePage={activePage} title="Engine" />;
};
