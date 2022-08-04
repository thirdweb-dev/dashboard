import { NFTDrawer } from "./nft-drawer";
import { Td, Tr, useDisclosure } from "@chakra-ui/react";
import { NFT } from "@thirdweb-dev/react";
import { Erc721, Erc1155 } from "@thirdweb-dev/sdk";
import { Row } from "react-table";

interface NFTTableRowProps {
  row: Row<NFT<Erc721<any> | Erc1155<any>>>;
}

export const NFTTableRow: React.FC<NFTTableRowProps> = ({ row }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr
        {...row.getRowProps()}
        role="group"
        _hover={{ bg: "blackAlpha.50" }}
        _dark={{
          _hover: {
            bg: "whiteAlpha.50",
          },
        }}
        // this is a hack to get around the fact that safari does not handle position: relative on table rows
        style={{ cursor: "pointer" }}
        onClick={onOpen}
        // end hack
        borderBottomWidth={1}
        _last={{ borderBottomWidth: 0 }}
      >
        {row.cells.map((cell) => (
          // eslint-disable-next-line react/jsx-key
          <Td {...cell.getCellProps()} borderBottomWidth={"inherit"}>
            {cell.render("Cell")}
          </Td>
        ))}
      </Tr>
      <NFTDrawer isOpen={isOpen} onClose={onClose} data={row.original} />
    </>
  );
};
