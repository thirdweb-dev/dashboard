import { Flex, SimpleGrid } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ChainIcon } from "components/icons/ChainIcon";
import {
  ADDITIONAL_WALLETS,
  AdditionalWalletSlug,
  DEFAULT_EVM_WALLETS,
  TW_EVM_WALLET_KEY,
  useEvmWallets,
} from "contexts/evm-wallets";
import { SettingsSidebar } from "core-ui/sidebar/settings";
import { PageId } from "page-id";
import { Card, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const SettingsWalletOptionsPage: ThirdwebNextPage = () => {
  const { additionalWalletOptions, setAdditionalWalletOptions } =
    useEvmWallets();

  const toggleAdditionalWallet = (slug: AdditionalWalletSlug) => {
    additionalWalletOptions[slug] = !additionalWalletOptions[slug];
    setAdditionalWalletOptions({ ...additionalWalletOptions });
    const value = JSON.stringify(additionalWalletOptions);
    try {
      localStorage.setItem(TW_EVM_WALLET_KEY, value);
    } catch (e) {
      // if storage limit exceed
      // clear entire local storage and then try again
      localStorage.clear();
      localStorage.setItem(TW_EVM_WALLET_KEY, value);
    }
  };

  return (
    <>
      <Flex flexDir="column" gap={8} mt={{ base: 2, md: 6 }}>
        <Flex direction="column" gap={2}>
          <Flex
            justifyContent="space-between"
            direction={{ base: "column", md: "row" }}
            gap={4}
          >
            <Heading size="title.lg" as="h1">
              Wallet Options
            </Heading>
          </Flex>
          <Text>More options to connect to Thirdweb Dashboard</Text>
        </Flex>
        <Heading size="title.md" as="h2">
          Default Wallets
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          {DEFAULT_EVM_WALLETS.map((wallet) => (
            <Card
              key={wallet.id}
              as={Flex}
              flexDir="column"
              gap={3}
              p={6}
              position="relative"
              cursor={"not-allowed"}
              overflow="hidden"
            >
              <Flex justifyContent="space-between">
                <Flex alignItems="center" gap={3}>
                  <ChainIcon size={25} ipfsSrc={wallet.meta.iconURL} />

                  <Heading size="subtitle.sm" as="h3" noOfLines={1}>
                    {wallet.meta.name}
                  </Heading>
                </Flex>
                <Text my={"auto"} color={"green.500"}>
                  Enabled
                </Text>
              </Flex>
            </Card>
          ))}
        </SimpleGrid>
        <Heading size="title.md" as="h2">
          Additional Wallets
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          {(Object.keys(ADDITIONAL_WALLETS) as AdditionalWalletSlug[]).map(
            (slug) => {
              const wallet = ADDITIONAL_WALLETS[slug];
              const walletEnabled = additionalWalletOptions[slug];
              return (
                <Card
                  key={wallet.id}
                  onClick={() => toggleAdditionalWallet(slug)}
                  as={Flex}
                  flexDir="column"
                  gap={3}
                  p={6}
                  _hover={{ borderColor: "blue.500" }}
                  position="relative"
                  cursor={"pointer"}
                  overflow="hidden"
                >
                  <Flex justifyContent="space-between">
                    <Flex alignItems="center" gap={3}>
                      <ChainIcon size={25} ipfsSrc={wallet.meta.iconURL} />

                      <Heading size="subtitle.sm" as="h3" noOfLines={1}>
                        {wallet.meta.name}
                      </Heading>
                    </Flex>
                    <Text
                      my={"auto"}
                      color={walletEnabled ? "green.500" : "gray.500"}
                    >
                      {walletEnabled ? "Enabled" : "Disabled"}
                    </Text>
                  </Flex>
                </Card>
              );
            },
          )}
        </SimpleGrid>
      </Flex>
    </>
  );
};

SettingsWalletOptionsPage.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <SettingsSidebar activePage="walletOptions" />

    {page}
  </AppLayout>
);

SettingsWalletOptionsPage.pageId = PageId.SettingsWalletOptions;

export default SettingsWalletOptionsPage;
