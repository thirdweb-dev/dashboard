import {
  usePaymentsCheckoutsByContract,
  usePaymentsTransactionsForContract,
} from "@3rdweb-sdk/react/hooks/usePayments";
import { Flex } from "@chakra-ui/react";
import { PaymentsTransactionsTable } from "./payments-transactions-table";
import { Transaction } from "graphql/generated_types";
import { Heading } from "tw-components";

interface PaymentsTransactionsProps {
  contractId: string;
  contractAddress: string;
}

export const PaymentsTransactions: React.FC<PaymentsTransactionsProps> = ({
  contractId,
  contractAddress,
}) => {
  const { data: checkouts } = usePaymentsCheckoutsByContract(contractAddress);
  const {
    data: transactions,
    isLoading,
    isFetched,
  } = usePaymentsTransactionsForContract(
    contractId,
    (checkouts || []).map((checkout) => checkout.id),
  );

  return (
    <Flex flexDir="column" gap={6}>
      <Heading size="title.md">Transactions</Heading>
      <PaymentsTransactionsTable
        transactions={transactions as Transaction[]}
        isLoading={isLoading}
        isFetched={isFetched}
      />
    </Flex>
  );
};
