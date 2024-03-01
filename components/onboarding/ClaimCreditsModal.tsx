import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTxNotifications } from "hooks/useTxNotifications";
import { Button, Card, Heading, Link, Text } from "tw-components";
import { useGrantCredits } from "@3rdweb-sdk/react/hooks/useApi";

interface ClaimCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimCreditsModal: React.FC<ClaimCreditsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutate: claimCredits } = useGrantCredits();
  const { onSuccess, onError } = useTxNotifications(
    "Credits claimed successfully.",
    "Failed to claimed credits.",
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Claim Gas Credits</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" gap={6}>
            <Card as={Flex} alignItems="center" gap={2} flexDir="column">
              <Text textAlign="center">You're eligible for</Text>
              <Heading color="bgBlack" size="title.2xl" fontWeight="extrabold">
                $1000
              </Heading>
              <Text letterSpacing="wider" fontWeight="bold">
                GAS CREDITS
              </Text>
            </Card>
            <Flex flexDir="column" gap={1}>
              <Text color="bgBlack">Eligible chains</Text>
              <Text color="faded">Optimism and Base.</Text>
            </Flex>
            <Flex flexDir="column" gap={2}>
              <Text color="bgBlack">How to use my credits</Text>
              <Card>
                <Text color="faded">
                  Credits will automatically be applied to cover gas fees for
                  any on-chain activity across thirdweb services.
                </Text>
              </Card>
              <Card>
                <Text color="faded">
                  Credits apply across all API keys. You can see how many
                  credits you have left at the top of the dashboard and{" "}
                  <Link href="/settings/billing" color="blue.500">
                    billing page
                  </Link>
                  .
                </Text>
              </Card>
              <Card>
                <Text color="faded">
                  Credits have an expiry of 90 days from the claim date.
                </Text>
              </Card>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter as={Flex} gap={3}>
          <Button
            colorScheme="primary"
            onClick={() => {
              claimCredits(
                { creditId: "optimismCredits" },
                {
                  onSuccess: () => {
                    onSuccess();
                    onClose();
                  },
                  onError: (error) => {
                    onError(error);
                    onClose();
                  },
                },
              );
            }}
            w="full"
          >
            Claim Credits
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
