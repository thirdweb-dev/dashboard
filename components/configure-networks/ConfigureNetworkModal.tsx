import { ConfigureNetworks } from "./ConfigureNetworks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

export interface AddNetworkModalProps {
  onClose: () => void;
}

export const ConfigureNetworkModal: React.FC<AddNetworkModalProps> = (
  props,
) => {
  return (
    <Modal isOpen={true} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius={"xl"}
        overflow="hidden"
        border="2px solid"
        w="800px"
        maxW="calc(100vw - 40px)"
        borderColor={"backgroundHighlight"}
      >
        <ModalCloseButton />
        <ModalBody p={0} background="backgroundBody">
          <ConfigureNetworks />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
