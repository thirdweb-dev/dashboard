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
import { Heading, Text } from "tw-components";

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

// const TRACKING_CATEGORY = "pay";

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

const DashboardConnectPay: ThirdwebNextPage = () => {
  const { data: paymentEnabledContracts } = usePaymentsEnabledContracts();

  const [configOption, setConfigOption] = useState<"pay" | "checkout">("pay");
  const radioOptions = ["pay", "checkout"].filter((option) => {
    return (
      option === "pay" ||
      (option === "checkout" && paymentEnabledContracts?.length)
    );
  });
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "config",
    defaultValue: "pay",
    onChange: (value: "pay" | "checkout") => setConfigOption(value),
  });

  // Pay setting api key configuration
  const router = useRouter();
  const defaultClientId = router.query.clientId?.toString();
  const { isLoggedIn } = useLoggedInUser();
  const { user } = useLoggedInUser();
  const queryClient = useQueryClient();

  const [selectedKey, setSelectedKey] = useState<undefined | ApiKey>();

  const keysQuery = useApiKeys();
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

  let ConfigurationControls = (
    <>
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
    </>
  );

  if (configOption === "checkout") {
    ConfigurationControls = (
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
            Pay Settings
          </Heading>
          <Text maxW="xl">Configure your developer settings for payments </Text>
        </Flex>

        {hasApiKeys && configOption === "pay" && (
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
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </Flex>
        </FormControl>
      )}

      {ConfigurationControls}
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
