import { Flex, FormControl, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { WalletsSidebar } from "core-ui/sidebar/wallets";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Heading, Text } from "tw-components";
import { useAddress } from "@thirdweb-dev/react";
import { useMultiChainRegContractList } from "@3rdweb-sdk/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useApiKeys } from "@3rdweb-sdk/react/hooks/useApi";
import { CodeSegment } from "components/contract-tabs/code/CodeSegment";
import { formatSnippet } from "contract-ui/tabs/code/components/code-overview";
import { WALLETS_SNIPPETS } from "./wallet-sdk";
import { useState } from "react";
import { CodeEnvironment } from "components/contract-tabs/code/types";
import { useChainSlug } from "hooks/chains/chainSlug";

const useFactories = () => {
  const walletAddress = useAddress();
  const contracts = useMultiChainRegContractList(walletAddress);
  return useQuery(
    [
      "dashboard-registry",
      walletAddress,
      "multichain-contract-list",
      "factories",
    ],
    async () => {
      if (!walletAddress || !contracts.data || contracts.data.length === 0) {
        return [];
      }

      const contractWithExtensions = await Promise.all(
        contracts.data.map(async (c) => {
          const extensions =
            "extensions" in c ? await c.extensions().catch(() => []) : [];
          return {
            contract: c,
            extensions,
          };
        }),
      );

      const factories = contractWithExtensions.filter((c) =>
        c.extensions.includes("AccountFactory"),
      );

      return factories;
    },
    {
      enabled: !!walletAddress && !!contracts.data,
    },
  );
};

export type SmartWalletFormData = {
  chainAndFactoryAddress: string;
  clientId: string;
};

const DashboardWalletsSmartWallet: ThirdwebNextPage = () => {
  const factories = useFactories();
  const keysQuery = useApiKeys();
  const form = useForm<SmartWalletFormData>();
  const [selectedLanguage, setSelectedLanguage] =
    useState<CodeEnvironment>("javascript");
  const snippet = WALLETS_SNIPPETS.find((s) => s.id === "smart-wallet");
  const chainSlug = useChainSlug(
    form.watch("chainAndFactoryAddress")?.split("-")[0],
  );

  return (
    <Flex flexDir="column" gap={16} mt={{ base: 2, md: 6 }}>
      <Flex flexDir="column" gap={4}>
        <Heading size="title.lg" as="h1">
          Smart Wallet
        </Heading>
        <Text>Easily add a smart wallet to your app.</Text>
      </Flex>
      <FormControl as={Flex} flexDir={"column"} gap={12}>
        <Flex flexDir="column" gap={4}>
          <Heading size="title.md" as="h1">
            Account Factories
          </Heading>
          {/* Probably needs to be a dropdown instead */}
          <RadioGroup
            onChange={(value: "testnet" | "mainnet") => {
              form.setValue("chainAndFactoryAddress", value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            value={form.watch("chainAndFactoryAddress")}
          >
            <Stack direction="column" gap={4} mt={3}>
              {factories.data?.map((f) => (
                <Radio
                  key={f.contract.address}
                  value={`${f.contract.chainId}-${f.contract.address}`}
                >
                  {f.contract.chainId} - {f.contract.address}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Flex>
        <Flex flexDir="column" gap={4}>
          <Heading size="title.md" as="h1">
            Client IDs
          </Heading>
          {/* Probably needs to be a dropdown instead */}
          <RadioGroup
            onChange={(value: "testnet" | "mainnet") => {
              form.setValue("clientId", value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            value={form.watch("clientId")}
          >
            <Stack direction="column" gap={4} mt={3}>
              {keysQuery.data?.map((f) => (
                <Radio key={f.key} value={f.key}>
                  {f.name} - {f.key}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Flex>
      </FormControl>
      <CodeSegment
        snippet={formatSnippet(snippet?.supportedLanguages as any, {
          contractAddress: form.watch("chainAndFactoryAddress")?.split("-")[1],
          clientId: form.watch("clientId"),
          chainName: chainSlug?.toString() || "ethereum",
        })}
        environment={selectedLanguage}
        setEnvironment={setSelectedLanguage}
        hideTabs
      />
    </Flex>
  );
};

DashboardWalletsSmartWallet.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <WalletsSidebar activePage="smart-wallet" />
    {page}
  </AppLayout>
);

DashboardWalletsSmartWallet.pageId = PageId.DashboardWalletsSmartWallet;

export default DashboardWalletsSmartWallet;
