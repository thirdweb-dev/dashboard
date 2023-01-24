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
    <Modal
      isOpen={true}
      onClose={() => {
        props.onClose();
        // TODO @manan
        // for whatever reason changing network config requires a page-reload to take effect
        // ideally we would only do this if the user changed something in their config (add, remove, change config)
        window.location.reload();
      }}
    >
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
