import { ApiKeysModal } from "./ApiKeyTable/KeysModal";
import { ApiKey, useCreateApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Button } from "tw-components";

export const CreateApiKeyButton: React.FC = () => {
  const [createdKey, setCreatedKey] = useState<ApiKey | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createKeyMutation = useCreateApiKey();
  const { onSuccess, onError } = useTxNotifications(
    "API key created",
    "Failed to create API key",
  );

  return (
    <>
      {createdKey && (
        <ApiKeysModal open={isOpen} apiKey={createdKey} onClose={onClose} />
      )}

      <Button
        onClick={() =>
          createKeyMutation.mutate(undefined, {
            onSuccess: (data: ApiKey) => {
              onSuccess();
              setCreatedKey(data);
              onOpen();
            },
            onError: (err) => {
              onError(err);
            },
          })
        }
        colorScheme="blue"
        leftIcon={<Icon as={FiPlus} boxSize={4} />}
        isLoading={createKeyMutation.isLoading}
        isDisabled={createKeyMutation.isLoading}
      >
        Create new key
      </Button>
    </>
  );
};
