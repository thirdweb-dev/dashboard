import { AdminMintConditionCell } from "./AdminMintConditionCell";
import { EditionAirdropCell } from "./EditionAirdropCell";
import { EditionTransferCell } from "./EditionTransferCell";
import { OwnerTransferCell } from "./OwnerTransferCell";
import { ButtonGroup, Stack } from "@chakra-ui/react";
import { EditionMetadata, NFTMetadataOwner } from "@thirdweb-dev/sdk";
import { Row } from "react-table";

interface IActionsCell {
  row: Row<NFTMetadataOwner>;
}

export const ActionsCell: React.FC<IActionsCell> = ({ row }) => {
  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <OwnerTransferCell row={row} />
    </Stack>
  );
};

interface IEditionActionsCell {
  row: Row<EditionMetadata>;
}

export const EditionActionsCell: React.FC<IEditionActionsCell> = ({ row }) => {
  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <EditionTransferCell row={row} />
      <EditionAirdropCell row={row} />
    </Stack>
  );
};

export const EditionDropActionsCell: React.FC<IEditionActionsCell> = ({
  row,
}) => {
  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <AdminMintConditionCell row={row} />
      <EditionTransferCell row={row} />
      <EditionAirdropCell row={row} />
    </Stack>
  );
};
