import { BundleDropMetadata } from "@3rdweb/sdk";
import { Button, ButtonGroup } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Stack } from "@chakra-ui/layout";
import React from "react";
import { FiSettings } from "react-icons/fi";
import { Row } from "react-table";
import { useTableContext } from "../../table-context";

interface IAdminMintConditionCellProps {
  row: Row<BundleDropMetadata>;
}

export const AdminMintConditionCell: React.FC<IAdminMintConditionCellProps> = ({
  row,
}) => {
  const tableContext = useTableContext();

  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <Button
        onClick={() =>
          tableContext.expandRow({
            tokenId: row.original.metadata.id,
            type: "settings",
          })
        }
        leftIcon={<Icon as={FiSettings} />}
      >
        Settings
      </Button>
    </Stack>
  );
};
