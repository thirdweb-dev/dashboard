import {
  Flex,
  VStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { THIRDWEB_API_HOST } from "constants/urls";
import { useTrack } from "hooks/analytics/useTrack";
import { FiPlus } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Button, Card, Heading, Text } from "tw-components";

interface CreateEngineInstanceButtonProps {
  refetch: () => void;
}

export const CreateEngineInstanceButton = ({
  refetch,
}: CreateEngineInstanceButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const trackEvent = useTrack();
  const toast = useToast();

  const onClickConfirm = async () => {
    trackEvent({
      category: "engine",
      action: "click",
      label: "clicked-cloud-hosted",
    });

    try {
      const res = await fetch(`${THIRDWEB_API_HOST}/v1/engine/request`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        throw new Error(`Unexpected status ${res.status}`);
      }

      toast({
        status: "success",
        description: "Thank you! Our team will reach out shortly.",
      });
      refetch();
    } catch (e) {
      toast({
        status: "error",
        description:
          "Error submitting your request. Please contact sales@thirdweb.com.",
      });
    }
  };

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
              mb={4}
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

              <VStack>
                <Button
                  onClick={onClickConfirm}
                  colorScheme="blue"
                  py={6}
                  w="full"
                >
                  Confirm
                </Button>
                <Text size="body.sm">
                  We will reach out within 1 business day.
                </Text>
              </VStack>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
