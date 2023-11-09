import { useDashboardEVMChainId } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { usePaymentsContractByAddressAndChain } from "@3rdweb-sdk/react/hooks/usePayments";
import { Center, Flex, Spinner, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { PaymentsAnalytics } from "./components/payments-analytics";
import { PaymentCheckouts } from "./components/payments-checkouts";
import { Card, Heading, Text } from "tw-components";
import { EnablePaymentsButton } from "components/payments/enable-payments-button";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { NoWalletConnectedPayments } from "./components/no-wallet-connected-payments";

interface ContractPaymentsPageProps {
  contractAddress?: string;
}

export const ContractPaymentsPage: React.FC<ContractPaymentsPageProps> = ({
  contractAddress,
}) => {
  const chainId = useDashboardEVMChainId();
  const { user } = useLoggedInUser();

  const {
    data: paymentContract,
    isLoading,
    isError,
  } = usePaymentsContractByAddressAndChain(contractAddress, chainId);

  useEffect(() => {
    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!contractAddress) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  if (!user?.address) {
    return <NoWalletConnectedPayments />;
  }

  return (
    <Flex direction="column" gap={6}>
      {isLoading ? (
        <Center pb={16}>
          <Spinner size="sm" />
        </Center>
      ) : paymentContract?.id ? (
        <>
          <PaymentCheckouts
            contractId={paymentContract?.id}
            contractAddress={contractAddress}
          />
          <PaymentsAnalytics contractId={paymentContract?.id} />
        </>
      ) : isError ? (
        <Card p={8} bgColor="backgroundCardHighlight" my={6}>
          <Center as={Stack} spacing={2}>
            <Heading size="title.sm">Error loading contract</Heading>
            <Text>
              Please try again later or contact support if the problem persists
            </Text>
          </Center>
        </Card>
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
