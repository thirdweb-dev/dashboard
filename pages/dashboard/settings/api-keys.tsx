import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { useApiKeys } from "@3rdweb-sdk/react/hooks/useApi";
import { Container, Divider, Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { ApiKeyTable } from "components/settings/ApiKeyTable";
import { CreateApiKeyButton } from "components/settings/ApiKeyTable/CreateButton";
import { SettingsSidebar } from "core-ui/sidebar/settings";
import { PageId } from "page-id";
import { Card, Heading, Link, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const CliLoginPage: ThirdwebNextPage = () => {
  const address = useAddress();
  const keysQuery = useApiKeys();

  if (!address) {
    return (
      <Container maxW="lg">
        <Card p={6} as={Flex} flexDir="column" gap={2}>
          <Heading as="h2" size="title.sm">
            Connect your wallet to get started
          </Heading>
          <Text>
            In order to create and manage your developer API keys, you need to
            sign-in with a wallet.
          </Text>
          <Divider my={4} />
          <ConnectWallet ecosystem="evm" />
        </Card>
      </Container>
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
          An API key is required to use thirdweb&apos;s services through the SDK
          and CLI. {` `}
          <Link
            target="_blank"
            color="blue.500"
            href="https://portal.thirdweb.com/api-keys"
            isExternal
          >
            Learn more
          </Link>
        </Text>
      </Flex>

      <ApiKeyTable
        keys={keysQuery.data || []}
        isLoading={keysQuery.isLoading}
        isFetched={keysQuery.isFetched}
      />
    </Flex>
  );
};

CliLoginPage.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <SettingsSidebar activePage="apiKeys" />

    {page}
  </AppLayout>
);

CliLoginPage.pageId = PageId.SettingsApiKeys;

export default CliLoginPage;
