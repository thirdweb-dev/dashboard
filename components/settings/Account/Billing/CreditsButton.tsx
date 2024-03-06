import { useAccount, useAccountCredits } from "@3rdweb-sdk/react/hooks/useApi";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Flex,
  ModalFooter,
} from "@chakra-ui/react";
import { ChainIcon } from "components/icons/ChainIcon";
import { formatDistance } from "date-fns";
import { Button, Card, Link, Text } from "tw-components";
import { Optimism } from "@thirdweb-dev/chains";

const formatToDollars = (cents: number) => {
  const dollars = cents / 100;
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(dollars);
};

export const CreditsButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn } = useLoggedInUser();
  const { data: credits } = useAccountCredits();
  const meQuery = useAccount();

  console.log({ credits });

  const totalCreditBalance = credits?.reduce(
    (acc, credit) => acc + credit.remainingValueUsdCents,
    0,
  );

  if (!isLoggedIn || meQuery.isLoading || !meQuery.data) {
    return null;
  }

  return (
    <>
      <Button onClick={onOpen} variant="outline" colorScheme="blue" size="sm">
        Credits: {formatToDollars(totalCreditBalance || 0)}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Credits Balance</ModalHeader>
          <ModalBody>
            <Flex flexDir="column" gap={4}>
              {credits && credits?.length > 0 ? (
                credits.map((credit) => (
                  <Card
                    key={credit.name}
                    p={6}
                    as={Flex}
                    flexDir="column"
                    gap={2}
                  >
                    <Flex gap={2}>
                      {credit.name.includes("OP ") && (
                        <ChainIcon ipfsSrc={Optimism.icon.url} size={24} />
                      )}
                      <Text color="bgBlack" fontWeight="bold">
                        {credit.name}
                      </Text>
                    </Flex>
                    <Text>
                      Current credit balance:{" "}
                      <Text as="span" fontWeight="bold">
                        {formatToDollars(credit.remainingValueUsdCents)}{" "}
                      </Text>
                      <Text as="span">
                        (Expires{" "}
                        {formatDistance(
                          new Date(credit.expiresAt),
                          Date.now(),
                          {
                            addSuffix: true,
                          },
                        )}
                        )
                      </Text>
                    </Text>
                  </Card>
                ))
              ) : (
                <Text fontStyle="italic">No credits found</Text>
              )}
            </Flex>
            <Text pt={4}>
              <Link
                href="/dashboard/settings/billing"
                color="blue.500"
                onClick={onClose}
              >
                Get more credits
              </Link>
              .
            </Text>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
