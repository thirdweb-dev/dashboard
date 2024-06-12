import { ApiKey, useApiKeys } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Box,
  BoxProps,
  Flex,
  FormControl,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  UseRadioProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ConnectSidebar } from "core-ui/sidebar/connect";
import { PageId } from "page-id";
import { useEffect, useState } from "react";
import { Heading, Text, TrackedLink } from "tw-components";
import { ApiKeysMenu } from "components/settings/ApiKeys/Menu";
import { NoApiKeys } from "components/settings/ApiKeys/NoApiKeys";
import { ThirdwebNextPage } from "utils/types";
import { apiKeys } from "@3rdweb-sdk/react";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { usePaymentsEnabledContracts } from "@3rdweb-sdk/react/hooks/usePayments";
import { useQueryClient } from "@tanstack/react-query";
import { OldPaySetting } from "components/pay/OldPaySetting";
import { PayConfig } from "components/pay/PayConfig";
import { EnabledContracts } from "components/payments/contracts/enabled-contracts";
import { PaymentContracts } from "components/payments/contracts/payment-contracts";
import { ConnectWalletPrompt } from "components/settings/ConnectWalletPrompt";
import { useRouter } from "next/router";
import { PayAnalytics } from "../../../components/pay/PayAnalytics";

const TRACKING_CATEGORY = "pay";

function RadioCard(props: UseRadioProps & BoxProps) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        display={"flex"}
        alignItems={"center"}
        gap={2}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="lg"
        _focus={{
          boxShadow: "outline",
        }}
        _checked={{
          borderColor: "blue.500",
        }}
        fontWeight={"semibold"}
        w={40}
        px={5}
        py={3}
      >
        <Box
          {...checkbox}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          rounded="full"
          w={5}
          h={5}
          borderWidth="3px"
          _checked={{
            borderColor: "blue.500",
          }}
        >
          <Box
            {...checkbox}
            w={2.5}
            h={2.5}
            bg="transparent"
            _checked={{
              bg: "blue.500",
            }}
            rounded="full"
          />
        </Box>

        {props.children}
      </Box>
    </Box>
  );
}

const usePayConfig = () => {
  const router = useRouter();
  const defaultClientId = router.query.clientId?.toString();
  const { user } = useLoggedInUser();
  const queryClient = useQueryClient();

  const [selectedKey, setSelectedKey] = useState<undefined | ApiKey>();

  const keysQuery = useApiKeys();
  const apiKeysData = (keysQuery?.data ?? []).filter((key) => {
    return !!(key.services ?? []).find((srv) => srv.name === "pay");
  });
  const hasPayApiKeys = apiKeysData.length > 0;

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

  return {
    hasPayApiKeys,
    selectedKey,
    setSelectedKey,
    apiKeysData,
    hasApiKeys: !!keysQuery.data?.length,
  };
};

const useTabConfig = () => {
  const [tabOption, setTabOption] = useState<"pay" | "checkouts">("pay");
  const router = useRouter();

  useEffect(() => {
    if (router.query.tab === "checkouts") {
      setTabOption("checkouts");
    }
  }, [router.query.tab]);

  const { data: paymentEnabledContracts } = usePaymentsEnabledContracts();
  const radioOptions = ["pay", "checkouts"].filter((option) => {
    return (
      option === "pay" ||
      (option === "checkouts" && (paymentEnabledContracts || [])?.length > 0)
    );
  });
  return { tabOption, setTabOption, radioOptions };
};

const DashboardConnectPay: ThirdwebNextPage = () => {
  const { tabOption, setTabOption, radioOptions } = useTabConfig();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "config",
    defaultValue: "pay",
    onChange: (value: "pay" | "checkouts") => setTabOption(value),
  });

  const { isLoggedIn } = useLoggedInUser();
  const {
    hasApiKeys,
    hasPayApiKeys,
    selectedKey,
    setSelectedKey,
    apiKeysData,
  } = usePayConfig();
  // Pay setting api key configuration

  if (!isLoggedIn) {
    return <ConnectWalletPrompt description="manage your Pay configuration" />;
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
            Pay
          </Heading>
          <Text maxW="xl">
            Configure developer settings for all Pay features, including{" "}
            <TrackedLink
              isExternal
              category={TRACKING_CATEGORY}
              href="https://portal.thirdweb.com/connect/pay/buy-with-crypto"
              label="buy-with-crypto-docs"
              color="primary.500"
            >
              Buy With Crypto
            </TrackedLink>
            .
          </Text>
        </Flex>

        {hasPayApiKeys && tabOption === "pay" && (
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

      {radioOptions.length > 1 && (
        <FormControl>
          <Flex {...getRootProps()} gap={5}>
            {radioOptions.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard
                  key={value}
                  {...radio}
                  isChecked={value === tabOption}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </RadioCard>
              );
            })}
          </Flex>
        </FormControl>
      )}

      {tabOption === "checkouts" ? (
        <Tabs>
          <TabList>
            <Tab>Payments Enabled</Tab>
            <Tab>All Contracts</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <EnabledContracts />
            </TabPanel>
            <TabPanel>
              <PaymentContracts />
            </TabPanel>
            <TabPanel>
              <OldPaySetting />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <>
          {!hasPayApiKeys && (
            <NoApiKeys
              service="Pay in Connect"
              buttonTextOverride={hasApiKeys ? "Enable Pay" : undefined}
              copyOverride={
                hasApiKeys
                  ? "You'll need to enable pay as a service in an API Key to use Pay."
                  : undefined
              }
            />
          )}

          {hasPayApiKeys && selectedKey && (
            <div>
              <PayConfig apiKey={selectedKey} />
              <div className="h-10" />
              <PayAnalytics apiKey={selectedKey} />
            </div>
          )}
        </>
      )}
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
