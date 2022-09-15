import {
  Box,
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Solana } from "@thirdweb-dev/chain-icons";
import { useAddress } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { ReleasedContractTable } from "components/contract-components/contract-table-v2";
import { usePublishedContractsQuery } from "components/contract-components/hooks";
import { FancyEVMIcon } from "components/icons/Ethereum";
import {
  BuiltinContractMap,
  PREBUILT_SOLANA_CONTRACTS_MAP,
} from "constants/mappings";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import { ReactElement, useMemo } from "react";
import {
  Card,
  CodeBlock,
  Heading,
  LinkButton,
  Text,
  TrackedLink,
} from "tw-components";

const Contracts: ThirdwebNextPage = () => {
  const walletAddress = useAddress();
  const releasedContractsQuery = usePublishedContractsQuery(walletAddress);

  const prebuiltContracts = Object.values(BuiltinContractMap).filter(
    (contract) => contract.contractType !== "custom",
  );

  const prebuiltSolContracts = Object.values(PREBUILT_SOLANA_CONTRACTS_MAP);

  const releasedContracts = useMemo(
    () => releasedContractsQuery.data || [],
    [releasedContractsQuery],
  );

  const allContracts = useMemo(
    () => [...releasedContracts, ...prebuiltContracts],

    [prebuiltContracts, releasedContracts],
  );

  return (
    <>
      <Tabs>
        <TabList
          px={0}
          borderBottomColor="borderColor"
          borderBottomWidth="1px"
          overflowX={{ base: "auto", md: "inherit" }}
        >
          <Tab gap={2} _selected={{ borderBottomColor: "purple.500" }}>
            <Icon opacity={0.85} boxSize={6} as={FancyEVMIcon} />
            <Heading size="label.lg">EVM Contracts</Heading>
          </Tab>
          <Tab
            gap={2}
            _selected={{
              borderBottomColor: "#00ffa3",
            }}
          >
            <Icon boxSize={6} as={Solana} />
            <Heading size="label.lg">Solana Programs</Heading>
          </Tab>
        </TabList>
        <TabPanels px={0} py={2}>
          <TabPanel px={0}>
            <Flex gap={8} direction="column">
              <Text fontStyle="italic">
                A combination of our{" "}
                <TrackedLink
                  category="contracts"
                  label="pre-built"
                  href="https://portal.thirdweb.com/pre-built-contracts"
                  isExternal
                  color="blue.500"
                >
                  prebuilt contracts
                </TrackedLink>{" "}
                and your{" "}
                <TrackedLink
                  category="contracts"
                  label="released"
                  href="https://portal.thirdweb.com/release"
                  isExternal
                  color="blue.500"
                >
                  released contracts
                </TrackedLink>
                . Not sure which contract is right for your use-case?{" "}
                <TrackedLink
                  category="contracts"
                  label="take-quiz"
                  href="https://portal.thirdweb.com/pre-built-contracts/choosing-the-right-pre-built-contract"
                  isExternal
                  color="blue.500"
                >
                  Help me choose.
                </TrackedLink>
              </Text>

              <ReleasedContractTable
                contractDetails={allContracts}
                isFetching={releasedContractsQuery.isFetching}
              />

              <Card
                bg="backgroundHighlight"
                p={8}
                outlineBorder={{
                  gradient: "linear(147.15deg, #410AB6 30.17%, #E85CFF 100%)",
                  width: "5px",
                }}
              >
                <Flex
                  gap={4}
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                  align="center"
                >
                  <Flex gap={6} direction="column">
                    <Heading size="title.md">
                      Don&apos;t see the contract you want? Release your own!
                    </Heading>

                    <Box>
                      <CodeBlock code="npx thirdweb release" language="bash" />
                    </Box>
                  </Flex>
                  <LinkButton
                    colorScheme="purple"
                    w={{ base: "full", md: "auto" }}
                    isExternal
                    href="https://portal.thirdweb.com/release"
                    size="md"
                  >
                    Learn more
                  </LinkButton>
                </Flex>
              </Card>
            </Flex>
          </TabPanel>
          <TabPanel px={0}>
            <Flex gap={8} direction="column">
              <Text fontStyle="italic">
                Prebuilt solana progams for you to deploy.
              </Text>
              <ReleasedContractTable
                contractDetails={prebuiltSolContracts}
                isFetching={false}
                hideReleasedBy
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

Contracts.getLayout = (page: ReactElement) => (
  <AppLayout>
    <PublisherSDKContext>{page}</PublisherSDKContext>
  </AppLayout>
);

Contracts.pageId = PageId.Contracts;

export default Contracts;
