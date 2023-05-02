import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { useApiKeys } from "@3rdweb-sdk/react/hooks/useApi";
import { Center, Container, Divider, Flex, Spinner } from "@chakra-ui/react";
import { useAddress, useLogout, useUser } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { StepsCard } from "components/dashboard/StepsCard";
import { ApiKeyTable } from "components/settings/ApiKeyTable";
import { CreateApiKeyButton } from "components/settings/CreateApiKeyButton";
import { PageId } from "page-id";
import { useEffect, useMemo } from "react";
import { Card, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const DashboardApiKeys: ThirdwebNextPage = () => {
  const address = useAddress();
  const { user } = useUser();
  const { logout } = useLogout();
  const keysQuery = useApiKeys();

  useEffect(() => {
    if (address !== user?.address) {
      logout();
    }
  }, [address, user?.address, logout]);

  console.log(user?.address);

  const steps = useMemo(
    () => [
      {
        title: "Connect and sign-in with your wallet to get started",
        description:
          "In order to create and manage your developer API keys, you need to sign-in with a wallet.",
        children: <ConnectWallet ecosystem="evm" requireLogin={true} />,
        completed: !!user?.address,
      },
      {
        title: "Create your first API key",
        description:
          "Your API key can be used to access thirdweb infrastructure services like smart wallets, storage, analytics, and more.",
        children: <CreateApiKeyButton />,
        completed: (keysQuery.data?.length || 0) > 0,
      },
    ],
    [user?.address, keysQuery.data?.length],
  );

  if (!user?.address || (keysQuery.isFetched && keysQuery.data?.length === 0)) {
    return (
      <StepsCard
        title="Get started with thirdweb developer API keys"
        description="Create a new API key to get started with thirdweb infrastructure services"
        steps={steps}
      />
    );
  }

  return (
    <Flex flexDir="column" gap={8} mt={{ base: 2, md: 6 }}>
      <Flex direction="column" gap={2}>
        <Flex
          justifyContent="space-between"
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading size="title.lg" as="h1">
            API Keys
          </Heading>
          <CreateApiKeyButton />
        </Flex>
        <Text>
          These API keys are used to work with thirdweb infrastructure services
          like smart wallet, storage, analytics, and more.
        </Text>
      </Flex>

      {!user ? (
        <Center>
          <Container maxW="lg">
            <Card p={6} as={Flex} flexDir="column" gap={2}>
              <Heading as="h2" size="title.sm">
                Sign in to get started
              </Heading>
              <Text>
                In order to interact with your contracts you need to connect a
                Solana compatible wallet.
              </Text>
              <Divider my={4} />
              <ConnectWallet
                ml={{ base: 0, md: 2 }}
                colorScheme="blue"
                ecosystem="evm"
                requireLogin={true}
              />
            </Card>
          </Container>
        </Center>
      ) : (
        <ApiKeyTable
          isLoading={keysQuery.isLoading}
          keys={keysQuery.data || []}
        >
          {keysQuery.isLoading && (
            <Center>
              <Flex py={4} direction="row" gap={4} align="center">
                <Spinner size="sm" />
                <Text>Loading API Keys</Text>
              </Flex>
            </Center>
          )}
          {keysQuery.data?.length === 0 && keysQuery.isFetched && (
            <Center>
              <Flex py={4} direction="column" gap={4} align="center">
                <Text>No API keys found. Create one to get started!</Text>
              </Flex>
            </Center>
          )}
        </ApiKeyTable>
      )}
    </Flex>
  );
};

DashboardApiKeys.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);

DashboardApiKeys.pageId = PageId.DashboardApiKeys;

export default DashboardApiKeys;
