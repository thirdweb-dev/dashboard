import {
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useTxNotifications } from "hooks/useTxNotifications";

interface ApplyForOpCreditsFormProps {
  onClose: () => void;
}

export const ApplyForOpCreditsForm: React.FC<ApplyForOpCreditsFormProps> = ({
  onClose,
}) => {
  const { onSuccess, onError } = useTxNotifications(
    "Credits claimed successfully.",
    "Failed to claimed credits.",
  );

  return (
    <ModalContent>
      <ModalHeader textAlign="center">Gas Credits Application</ModalHeader>
      <ModalCloseButton
        onClick={() => {
          onClose();
        }}
      />
      <ModalBody>
        <Flex as="form" flexDir="column">
          form
        </Flex>
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  );
};
