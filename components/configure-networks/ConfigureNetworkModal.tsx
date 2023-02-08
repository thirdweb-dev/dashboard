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
        w="900px"
        maxW="calc(100vw - 40px)"
      >
        <ModalCloseButton />
        <ModalBody
          p={0}
          _dark={{ background: "backgroundBody" }}
          _light={{ background: "white" }}
        >
          <ConfigureNetworks />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
