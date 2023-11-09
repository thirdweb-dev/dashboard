import { Center, Flex, Stack } from "@chakra-ui/react";
import { Card, Text, Heading } from "tw-components";
import { usePaymentsEnabledContracts } from "@3rdweb-sdk/react/hooks/usePayments";
import { PaymentEnabledCard } from "./payment-enabled-card";

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
        paymentEnabledContracts?.map((contract) => (
          <PaymentEnabledCard key={contract.id} contract={contract} />
        ))
      )}
    </Flex>
  );
};
