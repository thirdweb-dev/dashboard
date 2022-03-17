import { MinterOnly } from "@3rdweb-sdk/react";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { BundleModule } from "@3rdweb/sdk";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { MintDrawer } from "components/shared/MintDrawer";
import { MismatchButton } from "components/shared/MismatchButton";
import React from "react";
import { FiPlus } from "react-icons/fi";

interface IWrapButtonProps {
  type: "Token" | "NFT";
  module?: BundleModule;
}

export const WrapButton: React.FC<IWrapButtonProps> = ({ module, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MinterOnly module={module}>
      <>
        <MintDrawer
          isOpen={isOpen}
          onClose={onClose}
          module={module as EitherBaseModuleType}
          wrapType={type.toLowerCase() as "token" | "nft"}
        />
        <MismatchButton onClick={onOpen} leftIcon={<Icon as={FiPlus} />}>
          Wrap {type}
        </MismatchButton>
      </>
    </MinterOnly>
  );
};
