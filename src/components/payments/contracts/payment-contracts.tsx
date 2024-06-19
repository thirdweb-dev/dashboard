import { useAllContractList } from "@3rdweb-sdk/react/hooks/useRegistry";
import { Flex } from "@chakra-ui/react";
import { PaymentContractsTable } from "./payment-contracts-table";
import { useApiAuthToken } from "@3rdweb-sdk/react/hooks/useApi";
import { NoWalletConnectedPayments } from "contract-ui/tabs/payments/components/no-wallet-connected-payments";
import { validPaymentsChainIds } from "@3rdweb-sdk/react/hooks/usePayments";
import { useMemo } from "react";
import { useActiveAccount } from "thirdweb/react";

export const PaymentContracts = () => {
  const address = useActiveAccount()?.address;
  const deployedContracts = useAllContractList(address);
  const { paymentsSellerId } = useApiAuthToken();

  const filteredByChain = useMemo(() => {
    if (!deployedContracts?.data) {
      return [];
    }

    return deployedContracts.data.filter((contract) =>
      validPaymentsChainIds.includes(contract.chainId),
    );
  }, [deployedContracts?.data]);

  return (
    <Flex flexDir="column" gap={3}>
      {paymentsSellerId ? (
        <PaymentContractsTable
          paymentContracts={filteredByChain || []}
          paymentsSellerId={paymentsSellerId}
          isLoading={deployedContracts.isLoading}
          isFetched={deployedContracts.isFetched}
        />
      ) : (
        <NoWalletConnectedPayments />
      )}
    </Flex>
  );
};
