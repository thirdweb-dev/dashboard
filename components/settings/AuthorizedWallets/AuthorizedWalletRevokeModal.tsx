import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button, Text } from "tw-components";

type AuthorizedWalletRevokeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (authorizedWalletId: string) => void;
  authorizedWalletId: string;
};

export const AuthorizedWalletRevokeModal: React.FC<
  AuthorizedWalletRevokeModalProps
> = ({ isOpen, onClose, onSubmit, authorizedWalletId }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure you want to revoke this device?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            If you want to grant access to this device again, you will have to
            contact us.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button
            onClick={() => onSubmit(authorizedWalletId)}
            variant="outline"
            colorScheme="red"
          >
            Revoke
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
