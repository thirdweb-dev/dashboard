import { SidebarNav } from "./nav";
import { Route } from "./types";

type EngineSidebarProps = {
  activePage: "overview";
};

const links: Route[] = [
  { path: "/dashboard/engine", title: "Overview", name: "overview" },
];

export const EngineSidebar: React.FC<EngineSidebarProps> = ({ activePage }) => {
  return <SidebarNav links={links} activePage={activePage} title="Engine" />;
};
