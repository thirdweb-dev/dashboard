import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { useApiKeys, useCreateApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import { useUser } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { ApiKeyTable } from "components/settings/ApiKeyTable";
import { PageId } from "page-id";
import { FiPlus } from "react-icons/fi";
import { Button, Heading } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const DashboardApiKeys: ThirdwebNextPage = () => {
  const { user } = useUser();
  const keysQuery = useApiKeys();
  const createKeyMutation = useCreateApiKey();

  return (
    <Flex flexDir="column" gap={8} mt={{ base: 2, md: 6 }}>
      <Flex
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Flex flexDir="column" gap={2}>
          <Heading size="title.lg" as="h1">
            API Keys
          </Heading>
        </Flex>
        {user?.address ? (
          <Button
            onClick={() => createKeyMutation.mutate()}
            colorScheme="blue"
            leftIcon={<Icon as={FiPlus} boxSize={4} />}
            isLoading={createKeyMutation.isLoading}
            isDisabled={createKeyMutation.isLoading}
          >
            Create new key
          </Button>
        ) : (
          <ConnectWallet
            ml={{ base: 0, md: 2 }}
            colorScheme="blue"
            ecosystem="evm"
            requireLogin={true}
          />
        )}
      </Flex>

      <ApiKeyTable
        isLoading={keysQuery.isLoading}
        keys={keysQuery.data || []}
      />
    </Flex>
  );
};

DashboardApiKeys.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);

DashboardApiKeys.pageId = PageId.DashboardApiKeys;

export default DashboardApiKeys;
