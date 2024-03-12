import { ApiKey, useApiKeys } from "@3rdweb-sdk/react/hooks/useApi";
import { Flex, HStack } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ConnectSidebar } from "core-ui/sidebar/connect";
import { PageId } from "page-id";
import { useEffect, useMemo, useState } from "react";
import { Heading, Text } from "tw-components";

import { ApiKeysMenu } from "components/settings/ApiKeys/Menu";
import { NoApiKeys } from "components/settings/ApiKeys/NoApiKeys";
import { ThirdwebNextPage } from "utils/types";

import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { PayConfig } from "components/pay/PayConfig";
import { ConnectWalletPrompt } from "components/settings/ConnectWalletPrompt";
import { useRouter } from "next/router";

// const TRACKING_CATEGORY = "pay";

const DashboardConnectPay: ThirdwebNextPage = () => {
  const router = useRouter();
  const defaultClientId = router.query.clientId?.toString();
  const { isLoggedIn } = useLoggedInUser();
  const keysQuery = useApiKeys();

  const [selectedKey, setSelectedKey] = useState<undefined | ApiKey>();

  const apiKeys = useMemo(() => {
    return (keysQuery?.data || []).filter((key) => {
      return !!(key.services || []).find((srv) => srv.name === "pay");
    });
  }, [keysQuery]);

  const hasApiKeys = apiKeys.length > 0;

  useEffect(() => {
    if (selectedKey) {
      return;
    }
    if (apiKeys.length > 0) {
      if (defaultClientId) {
        const key = apiKeys.find((k) => k.key === defaultClientId);
        if (key) {
          setSelectedKey(key);
        } else {
          setSelectedKey(apiKeys[0]);
        }
      } else {
        setSelectedKey(apiKeys[0]);
      }
    } else {
      setSelectedKey(undefined);
    }
  }, [apiKeys, selectedKey, defaultClientId]);

  if (!isLoggedIn) {
    return (
      <ConnectWalletPrompt description="manage Pay in Connect configuration" />
    );
  }

  return (
    <Flex flexDir="column" gap={8}>
      <Flex flexDir="column" gap={2}>
        <Flex
          justifyContent="space-between"
          direction={{ base: "column", lg: "row" }}
          gap={4}
        >
          <Heading size="title.lg" as="h1">
            Pay
          </Heading>
          {hasApiKeys && (
            <HStack gap={3}>
              {selectedKey && (
                <ApiKeysMenu
                  apiKeys={apiKeys}
                  selectedKey={selectedKey}
                  onSelect={setSelectedKey}
                />
              )}
            </HStack>
          )}
        </Flex>

        <Text maxW="xl">
          Configure your developer settings for Pay in Connect.
        </Text>
      </Flex>

      {!hasApiKeys && <NoApiKeys service="Pay in Connect" />}

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
