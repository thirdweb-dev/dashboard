import { useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Divider,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { Dispatch, SetStateAction, useState } from "react";
import { BsCloudCheck, BsGear } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
  Text,
  Heading,
  Button,
  Badge,
  Card,
  TrackedLinkButton,
} from "tw-components";

interface CreateEngineInstanceButtonProps {
  refetch: () => void;
}

type ModalState = "selectHostingOption";

export const CreateEngineInstanceButton = ({
  refetch,
}: CreateEngineInstanceButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const trackEvent = useTrack();

  const [modalState, setModalState] = useState<ModalState>(
    "selectHostingOption",
  );

  return (
    <>
      <Button
        onClick={() => {
          trackEvent({
            category: "engine",
            action: "click",
            label: "add-engine-instance",
          });
          onOpen();
        }}
        colorScheme="blue"
        leftIcon={<Icon as={FiPlus} boxSize={4} />}
      >
        Create Instance
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalSelectHostingOption setModalState={setModalState} />
        </ModalContent>
      </Modal>
    </>
  );
};

const ModalSelectHostingOption = ({
  setModalState,
}: {
  setModalState: Dispatch<SetStateAction<ModalState>>;
}) => {
  const trackEvent = useTrack();

  const onClickSubscribe = () => {
    trackEvent({
      category: "engine",
      action: "click",
      label: "clicked-cloud-hosted",
    });
  };

  return (
    <>
      <ModalHeader>Create Engine Instance</ModalHeader>
      <ModalBody>
        <Card
          w="full"
          as={Flex}
          gap={10}
          flexDir="column"
          p={{ base: 6, md: 10 }}
          h="full"
          borderColor="gray.800"
        >
          <Flex flexDir="column" gap={6}>
            <Flex flexDir="column" gap={3}>
              <Flex gap={2}>
                <Heading as="h3" size="title.md" textTransform="capitalize">
                  Cloud-Hosted Engine
                </Heading>
              </Flex>
              <Text maxW={320}>Host Engine on thirdweb with no setup.</Text>
            </Flex>
            <Flex alignItems="flex-end" gap={2}>
              <Heading size="title.md" lineHeight={1}>
                $99
              </Heading>
              <Text size="body.lg">/ month</Text>
            </Flex>
          </Flex>
          <Flex
            flexDir="column"
            gap={3}
            grow={1}
            alignItems="flex-start"
            color="accent.900"
          >
            <Text color="accent.900" fontWeight="medium">
              Includes:
            </Text>

            {[
              "Isolated server & database",
              "On-call monitoring from thirdweb",
              "No long-term commitment",
            ].map((f) => (
              <Flex key={f} gap={2}>
                <Icon as={IoCheckmarkCircle} boxSize={5} mt={0.5} />
                <Text>{f}</Text>
              </Flex>
            ))}
          </Flex>
          <Button onClick={onClickSubscribe} colorScheme="blue" py={6}>
            Subscribe
          </Button>
        </Card>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </>
  );
};
