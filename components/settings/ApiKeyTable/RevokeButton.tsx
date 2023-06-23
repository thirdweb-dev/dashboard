import { useRevokeApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRef } from "react";
import { Button } from "tw-components";

interface RevokeApiKeyButtonProps {
  id: string;
  name: string;
  onRevoke: () => void;
}

export const RevokeApiKeyButton: React.FC<RevokeApiKeyButtonProps> = ({
  id,
  name,
  onRevoke,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const mutation = useRevokeApiKey();
  const { onSuccess, onError } = useTxNotifications(
    "API Key revoked",
    "Failed to revoke an API Key",
  );

  const handleRevoke = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    mutation.mutate(id, {
      onSuccess: () => {
        onSuccess();
        onRevoke();
      },
      onError,
    });
  };

  return (
    <>
      <Button colorScheme="red" variant="link" onClick={onOpen}>
        Revoke
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Revoke {name}?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to revoke <strong>{name}</strong> key? Any
              integrations using this key will no longer be able to access
              thirdweb services.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleRevoke}
                ml={3}
                isLoading={mutation.isLoading}
              >
                I am sure
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
