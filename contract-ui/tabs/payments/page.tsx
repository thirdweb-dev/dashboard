import { useDashboardEVMChainId } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { usePaymentsContractByAddressAndChain } from "@3rdweb-sdk/react/hooks/usePayments";
import { Center, Flex, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { PaymentsAnalytics } from "./components/payments-analytics";
import { PaymentCheckouts } from "./components/payments-checkouts";
import { Card, Heading, Text } from "tw-components";
import { EnablePaymentsButton } from "components/payments/enable-payments-button";

interface ContractPaymentsPageProps {
  contractAddress?: string;
}

export const ContractPaymentsPage: React.FC<ContractPaymentsPageProps> = ({
  contractAddress,
}) => {
  const chainId = useDashboardEVMChainId();
  const { data: paymentContract } = usePaymentsContractByAddressAndChain(
    contractAddress,
    chainId,
  );
  useEffect(() => {
    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!contractAddress) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap={6}>
      {paymentContract?.id ? (
        <>
          <PaymentCheckouts
            contractId={paymentContract?.id}
            contractAddress={contractAddress}
          />
          <PaymentsAnalytics contractId={paymentContract?.id} />
        </>
      ) : (
        <Card p={8} bgColor="backgroundCardHighlight" my={6}>
          <Center as={Stack} spacing={4}>
            <Stack spacing={2}>
              <Heading size="title.sm" textAlign="center">
                No payments enabled
              </Heading>
              <Text>
                You need to enable payments first to be able to create a
                checkout
              </Text>
            </Stack>
            {chainId && (
              <EnablePaymentsButton
                contractAddress={contractAddress}
                chainId={chainId}
              />
            )}
          </Center>
        </Card>
      )}
    </Flex>
  );
};
