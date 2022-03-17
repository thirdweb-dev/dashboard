import { MarketplaceModule } from "@3rdweb/sdk";
import { ModuleSettings } from "../shared/ModuleSettings";

interface IMarketplaceSettings {
  module?: MarketplaceModule;
}

export const MarketplaceSettings: React.FC<IMarketplaceSettings> = ({
  module,
}) => {
  return <ModuleSettings module={module}></ModuleSettings>;
};
