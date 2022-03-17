import { BundleModule } from "@3rdweb/sdk";
import { ModuleSettings } from "../shared/ModuleSettings";

interface IBundleSettings {
  module?: BundleModule;
}

export const BundleSettings: React.FC<IBundleSettings> = ({ module }) => {
  return <ModuleSettings module={module}></ModuleSettings>;
};
