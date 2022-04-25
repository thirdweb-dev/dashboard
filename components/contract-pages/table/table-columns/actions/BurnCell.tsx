import { useTableContext } from "../../table-context";
import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Tooltip } from "@chakra-ui/react";
import { EditionMetadata, NFTMetadataOwner } from "@thirdweb-dev/sdk";
import React from "react";
import { FaBurn } from "react-icons/fa";
import { Row } from "react-table";

interface IBurnCellProps {
  row?: Row<any>;
}

export const BurnCell: React.FC<IBurnCellProps> = ({ row }) => {
  const tableContext = useTableContext();

  return (
    <Tooltip>
      <Box>
        <Button
          isFullWidth
          onClick={() =>
            tableContext.expandRow({
              tokenId: row.original.metadata.id.toString(),
              type: "burn",
            })
          }
          leftIcon={<Icon as={FaBurn} />}
        >
          Burn
        </Button>
      </Box>
    </Tooltip>
  );
};
