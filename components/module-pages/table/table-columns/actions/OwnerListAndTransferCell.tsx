import { usePackBalance } from "@3rdweb-sdk/react";
import { useWeb3 } from "@3rdweb/hooks";
import { BundleMetadata, NFTMetadataOwner, PackMetadata } from "@3rdweb/sdk";
import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { BigNumber } from "ethers";
import { useSingleQueryParam } from "hooks/useQueryParam";
import React from "react";
import { MdDriveFileMoveOutline, MdOutlineSell } from "react-icons/md";
import { Row } from "react-table";
import { useTableContext } from "../../table-context";

interface IOwnerListAndTransferCellProps {
  row: Row<NFTMetadataOwner> | Row<BundleMetadata> | Row<PackMetadata>;
}

export const OwnerListAndTransferCell: React.FC<
  IOwnerListAndTransferCellProps
> = ({ row }) => {
  const packAddress = useSingleQueryParam("pack");
  const { data: balance } = usePackBalance(
    packAddress,
    row.original.metadata.id,
  );

  const { address } = useWeb3();
  const tableContext = useTableContext();
  const isOwner =
    "owner" in row.original
      ? row.original.owner === address
      : "ownedByAddress" in row.original
      ? BigNumber.from(row.original.ownedByAddress).gt(0)
      : BigNumber.from(balance || 0).gt(0);

  if (!isOwner) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() =>
          tableContext.expandRow({
            tokenId: row.original.metadata.id,
            type: "list",
          })
        }
        leftIcon={<Icon as={MdOutlineSell} />}
      >
        List
      </Button>
      <Button
        onClick={() =>
          tableContext.expandRow({
            tokenId: row.original.metadata.id,
            type: "transfer",
          })
        }
        leftIcon={<Icon as={MdDriveFileMoveOutline} />}
      >
        Transfer
      </Button>
    </>
  );
};
