import { BatchLazyMint } from "./batch-lazy-mint";
import { NFTMintForm } from "./mint-form";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { NFTContract } from "@thirdweb-dev/react";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { Button, Drawer } from "tw-components";

interface BatchLazyMintButtonProps {
  contract: NFTContract;
}

export const BatchLazyMintButton: React.FC<BatchLazyMintButtonProps> = ({
  contract,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const detectedState = extensionDetectedState({
    contract,
    feature: ["ERC721BatchMintable", "ERC1155BatchMintable"],
  });

  return (
    <>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <BatchLazyMint contract={contract} isOpen={isOpen} onClose={onClose} />
      </Drawer>
      {detectedState === "enabled" && (
        <Button
          colorScheme="primary"
          leftIcon={<Icon as={FiPlus} />}
          {...restButtonProps}
          onClick={onOpen}
        >
          Batch Upload
        </Button>
      )}
    </>
  );
};
