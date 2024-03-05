import { AccountPlan, useAccount, useAccountCredits } from "@3rdweb-sdk/react/hooks/useApi";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, Flex, Tag, Icon, VStack, ModalFooter, Box } from "@chakra-ui/react";
import { format, formatDistance } from "date-fns";
import { useRouter } from "next/router";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Button, Card, Heading, Link, Text } from "tw-components";

const formatToDollars = (cents: number) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(cents);
};

export const CreditsButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn } = useLoggedInUser();
  const { data: credits } = useAccountCredits();
  const meQuery = useAccount();
  const router = useRouter();

  const totalCreditBalance = credits?.reduce(
    (acc, credit) => acc + credit.remainingValueUsdCents,
    0,
  );

  if (
    !isLoggedIn ||
    meQuery.isLoading ||
    !meQuery.data
  ) {
    return null;
  }

  return (
    <>
      <Button onClick={onOpen} variant="outline"
        colorScheme="blue"
        size="sm">
        Credits: {formatToDollars(totalCreditBalance || 0)}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            Credits Balance
          </ModalHeader>
          <ModalBody>
            <Flex flexDir="column" gap={4}>
              {credits?.map((credit) => (
                <Card key={credit.name} p={6} as={Flex} flexDir="column" gap={2}>
                  <Text color="bgBlack" fontWeight="bold">{credit.name}</Text>
                  <Text>
                    Current credit balance:{" "}
                    <Text as="span" fontWeight="bold">
                      {formatToDollars(credit.remainingValueUsdCents)}{" "}
                    </Text>
                    <Text as="span">(Expires {formatDistance(new Date(credit.expiryDate), Date.now(), {
                      addSuffix: true,
                    })})</Text>
                  </Text>
                </Card>
              ))}
            </Flex>
            <Text pt={4}>
              <Link href="/settings/billing" color="blue.500">Learn more</Link> about how you can get more credits.
            </Text>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
