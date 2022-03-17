import { MinterOnly } from "@3rdweb-sdk/react";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import {
  BundleDropModule,
  BundleModule,
  DropModule,
  PackModule,
} from "@3rdweb/sdk";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { MintDrawer } from "components/shared/MintDrawer";
import { MismatchButton } from "components/shared/MismatchButton";
import React, { useMemo } from "react";
import { FiPlus } from "react-icons/fi";
import { IModuleActionButtonProps } from "./types";

export interface IMintButtonProps extends IModuleActionButtonProps {}
export const MintButton: React.FC<IMintButtonProps> = ({
  module,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const mintButtonText = useMemo(() => {
    return module instanceof DropModule ||
      module instanceof BundleModule ||
      module instanceof BundleDropModule ||
      module instanceof PackModule
      ? "Create"
      : "Mint";
  }, [module]);

  return (
    <MinterOnly module={module}>
      <>
        <MintDrawer
          isOpen={isOpen}
          onClose={onClose}
          module={module as EitherBaseModuleType}
        />
        <MismatchButton
          {...restButtonProps}
          onClick={onOpen}
          leftIcon={<Icon as={FiPlus} />}
        >
          {mintButtonText}
        </MismatchButton>
      </>
    </MinterOnly>
  );
};
