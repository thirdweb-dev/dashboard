import { useEngineBackendWallets } from "@3rdweb-sdk/react/hooks/useEngine";
import { Flex } from "@chakra-ui/react";
import { Heading, Link, Text } from "tw-components";
import { NetworkSelectorButton } from "components/selects/NetworkSelectorButton";
import { CompanyWalletsTable } from "./company-wallets-table";

interface CompanySettingsOverviewProps {
  instance: string;
}

export const CompanySettingsOverview: React.FC<
  CompanySettingsOverviewProps
> = ({ instance }) => {
  const backendWallets = useEngineBackendWallets(instance);

  return (
    <Flex flexDir="column" gap={12}>
      <Flex flexDir="column" gap={4}>
        <Flex flexDir="column" gap={4} justifyItems="flex-end">
          <Flex justify="space-between" alignItems="center">
            <Flex flexDir="column" gap={2}>
              <Flex gap={3}>
                <Heading size="title.sm">Company Wallets</Heading>
              </Flex>
              <Text>
                This is a list of all company wallets.{" "}
                <Link
                  href="https://portal.thirdweb.com/infrastructure/engine/features/backend-wallets"
                  color="primary.500"
                  isExternal
                >
                  Learn more
                </Link>
                .
              </Text>
            </Flex>
          </Flex>

          <Flex flexDirection="row-reverse">
            <Flex alignItems="center" gap={2}>
              <Text>Show balance for</Text>
              <Flex>
                <NetworkSelectorButton />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <CompanyWalletsTable
          instanceUrl={instance}
          wallets={backendWallets.data ?? []}
          isLoading={backendWallets.isLoading}
          isFetched={backendWallets.isFetched}
        />
      </Flex>
    </Flex>
  );
};
