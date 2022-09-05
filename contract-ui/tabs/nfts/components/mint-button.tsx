import { NFTMintForm } from "./mint-form";
import { MinterOnly } from "@3rdweb-sdk/react";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { useContract, useMintNFT } from "@thirdweb-dev/react";
import { ValidContractInstance } from "@thirdweb-dev/sdk";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { Button, Drawer } from "tw-components";

interface NFTMintButtonProps {
  contractQuery: ReturnType<typeof useContract>;
}

export const NFTMintButton: React.FC<NFTMintButtonProps> = ({
  contractQuery,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useMintNFT(contractQuery.contract);

  const detectedState = extensionDetectedState({
    contractQuery,
    feature: ["ERC721Mintable", "ERC1155Mintable"],
  });

  if (detectedState !== "enabled") {
    return null;
  }

  return (
    <MinterOnly
      contract={contractQuery?.contract as unknown as ValidContractInstance}
    >
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <NFTMintForm
          contract={contractQuery.contract}
          mintMutation={mutation}
        />
      </Drawer>
      <Button
        colorScheme="primary"
        leftIcon={<Icon as={FiPlus} />}
        {...restButtonProps}
        onClick={onOpen}
      >
        Mint
      </Button>
    </MinterOnly>
  );
};
