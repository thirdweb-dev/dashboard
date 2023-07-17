import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { useApiKeys, useCreateApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { Container, Divider, Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { ApiKeyTable } from "components/settings/ApiKeyTable";
import { CreateApiKeyButton } from "components/settings/ApiKeyTable/CreateButton";
import { SettingsSidebar } from "core-ui/sidebar/settings";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { useEffect, useMemo, useRef } from "react";
import { Card, Heading, Link, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const SettingsApiKeysPage: ThirdwebNextPage = () => {
  const { redirect, from } = useRouter().query;
  const address = useAddress();
  const keysQuery = useApiKeys();
  const createKeyMutation = useCreateApiKey();
  const trackEvent = useTrack();
  const { onSuccess, onError } = useTxNotifications(
    "API key created",
    "Failed to create API key",
  );
  const hasCreatedKey = useRef<boolean>(false);
  const allKeys = useMemo(() => {
    if (!keysQuery?.data) {
      return [];
    }
    return keysQuery.data;
  }, [keysQuery?.data]);

  useEffect(() => {
    if (
      !window ||
      !allKeys ||
      keysQuery.isFetching ||
      keysQuery.isLoading ||
      hasCreatedKey.current
    ) {
      return;
    }
    const cliKeyAlreadyExists =
      allKeys.filter((k) => k.name === "CLI Auth Key").length > 0;

    if (address && redirect && from === "cli" && !cliKeyAlreadyExists) {
      hasCreatedKey.current = true;
      const formattedValues = {
        name: "CLI Auth Key",
        domains: ["*"],
        // FIXME: Enable when wallets restrictions is in use
        // walletAddresses: toArrFromList(values.walletAddresses),
        services: [
          {
            name: "storage",
            targetAddresses: ["*"],
            enabled: true,
            actions: ["read", "write"],
          },
        ],
      };
      createKeyMutation.mutate(formattedValues, {
        onSuccess: async (data) => {
          onSuccess();
          trackEvent({
            category: "api-keys",
            action: "create",
            label: "success",
            fromCli: true,
          });
          try {
            await fetch(`/api/cli-redirect?redirectUrl=${redirect}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-secret-key": `${data.secret}`,
              },
            });
          } catch (err) {
            console.log("error", err);
          }
        },
        onError: (err) => {
          onError(err);
          trackEvent({
            category: "api-keys",
            action: "create",
            label: "error",
            error: err,
            fromCli: true,
          });
        },
      });
    }
  }, [
    address,
    allKeys,
    createKeyMutation,
    keysQuery.isFetching,
    keysQuery.isLoading,
    from,
    onError,
    onSuccess,
    redirect,
    trackEvent,
  ]);

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
          An API key is required to use thirdweb&apos;s infrastructure services
          such as{" "}
          <Link
            href="https://portal.thirdweb.com/wallet/smart-wallet"
            color="blue.500"
            isExternal
          >
            Smart Wallet
          </Link>
          ,{" "}
          <Link
            href="https://portal.thirdweb.com/storage"
            color="blue.500"
            isExternal
          >
            Storage
          </Link>{" "}
          and RPCs.
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

SettingsApiKeysPage.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <SettingsSidebar activePage="apiKeys" />

    {page}
  </AppLayout>
);

SettingsApiKeysPage.pageId = PageId.SettingsApiKeys;

export default SettingsApiKeysPage;
