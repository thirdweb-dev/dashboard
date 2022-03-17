import {
  Alert,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { parseErrorToMessage } from "utils/errorParser";

export enum DeployMode {
  APP,
  MODULE,
}

interface IDeployingModal {
  isDeploying?: boolean;
  isUploading?: boolean;
  error?: Error | null;
  clearError: () => void;
  deployMode: DeployMode;
}
export const DeployingModal: React.FC<IDeployingModal> = ({
  isUploading,
  isDeploying,
  error,
  clearError,
  deployMode,
}) => {
  return (
    <Modal
      isCentered
      onClose={clearError}
      isOpen={isUploading || isDeploying || !!error}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        {error && <ModalCloseButton />}
        <ModalHeader as={Heading} size="md">
          {error
            ? "Failed to create app"
            : isUploading
            ? "Uploading metadata"
            : deployMode === DeployMode.APP
            ? "Creating Project"
            : "Adding Module"}
        </ModalHeader>
        <ModalBody>
          <Stack spacing={4}>
            {!error && <Progress size="xs" isIndeterminate />}
            {error ? (
              <Alert status="error" borderRadius="md" py={2} px={4}>
                {parseErrorToMessage(error)}
              </Alert>
            ) : (
              <Text>
                You will be prompted to authorize{" "}
                {deployMode === DeployMode.APP
                  ? "1 transaction"
                  : "2 transactions"}
                .
              </Text>
            )}
          </Stack>
        </ModalBody>
        {error && (
          <ModalFooter>
            <Button onClick={clearError} colorScheme="red">
              Close
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
