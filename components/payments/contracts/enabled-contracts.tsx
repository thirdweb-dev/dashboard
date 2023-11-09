import { Center, Flex, LinkBox, LinkOverlay, Stack } from "@chakra-ui/react";
import { Card, Text, Heading } from "tw-components";
import {
  PaperChainToChainId,
  usePaymentsEnabledContracts,
} from "@3rdweb-sdk/react/hooks/usePayments";
import { AddressCopyButton } from "tw-components/AddressCopyButton";

export const EnabledContracts = () => {
  const { data: paymentEnabledContracts } = usePaymentsEnabledContracts();

  return (
    <Flex flexDir="column" gap={4}>
      {paymentEnabledContracts?.length === 0 ? (
        <Card p={8} bgColor="backgroundCardHighlight" my={6}>
          <Center as={Stack} spacing={2}>
            <Heading size="title.sm">No payment-enabled contracts</Heading>
            <Text>
              Please go to the &quot;All Contracts&quot; tab and enable payments
              in a contract to begin
            </Text>
          </Center>
        </Card>
      ) : (
        paymentEnabledContracts?.map((c) => (
          <LinkBox key={c.id}>
            <Card
              p={6}
              as={Flex}
              flexDir="column"
              gap={4}
              transition="border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease"
              _hover={{
                borderColor: "blue.500",
                boxShadow: "0 0 16px hsl(215deg 100% 60% / 30%)",
              }}
            >
              <Flex flexDir="column">
                <Text color="bgBlack">
                  <LinkOverlay
                    href={`/${PaperChainToChainId[c.chain]}/${
                      c.address
                    }/payments`}
                  >
                    {c.display_name}
                  </LinkOverlay>
                </Text>
                <Text>{c.chain}</Text>
              </Flex>
              <Flex gap={6}>
                <Flex flexDir="column" gap={1}>
                  <Text>Contract ID</Text>
                  <AddressCopyButton
                    address={c.id}
                    size="xs"
                    title="contract ID"
                  />
                </Flex>
                <Flex flexDir="column" gap={1}>
                  <Text>Contract Address</Text>
                  <AddressCopyButton address={c.address} size="xs" />
                </Flex>
              </Flex>
            </Card>
          </LinkBox>
        ))
      )}
    </Flex>
  );
};
