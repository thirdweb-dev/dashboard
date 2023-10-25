import {
  useEngineBackendWallets,
  useEngineTransactions,
  useEngineWalletConfig,
} from "@3rdweb-sdk/react/hooks/useEngine";
import { Flex, Tooltip } from "@chakra-ui/react";
import { BackendWalletsTable } from "./backend-wallets-table";
import { TransactionsTable } from "./transactions-table";
import { Badge, Card, Heading, Text } from "tw-components";
import { CreateBackendWalletButton } from "./create-backend-wallet-button";
import { ImportBackendWalletButton } from "./import-backend-wallet-button";
import { NetworkDropdown } from "components/contract-components/contract-publish-form/NetworkDropdown";
import { useChainId } from "@thirdweb-dev/react";
import { useState } from "react";

interface EngineOverviewProps {
  instance: string;
}

export const EngineOverview: React.FC<EngineOverviewProps> = ({ instance }) => {
  const backendWallets = useEngineBackendWallets(instance);
  const { data: walletConfig } = useEngineWalletConfig(instance);
  const transactionsQuery = useEngineTransactions(instance);
  const chainId = useChainId();
  const [selectedChainId, setSelectedChainId] = useState(chainId || 1);

  return (
    <Flex flexDir="column" gap={12}>
      <Flex flexDir="column" gap={4}>
        <Flex flexDir="column" gap={4} justifyItems="flex-end">
          <Flex justify="space-between" alignItems="center">
            <Flex gap={4}>
              <Heading size="title.sm">Backend Wallets</Heading>
              {walletConfig?.type && (
                <Tooltip
                  placement="auto-end"
                  borderRadius="md"
                  bg="transparent"
                  boxShadow="none"
                  p={4}
                  minW={{ md: "450px" }}
                  label={
                    <Card bgColor="backgroundHighlight">
                      <Text>
                        This is the wallet type that&apos;s used to create and
                        import backend wallets by default. You can change this
                        in the Configuration tab.
                      </Text>
                    </Card>
                  }
                >
                  <Badge
                    borderRadius="full"
                    size="label.sm"
                    variant="outline"
                    px={3}
                    py={1.5}
                    colorScheme="green"
                  >
                    {walletConfig.type.replace("-", " ")}
                  </Badge>
                </Tooltip>
              )}
            </Flex>

            <Flex gap={2}>
              <ImportBackendWalletButton instance={instance} />
              <CreateBackendWalletButton instance={instance} />
            </Flex>
          </Flex>
          <Flex flexDirection="row-reverse">
            <Flex alignItems="center" gap={2}>
              <Text>Showing Balance for: </Text>
              <Flex>
                <NetworkDropdown
                  value={selectedChainId}
                  onSingleChange={(val) => setSelectedChainId(val)}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <BackendWalletsTable
          chainId={selectedChainId}
          instance={instance}
          wallets={backendWallets.data ?? []}
          isLoading={backendWallets.isLoading}
          isFetched={backendWallets.isFetched}
        />
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Heading size="title.sm">Transactions (24hrs)</Heading>
        <TransactionsTable
          transactions={transactionsQuery.data?.transactions ?? []}
          isLoading={transactionsQuery.isLoading}
          isFetched={transactionsQuery.isFetched}
        />
      </Flex>
    </Flex>
  );
};
