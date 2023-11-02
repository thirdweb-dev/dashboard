import { usePaymentsCheckoutsByContract } from "@3rdweb-sdk/react/hooks/usePayments";
import { Flex } from "@chakra-ui/react";
import { CreateCheckoutButton } from "./create-checkout-button";
import { Card, Text } from "tw-components";
import { THIRDWEB_PAYMENTS_API_HOST } from "constants/urls";

interface PaymentCheckoutsProps {
  contractId: string;
  contractAddress: string;
}

export const PaymentCheckouts: React.FC<PaymentCheckoutsProps> = ({
  contractId,
  contractAddress,
}) => {
  const { data: checkouts } = usePaymentsCheckoutsByContract(contractAddress);

  console.log({ checkouts });
  return (
    <Flex flexDir="column" gap={12}>
      {(checkouts || [])?.map((checkout) => (
        <Card key={checkout.id} as={Flex} flexDir="column" gap={4}>
          {checkout.collection_title}
          <Text>{`${THIRDWEB_PAYMENTS_API_HOST}/checkout/${checkout.id}`}</Text>
        </Card>
      ))}
      <CreateCheckoutButton
        contractAddress={contractAddress}
        contractId={contractId}
      />
    </Flex>
  );
};
