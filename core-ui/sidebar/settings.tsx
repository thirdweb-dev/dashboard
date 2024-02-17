import { SidebarNav } from "./nav";
import { Route } from "./types";

type SettingsSidebarProps = {
  activePage:
    | "apiKeys"
    | "apiKey"
    | "devices"
    | "usage"
    | "billing"
    | "companySettings"
    | "notifications";
};

const links: Route[] = [
  {
    path: "/dashboard/settings/api-keys",
    subActivePath: true,
    title: "API Keys",
    name: "apiKeys",
  },
  { path: "/dashboard/settings/devices", title: "Devices", name: "devices" },
  {
    path: "/dashboard/settings/billing",
    title: "Billing",
    name: "billing",
  },
  { path: "/dashboard/settings/usage", title: "Usage", name: "usage" },
  {
    path: "/dashboard/settings/company-settings",
    title: "Company Settings",
    name: "companySettings",
  },
  {
    path: "/dashboard/settings/notifications",
    title: "Notifications",
    name: "notifications",
  },
];

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activePage,
}) => {
  return <SidebarNav links={links} activePage={activePage} title="Settings" />;
};
