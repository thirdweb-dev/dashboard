import { BundleDropModule } from "@3rdweb/sdk";
import { Stack } from "@chakra-ui/react";
import { ClaimConditions } from "components/module-tabs/settings/shared/ClaimConditions";
import { SaleRecipient } from "components/module-tabs/settings/shared/SaleRecipient";

interface IBundleDropTokenSettingsSection {
  tokenId: string;
  module: BundleDropModule;
}

export const BundleDropTokenSettingsSection: React.FC<
  IBundleDropTokenSettingsSection
> = ({ module, tokenId }) => {
  return (
    <Stack spacing={4}>
      <ClaimConditions module={module} tokenId={tokenId} />
      <SaleRecipient module={module} tokenId={tokenId} />
    </Stack>
  );
};
