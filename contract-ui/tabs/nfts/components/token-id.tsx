import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { AddressCopyButton } from "tw-components/AddressCopyButton";
import { NFTMediaWithEmptyState } from "tw-components/nft-media";
import { Heading, Badge, Card, CodeBlock, Text } from "tw-components";
import { NFT } from "@thirdweb-dev/sdk";
import { NFTDrawerTab } from "core-ui/nft-drawer/types";
import { NftProperty } from "./nft-property";

interface TokenIdPageProps {
  nft: NFT | undefined;
  tabs: NFTDrawerTab[];
}

export const TokenIdPage: React.FC<TokenIdPageProps> = ({ nft, tabs }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (!nft) {
    return null;
  }

  const properties = nft.metadata.attributes || nft.metadata.properties;

  return (
    <Flex py={6} px={2} flexDir={{ base: "column", md: "row" }} gap={8}>
      <Flex gap={6}>
        <NFTMediaWithEmptyState
          metadata={nft.metadata}
          width={isMobile ? "100%" : "350px"}
          height={isMobile ? "100%" : "350px"}
        />
      </Flex>

      <Flex flexDir="column" gap={6} w="full">
        <Flex flexDir="column" gap={2}>
          <Heading size="title.lg">{nft.metadata.name}</Heading>
          <Text></Text>
          <Text size="label.md" noOfLines={6}>
            {nft.metadata.description}
          </Text>
        </Flex>

        <Tabs isLazy lazyBehavior="keepMounted" colorScheme="gray">
          <TabList
            px={0}
            borderBottomColor="borderColor"
            borderBottomWidth="1px"
            overflowX={{ base: "auto", md: "inherit" }}
          >
            <Tab gap={2}>Details</Tab>
            {tabs.map((tab) => (
              <Tab key={tab.title} gap={2} isDisabled={tab.isDisabled}>
                {tab.title}
              </Tab>
            ))}
          </TabList>
          <TabPanels px={0} py={2}>
            {/* details tab always exists! */}
            <TabPanel px={0}>
              <Flex flexDir="column" gap={4}>
                <Card as={Flex} flexDir="column" gap={3}>
                  <SimpleGrid rowGap={3} columns={12} placeItems="center left">
                    <GridItem colSpan={3}>
                      <Heading size="label.md">Token ID</Heading>
                    </GridItem>
                    <GridItem colSpan={9}>
                      <AddressCopyButton
                        size="xs"
                        address={nft.metadata.id}
                        tokenId
                      />
                    </GridItem>

                    {nft.type !== "ERC1155" &&
                      BigNumber.from(nft.supply).lt(2) && (
                        <>
                          <GridItem colSpan={3}>
                            <Heading size="label.md">Owner</Heading>
                          </GridItem>
                          <GridItem colSpan={9}>
                            <AddressCopyButton size="xs" address={nft.owner} />
                          </GridItem>
                        </>
                      )}
                    <GridItem colSpan={3}>
                      <Heading size="label.md">Token Standard</Heading>
                    </GridItem>
                    <GridItem colSpan={9}>
                      <Badge size="label.sm" variant="subtle">
                        {nft.type}
                      </Badge>
                    </GridItem>
                    {nft.type !== "ERC721" && (
                      <>
                        <GridItem colSpan={3}>
                          <Heading size="label.md">Supply</Heading>
                        </GridItem>
                        <GridItem colSpan={9}>
                          <Text fontFamily="mono" size="body.md">
                            {nft.supply}
                          </Text>
                        </GridItem>
                      </>
                    )}
                  </SimpleGrid>
                </Card>
                {properties ? (
                  <Card as={Flex} flexDir="column" gap={4}>
                    <Heading size="label.md">Properties</Heading>
                    {Array.isArray(properties) && properties[0]?.value ? (
                      <SimpleGrid columns={{ base: 2, md: 4 }} gap={2}>
                        {properties.map((property: any, idx) => (
                          <NftProperty key={idx} property={property} />
                        ))}
                      </SimpleGrid>
                    ) : (
                      <CodeBlock
                        code={JSON.stringify(properties, null, 2) || ""}
                        language="json"
                        canCopy={false}
                        wrap={false}
                        overflow="auto"
                      />
                    )}
                  </Card>
                ) : null}
              </Flex>
            </TabPanel>
            {tabs.map((tab) => {
              return (
                <TabPanel key={tab.title} px={0}>
                  {tab.children}
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};
