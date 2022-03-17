import { NFTModule } from "@3rdweb/sdk";
import { ModuleSettings } from "../shared/ModuleSettings";
import { SaleRecipient } from "../shared/SaleRecipient";

interface INFTSettings {
  module?: NFTModule;
}

export const NFTSettings: React.FC<INFTSettings> = ({ module }) => {
  return (
    <ModuleSettings module={module}>
      <SaleRecipient module={module} />
    </ModuleSettings>
  );
};
