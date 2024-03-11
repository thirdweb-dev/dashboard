import {
  EngineInstance,
  useEngineCurrentVersion,
  useEngineLatestVersion,
  useEngineUpdateVersion,
} from "@3rdweb-sdk/react/hooks/useEngine";
import {
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  UseDisclosureReturn,
  useDisclosure,
} from "@chakra-ui/react";
import { useTxNotifications } from "hooks/useTxNotifications";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Button } from "tw-components";

export const EngineVersionBadge = ({
  instance,
}: {
  instance: EngineInstance;
}) => {
  const currentVersionQuery = useEngineCurrentVersion(instance.url);
  const latestVersionQuery = useEngineLatestVersion();
  const disclosure = useDisclosure();

  const current = currentVersionQuery.data;
  const latest = latestVersionQuery.data;
  const isStale = current !== latest;

  if (!isStale) {
    return (
      <Tooltip label="This instance is on the latest version.">
        <Button
          variant="outline"
          size="xs"
          isLoading={currentVersionQuery.isLoading}
        >
          {current}
        </Button>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip label={`Update to ${latest}`}>
        <Button
          onClick={disclosure.onOpen}
          variant="outline"
          size="xs"
          isLoading={currentVersionQuery.isLoading}
          colorScheme="yellow"
          leftIcon={<IoAlertCircleOutline />}
        >
          {current}
        </Button>
      </Tooltip>

      {disclosure.isOpen && (
        <UpdateVersionModal
          disclosure={disclosure}
          latest={latest ?? ""}
          engineId={instance.id}
        />
      )}
    </>
  );
};

const UpdateVersionModal = ({
  disclosure,
  latest,
  engineId,
}: {
  disclosure: UseDisclosureReturn;
  latest: string;
  engineId: string;
}) => {
  const { mutate } = useEngineUpdateVersion();
  const { onSuccess, onError } = useTxNotifications(
    `Submitted a request to update your Engine instance. Please allow 1-2 business days for this process.`,
    "Unexpected error updating your Engine instance.",
  );

  const onClick = () => {
    try {
      mutate({ engineId });
      onSuccess();
    } catch (e) {
      onError(e);
    }
    disclosure.onClose();
  };

  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalContent>
        <ModalCloseButton />

        <ModalHeader>Update Engine to {latest}?</ModalHeader>
        <ModalFooter as={Flex} gap={3}>
          <Button type="button" onClick={disclosure.onClose} variant="ghost">
            Close
          </Button>
          <Button type="submit" onClick={onClick} colorScheme="blue">
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
