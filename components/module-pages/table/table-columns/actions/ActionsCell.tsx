import { BundleMetadata, NFTMetadataOwner, PackMetadata } from "@3rdweb/sdk";
import { ButtonGroup, Stack } from "@chakra-ui/react";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { Row } from "react-table";
import { BundleActions } from "./modules/BundleActions";
import { PackActions } from "./modules/PackActions";
import { OwnerListAndTransferCell } from "./OwnerListAndTransferCell";

interface IActionsCell {
  row: Row<NFTMetadataOwner> | Row<BundleMetadata> | Row<PackMetadata>;
}

export const ActionsCell: React.FC<IActionsCell> = ({ row }) => {
  const packAddress = useSingleQueryParam("pack");
  const bundleAddress = useSingleQueryParam("bundle");

  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <OwnerListAndTransferCell row={row} />
      {packAddress && <PackActions row={row as Row<PackMetadata>} />}
      {bundleAddress && <BundleActions row={row as Row<BundleMetadata>} />}
    </Stack>
  );
};
