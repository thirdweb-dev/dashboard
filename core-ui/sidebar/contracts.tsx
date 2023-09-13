import { SidebarNav } from "./nav";
import { Route } from "./types";

type ContractsSidebarProps = {
  activePage: "overview" | "build" | "explore" | "deploy" | "publish";
};

const links: Route[] = [
  { path: "/dashboard/contracts", title: "Overview", name: "overview" },
  { path: "/dashboard/contracts/build", title: "Build", name: "build" },
  {
    path: "/explore",
    title: "Explore",
    name: "explore",
  },
  { path: "/dashboard/contracts/deploy", title: "Deploy", name: "deploy" },
  {
    path: "/dashboard/contracts/publish",
    title: "Publish",
    name: "publish",
  },
];

export const ContractsSidebar: React.FC<ContractsSidebarProps> = ({
  activePage,
}) => {
  return <SidebarNav links={links} activePage={activePage} title="Contracts" />;
};
