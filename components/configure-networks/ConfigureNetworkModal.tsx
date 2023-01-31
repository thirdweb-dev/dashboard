import { ConfigureNetworks } from "./ConfigureNetworks";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoReload } from "react-icons/io5";
import { Button } from "tw-components";

export interface AddNetworkModalProps {
  onClose: () => void;
}

export const ConfigureNetworkModal: React.FC<AddNetworkModalProps> = (
  props,
) => {
  const [isNewNetworkAdded, setIsNewNetworkAdded] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [showReloadAlert, setShowReloadAlert] = useState(false);

  const handleClose = () => {
    if (isNewNetworkAdded) {
      // for whatever reason changing network config requires a page-reload to take effect
      window.location.reload();
    } else {
      props.onClose();
    }
  };

  const handleModalClose = () => {
    if (isNewNetworkAdded) {
      setShowReloadAlert(true);
    } else {
      props.onClose();
    }
  };

  return (
    <Modal isOpen={true} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius={"xl"}
        overflow="hidden"
        border="1px solid"
        w="950px"
        maxW="calc(100vw - 40px)"
        borderColor={"backgroundHighlight"}
      >
        <ModalCloseButton />
        <ModalBody p={0} background="backgroundBody">
          <ConfigureNetworks
            onNetworkAdded={() => {
              setIsNewNetworkAdded(true);
            }}
          />
        </ModalBody>
      </ModalContent>

      {/* Alert Dialog for Reload */}
      <AlertDialog
        isOpen={showReloadAlert}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reload Required to Apply Network Changes
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                onClick={handleClose}
                ml={3}
                leftIcon={<Icon as={IoReload} />}
              >
                Reload
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Modal>
  );
};
