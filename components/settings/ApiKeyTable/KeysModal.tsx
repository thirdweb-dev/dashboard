import { ApiKeyDetailsRow } from "./DetailsRow";
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
import { Button, CodeBlock, Text } from "tw-components";

interface ApiKeysModalProps {
  apiKey: ApiKey;
  open: boolean;
  onClose: () => void;
}

export const ApiKeysModal: React.FC<ApiKeysModalProps> = ({
  open,
  onClose,
  apiKey,
}) => {
  const { key, secret, secretMasked } = apiKey;

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{apiKey.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            The <em>Key</em> is provided in <Code>x-api-key</Code> header and
            restricted by the access controls (domains, wallets, services, etc.)
            when accessing thirdweb services.
            <br />
            <br />
            The <em>Secret</em> is provided in <Code>x-api-secret</Code> header
            and has full, unrestricted access to all thirdweb services.
            <br />
            <br />
            <strong>
              Store the API Secret in a secured place and never share it.
            </strong>
            <br />
            <br />
            It will only visible for the duration of this window, but you can
            always regenerate it in the API Key details.
          </Text>
          <VStack gap={4} pt={6}>
            <ApiKeyDetailsRow
              title="Key"
              content={<CodeBlock codeValue={key} code={key} />}
            />
            <ApiKeyDetailsRow
              title="Secret"
              content={<CodeBlock codeValue={secret} code={secretMasked} />}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Okay, I&apos;ve saved the Secret
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
