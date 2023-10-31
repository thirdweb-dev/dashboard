import { useAllContractList } from "@3rdweb-sdk/react";
import { Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { PaymentContractsTable } from "./payment-contracts-table";
import { Heading, Text } from "tw-components";
import { validPaymentsChainIds } from "@3rdweb-sdk/react/hooks/usePayments";
import { EnablePaymentsButton } from "../enable-payments-button";

export const PaymentContracts = () => {
  const address = useAddress();
  const deployedContracts = useAllContractList(address);

  const filteredContracts =
    deployedContracts?.data?.filter((contract) =>
      validPaymentsChainIds.includes(contract.chainId),
    ) || [];

  return (
    <Flex flexDir="column" gap={3}>
      <Heading size="title.md">Contracts</Heading>
      <Text>Select a contract to enable payments & checkout links for</Text>
      <PaymentContractsTable
        paymentContracts={filteredContracts}
        isLoading={deployedContracts.isLoading}
        isFetched={deployedContracts.isFetched}
      />
    </Flex>
  );
};
