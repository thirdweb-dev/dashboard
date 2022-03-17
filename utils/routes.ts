import { ModuleType } from "@3rdweb/sdk";
import { SupportedNetwork } from "./network";

const ModuleTypeToPath: Record<ModuleType, string> = {
  [ModuleType.ACCESS_NFT]: "access-nft",
  [ModuleType.COLLECTION]: "bundle",
  [ModuleType.CURRENCY]: "token",
  [ModuleType.DATASTORE]: "datastore",
  [ModuleType.DROP]: "drop",
  [ModuleType.BUNDLE_DROP]: "bundle-drop",
  [ModuleType.BUNDLE_SIGNATURE]: "bundle-signature",
  [ModuleType.DYNAMIC_NFT]: "dynamic-nft",
  [ModuleType.MARKET]: "market",
  [ModuleType.MARKETPLACE]: "marketplace",
  [ModuleType.NFT]: "nft-collection",
  [ModuleType.PACK]: "pack",
  [ModuleType.SPLITS]: "split",
  [ModuleType.VOTE]: "",
};

export interface IDashboardRouteProps {
  network: SupportedNetwork;
}

export interface IProjectRouteProps extends IDashboardRouteProps {
  projectAddress: string;
}

export interface IModuleRouteProps extends IProjectRouteProps {
  moduleType: ModuleType;
  moduleAddress: string;
}
export const appRoutes = {
  dashboard: ({ network }: IDashboardRouteProps) => `/${network}`,
  project: ({ network, projectAddress }: IProjectRouteProps) =>
    `${appRoutes.dashboard({ network })}/${projectAddress}`,
  module: ({
    network,
    projectAddress,
    moduleType,
    moduleAddress,
  }: IModuleRouteProps) =>
    `${appRoutes.project({ network, projectAddress })}/${
      ModuleTypeToPath[moduleType]
    }/${moduleAddress}`,
  newProject: ({ network }: IDashboardRouteProps) => `/${network}/new`,
  newModule: ({ network, projectAddress }: IProjectRouteProps) =>
    `${appRoutes.dashboard({ network })}/${projectAddress}/new`,
};
