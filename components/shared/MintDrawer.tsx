import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { MintForm } from "components/module-pages/forms/mint";

interface IMintDrawer {
  module?: EitherBaseModuleType;
  wrapType?: "token" | "nft";
  isOpen: boolean;
  onClose: () => void;
}

export const MintDrawer: React.FC<IMintDrawer> = ({
  isOpen,
  onClose,
  module,
  wrapType,
}) => {
  return (
    <Drawer
      allowPinchZoom
      preserveScrollBarGap
      size="lg"
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <MintForm module={module} wrapType={wrapType} />
      </DrawerContent>
    </Drawer>
  );
};
