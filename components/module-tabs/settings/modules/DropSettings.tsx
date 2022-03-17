import { BundleDropModule, DropModule } from "@3rdweb/sdk";
import { ClaimConditions } from "../shared/ClaimConditions";
import { ModuleSettings } from "../shared/ModuleSettings";
import { SaleRecipient } from "../shared/SaleRecipient";

interface IDropSettings {
  module?: DropModule | BundleDropModule;
  tokenId?: string;
}

export const DropSettings: React.FC<IDropSettings> = ({ module, tokenId }) => {
  return (
    <ModuleSettings module={module}>
      <ClaimConditions module={module} tokenId={tokenId} />
      <SaleRecipient module={module} />
    </ModuleSettings>
  );
};
