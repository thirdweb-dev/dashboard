import Nav from "./nav";
import { IRoute } from "./types";

type ContractsSidebarProps = {
  activePage: "deployed" | "published";
};

const links: IRoute[] = [
  { path: "/dashboard/contracts", title: "Deployed", name: "deployed" },
  {
    path: "/dashboard/contracts/published",
    title: "Published",
    name: "published",
  },
];

export const ContractsSidebar: React.FC<ContractsSidebarProps> = ({
  activePage,
}) => {
  return <Nav links={links} activePage={activePage} title="Contracts" />;
};
