import { BundleDropModule } from "@3rdweb/sdk";
import { ModuleSettings } from "../shared/ModuleSettings";
import { SaleRecipient } from "../shared/SaleRecipient";

interface IBundleDropSettings {
  module?: BundleDropModule;
}

export const BundleDropSettings: React.FC<IBundleDropSettings> = ({
  module,
}) => {
  return (
    <ModuleSettings module={module}>
      <SaleRecipient module={module} />
    </ModuleSettings>
  );
};
