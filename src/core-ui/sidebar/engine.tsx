import { EngineInstance } from "@3rdweb-sdk/react/hooks/useEngine";
import { SidebarNav } from "./nav";
import { Route } from "./types";

type EngineSidebarProps = {
  instance?: EngineInstance;
  activePage:
    | "manage"
    | "overview"
    | "explorer"
    | "relayers"
    | "contract-subscriptions"
    | "admins"
    | "access-tokens"
    | "webhooks"
    | "configuration";
};

const links: Route[] = [
  {
    path: "/dashboard/engine/overview",
    title: "Overview",
    name: "overview",
  },
  {
    path: "/dashboard/engine/explorer",
    title: "Explorer",
    name: "explorer",
  },
  {
    path: "/dashboard/engine/relayers",
    title: "Relayers",
    name: "relayers",
  },
  {
    path: "/dashboard/engine/contract-subscriptions",
    title: "Contract Subscriptions",
    name: "contract-subscriptions",
  },
  {
    path: "/dashboard/engine/admins",
    title: "Admins",
    name: "admins",
  },
  {
    path: "/dashboard/engine/access-tokens",
    title: "Access Tokens",
    name: "access-tokens",
  },
  {
    path: "/dashboard/engine/webhooks",
    title: "Webhooks",
    name: "webhooks",
  },
  {
    path: "/dashboard/engine/configuration",
    title: "Configuration",
    name: "configuration",
  },
];

export const EngineSidebar: React.FC<EngineSidebarProps> = ({
  instance,
  activePage,
}) => {
  return (
    <SidebarNav
      links={links}
      activePage={activePage}
      title={instance?.name ?? "Engine"}
    />
  );
};
