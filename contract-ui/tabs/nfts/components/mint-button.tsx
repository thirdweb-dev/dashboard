import { NFTMintForm } from "./mint-form";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { Erc721, Erc1155 } from "@thirdweb-dev/sdk";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { Button, Drawer } from "tw-components";

interface NFTMintButtonProps {
  contract: Erc721 | Erc1155;
}

export const NFTMintButton: React.FC<NFTMintButtonProps> = ({
  contract,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <NFTMintForm contract={contract} />
      </Drawer>
      <Button
        {...restButtonProps}
        onClick={onOpen}
        leftIcon={<Icon as={FiPlus} />}
      >
        Mint
      </Button>
    </>
  );
};
