import { TokenMintForm } from "./mint-form";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { Erc20 } from "@thirdweb-dev/sdk";
import { MintDrawer } from "contract-ui/tabs/components/mint-drawer";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { Button } from "tw-components";

interface TokenMintButtonProps {
  contract: Erc20;
}

export const TokenMintButton: React.FC<TokenMintButtonProps> = ({
  contract,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    /*     <MinterOnly contract={contract}> */
    <>
      <MintDrawer isOpen={isOpen} onClose={onClose}>
        <TokenMintForm contract={contract} />
      </MintDrawer>
      <Button
        {...restButtonProps}
        onClick={onOpen}
        leftIcon={<Icon as={FiPlus} />}
      >
        Mint
      </Button>
    </>
    /*     </MinterOnly> */
  );
};
