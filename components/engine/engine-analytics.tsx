import {
  useEngineBackendWallets,
  useEngineTransactions,
} from "@3rdweb-sdk/react/hooks/useEngine";
import { Flex } from "@chakra-ui/react";
import { BackendWalletsTable } from "./backend-wallets-table";

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
    <Flex flexDir="column">
      <BackendWalletsTable
        wallets={backendWallets.data ?? []}
        isLoading={backendWallets.isLoading}
        isFetched={backendWallets.isFetched}
      />
    </Flex>
  );
};
