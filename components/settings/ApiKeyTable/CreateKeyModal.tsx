import { ApiKeyDetailsRow } from "./DetailsRow";
import { ApiKeyKeyForm } from "./KeyForm";
import { ApiKeyFormValues } from "./types";
import { ApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Code,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button, CodeBlock, Text } from "tw-components";

interface ApiKeysCreateModalProps {
  apiKey?: ApiKey | null;
  open: boolean;
  form?: UseFormReturn<ApiKeyFormValues, any>;
  loading?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export const ApiKeysCreateModal: React.FC<ApiKeysCreateModalProps> = ({
  open,
  apiKey,
  form,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const { name, key, secret } = apiKey || {};

  const renderKeys = () => {
    return (
      <>
        <Text>
          Set the <em>Publishable Key</em> in <Code>x-api-key</Code> header to
          access configured thirdweb services.
          <br />
          <br />
          Set the <em>Secret</em> in <Code>x-api-secret</Code> header to have
          full, unrestricted access to all thirdweb services.
          <br />
          <br />
          <strong>
            Store the API Secret in a secured place and never share it. You will
            only see it once, but can always regenerate a new one later.
          </strong>
        </Text>
        <VStack gap={4} pt={6}>
          <ApiKeyDetailsRow
            title="Key"
            content={<CodeBlock codeValue={key} code={key as string} />}
          />
          <ApiKeyDetailsRow
            title="Secret"
            content={<CodeBlock codeValue={secret} code={secret as string} />}
          />
        </VStack>
      </>
    );
  };

  const renderCreateForm = () => {
    if (form && onSubmit) {
      return <ApiKeyKeyForm form={form} onSubmit={onSubmit} tabbed={false} />;
    }
    return null;
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name || "Create API Key"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{apiKey ? renderKeys() : renderCreateForm()}</ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={apiKey ? onClose : onSubmit}
            isLoading={loading}
            disabled={loading}
          >
            {apiKey ? "I've copied the Secret" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
