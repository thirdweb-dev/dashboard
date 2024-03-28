import {
  Keypair,
  useEngineRevokeKeypair,
} from "@3rdweb-sdk/react/hooks/useEngine";
import {
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  UseDisclosureReturn,
  useDisclosure,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { TWTable } from "components/shared/TWTable";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { Button, FormLabel, Text } from "tw-components";
import { toDateTimeLocal } from "utils/date-utils";

interface KeypairsTableProps {
  instanceUrl: string;
  keypairs: Keypair[];
  isLoading: boolean;
  isFetched: boolean;
}

const columnHelper = createColumnHelper<Keypair>();

const columns = [
  columnHelper.accessor("publicKey", {
    header: "Public Key",
    cell: (cell) => {
      return (
        <Text fontFamily="mono" fontSize="small" whiteSpace="pre-line">
          {cell.getValue()}
        </Text>
      );
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Type",
    cell: (cell) => {
      return <Text>ES256</Text>;
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Added At",
    cell: (cell) => {
      return <Text>{toDateTimeLocal(cell.getValue())}</Text>;
    },
  }),
];

export const KeypairsTable: React.FC<KeypairsTableProps> = ({
  instanceUrl,
  keypairs,
  isLoading,
  isFetched,
}) => {
  const removeDisclosure = useDisclosure();
  const [selectedKeypair, setSelectedKeypair] = useState<Keypair>();

  return (
    <>
      <TWTable
        title="keypairs"
        data={keypairs}
        columns={columns}
        isLoading={isLoading}
        isFetched={isFetched}
        onMenuClick={[
          {
            icon: FiTrash,
            text: "Remove",
            onClick: (keypair) => {
              setSelectedKeypair(keypair);
              removeDisclosure.onOpen();
            },
            isDestructive: true,
          },
        ]}
      />

      {selectedKeypair && removeDisclosure.isOpen && (
        <RemoveModal
          keypair={selectedKeypair}
          disclosure={removeDisclosure}
          instanceUrl={instanceUrl}
        />
      )}
    </>
  );
};

const RemoveModal = ({
  keypair,
  disclosure,
  instanceUrl,
}: {
  keypair: Keypair;
  disclosure: UseDisclosureReturn;
  instanceUrl: string;
}) => {
  const { mutate: revokeKeypair } = useEngineRevokeKeypair(instanceUrl);
  const trackEvent = useTrack();
  const { onSuccess, onError } = useTxNotifications(
    "Successfully removed public key",
    "Failed to remove public key",
  );

  const onClick = () => {
    revokeKeypair(
      { hash: keypair.hash },
      {
        onSuccess: () => {
          onSuccess();
          disclosure.onClose();
          trackEvent({
            category: "engine",
            action: "remove-keypair",
            label: "success",
            instance: instanceUrl,
          });
        },
        onError: (error) => {
          onError(error);
          trackEvent({
            category: "engine",
            action: "remove-keypair",
            label: "error",
            instance: instanceUrl,
            error,
          });
        },
      },
    );
  };

  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove Keypair</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Text>
              Are you sure you want to remove this keypair?
              <br />
              Signatures signed by this keypair will be rejected.
            </Text>
            <FormControl>
              <FormLabel>Public Key</FormLabel>
              <Flex overflowX="scroll">
                <Text fontFamily="mono" size="body.sm" whiteSpace="pre-line">
                  {keypair.publicKey}
                </Text>
              </Flex>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter as={Flex} gap={3}>
          <Button type="button" onClick={disclosure.onClose} variant="ghost">
            Cancel
          </Button>
          <Button type="submit" colorScheme="red" onClick={onClick}>
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
