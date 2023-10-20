import {
  useEngineBackendWallets,
  useEngineTransactions,
} from "@3rdweb-sdk/react/hooks/useEngine";
import { Flex } from "@chakra-ui/react";
import { BackendWalletsTable } from "./backend-wallets-table";
import { TransactionsTable } from "./transactions-table";
import { Heading } from "tw-components";
import { CreateBackendWalletButton } from "./create-backend-wallet-button";
import { ImportBackendWalletButton } from "./import-backend-wallet-button";

interface EngineAnalyticsProps {
  instance: string;
}

export const EngineAnalytics: React.FC<EngineAnalyticsProps> = ({
  instance,
}) => {
  const backendWallets = useEngineBackendWallets(instance);
  const transactions = useEngineTransactions(instance);

  console.log({ backendWallets, transactions });

  return (
    <Flex flexDir="column" gap={12}>
      <Flex flexDir="column" gap={4}>
        <Flex justify="space-between" alignItems="center">
          <Heading size="title.sm">Backend Wallets</Heading>
          <Flex gap={2}>
            <ImportBackendWalletButton instance={instance} />
            <CreateBackendWalletButton instance={instance} />
          </Flex>
        </Flex>
        <BackendWalletsTable
          wallets={backendWallets.data ?? []}
          isLoading={backendWallets.isLoading}
          isFetched={backendWallets.isFetched}
        />
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Heading size="title.sm">Transactions</Heading>
        <TransactionsTable
          transactions={transactions.data ?? []}
          isLoading={transactions.isLoading}
          isFetched={transactions.isFetched}
        />
      </Flex>
    </Flex>
  );
};
