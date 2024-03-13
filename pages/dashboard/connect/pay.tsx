import { ApiKey, useApiKeys } from "@3rdweb-sdk/react/hooks/useApi";
import { Flex, HStack } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ConnectSidebar } from "core-ui/sidebar/connect";
import { PageId } from "page-id";
import { useEffect, useState } from "react";
import { Heading, Text } from "tw-components";

import { ApiKeysMenu } from "components/settings/ApiKeys/Menu";
import { NoApiKeys } from "components/settings/ApiKeys/NoApiKeys";
import { ThirdwebNextPage } from "utils/types";

import { apiKeys } from "@3rdweb-sdk/react";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { useQueryClient } from "@tanstack/react-query";
import { PayConfig } from "components/pay/PayConfig";
import { ConnectWalletPrompt } from "components/settings/ConnectWalletPrompt";
import { useRouter } from "next/router";

// const TRACKING_CATEGORY = "pay";

const DashboardConnectPay: ThirdwebNextPage = () => {
  const router = useRouter();
  const defaultClientId = router.query.clientId?.toString();
  const { isLoggedIn } = useLoggedInUser();
  const { user } = useLoggedInUser();
  const queryClient = useQueryClient();

  const keysQuery = useApiKeys();

  const [selectedKey, setSelectedKey] = useState<undefined | ApiKey>();

  const apiKeysData = (keysQuery?.data ?? []).filter((key) => {
    return !!(key.services ?? []).find((srv) => srv.name === "pay");
  });
  const hasApiKeys = apiKeysData.length > 0;

  useEffect(() => {
    // query rehydrates from cache leading to stale results if user refreshes shortly after updating their dashboard.
    // Invalidate the query to force a refetch
    if (user?.address) {
      queryClient.invalidateQueries(apiKeys.keys(user?.address));
    }
  }, [queryClient, user?.address]);

  useEffect(() => {
    if (defaultClientId) {
      const key = apiKeysData.find((k) => k.key === defaultClientId);
      if (key) {
        setSelectedKey(key);
        return;
      }
    }
    setSelectedKey(
      selectedKey
        ? apiKeysData.find((apiKey) => apiKey.id === selectedKey.id)
        : apiKeysData[0],
    );
  }, [selectedKey, defaultClientId, apiKeysData]);

  if (!isLoggedIn) {
    return (
      <ConnectWalletPrompt description="manage Pay in Connect configuration" />
    );
  }

  return (
    <Flex flexDir="column" gap={8}>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        alignItems={{ base: "start", lg: "end" }}
        w="full"
        gap={4}
        justifyContent={"space-between"}
      >
        <Flex flexDir={"column"} gap={2}>
          <Heading size="title.lg" as="h1">
            Payments
          </Heading>
          <Text maxW="xl">Configure your developer settings for payments </Text>
        </Flex>

        {hasApiKeys && (
          <HStack gap={3}>
            {selectedKey && (
              <ApiKeysMenu
                apiKeys={apiKeysData}
                selectedKey={selectedKey}
                onSelect={setSelectedKey}
              />
            )}
          </HStack>
        )}
      </Flex>

      {!hasApiKeys && (
        <NoApiKeys
          service="Pay in Connect"
          buttonTextOverride={keysQuery.data?.length ? "Enable Pay" : undefined}
          copyOverride={
            keysQuery.data?.length
              ? "You'll need to enable pay as a service in an API Key to use Pay."
              : undefined
          }
        />
      )}

      {hasApiKeys && selectedKey && <PayConfig apiKey={selectedKey} />}
    </Flex>
  );
};

DashboardConnectPay.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <ConnectSidebar activePage="pay-settings" />
    {page}
  </AppLayout>
);

DashboardConnectPay.pageId = PageId.DashboardConnectPay;

export default DashboardConnectPay;
