import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Button } from "tw-components";

export const DeleteNetworkAlertModal: React.FC<{
  onDelete: () => void;
  networkName: string;
  disclosure: UseDisclosureReturn;
}> = (props) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={props.disclosure.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.disclosure.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" pb={1}>
            Delete Network
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete{" "}
            {props.networkName ? `"${props.networkName}"` : ""} ?{" "}
          </AlertDialogBody>
          <AlertDialogFooter mt={2}>
            <Button ref={cancelRef} onClick={props.disclosure.onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                props.onDelete();
                props.disclosure.onClose();
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
