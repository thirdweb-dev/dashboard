import {
  Flex,
  GridItem,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  chakra,
  usePrevious,
} from "@chakra-ui/react";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import type { NFT } from "@thirdweb-dev/sdk";
import type { NFTCollection, NFTDrop } from "@thirdweb-dev/sdk/solana";
import { useMemo } from "react";
import {
  AddressCopyButton,
  Badge,
  Card,
  CodeBlock,
  Drawer,
  Heading,
  Text,
} from "tw-components";
import { shortenIfAddress } from "utils/usedapp-external";

interface NFTDrawerProps {
  program: NFTCollection | NFTDrop;
  isOpen: boolean;
  onClose: () => void;
  data: NFT | null;
}

const ChakraThirdwebNftMedia = chakra(ThirdwebNftMedia);

export const NFTDrawer: React.FC<NFTDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const prevData = usePrevious(data);

  const renderData = data || prevData;

  const tokenId = renderData?.metadata.id;

  const tabs = useMemo(() => {
    if (!renderData) {
      return [];
    }
    const t = [
      {
        title: "Details",
        isDisabled: false,
        children: () => (
          <Flex flexDir="column" gap={4}>
            <Card as={Flex} flexDir="column" gap={3}>
              <SimpleGrid rowGap={3} columns={12} placeItems="center left">
                <GridItem colSpan={3}>
                  <Heading size="label.md">Token ID</Heading>
                </GridItem>
                <GridItem colSpan={9}>
                  <Text fontFamily="mono" size="body.md">
                    {shortenIfAddress(tokenId)}
                  </Text>
                </GridItem>
                <GridItem colSpan={3}>
                  <Heading size="label.md">Owner</Heading>
                </GridItem>
                <GridItem colSpan={9}>
                  <AddressCopyButton size="xs" address={renderData.owner} />
                </GridItem>
                <GridItem colSpan={3}>
                  <Heading size="label.md">Token Standard</Heading>
                </GridItem>
                <GridItem colSpan={9}>
                  <Badge size="label.sm" variant="subtle">
                    {renderData.type}
                  </Badge>
                </GridItem>
                {renderData.type !== "ERC721" && (
                  <>
                    <GridItem colSpan={3}>
                      <Heading size="label.md">Supply</Heading>
                    </GridItem>
                    <GridItem colSpan={9}>
                      <Text fontFamily="mono" size="body.md">
                        {renderData.supply}
                      </Text>
                    </GridItem>
                  </>
                )}
              </SimpleGrid>
            </Card>
            {renderData.metadata.attributes ||
            renderData.metadata.properties ? (
              <Card as={Flex} flexDir="column" gap={4}>
                <Heading size="label.md">Properties</Heading>
                <CodeBlock
                  code={
                    JSON.stringify(
                      renderData.metadata.attributes ||
                        renderData.metadata.properties,
                      null,
                      2,
                    ) || ""
                  }
                  language="json"
                  canCopy={false}
                  wrap={false}
                  overflow="auto"
                />
              </Card>
            ) : null}
          </Flex>
        ),
      },
    ];

    return t;
  }, [renderData, tokenId]);

  if (!renderData) {
    return null;
  }

  return (
    <Drawer
      allowPinchZoom
      preserveScrollBarGap
      size="lg"
      onClose={onClose}
      isOpen={isOpen}
    >
      <Flex py={6} px={2} flexDir="column" gap={6}>
        <Flex gap={6}>
          <ChakraThirdwebNftMedia
            metadata={renderData.metadata}
            requireInteraction
            flexShrink={0}
            boxSize={32}
            objectFit="contain"
          />
          <Flex flexDir="column" gap={2} w="70%">
            <Heading size="title.lg">{renderData.metadata.name}</Heading>
            <Text size="label.md" noOfLines={6}>
              {renderData.metadata.description}
            </Text>
          </Flex>
        </Flex>

        <Tabs isLazy lazyBehavior="keepMounted">
          <TabList
            px={0}
            borderBottomColor="borderColor"
            borderBottomWidth="1px"
            overflowX={{ base: "auto", md: "inherit" }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.title} gap={2} isDisabled={tab.isDisabled}>
                {tab.title}
              </Tab>
            ))}
          </TabList>
          <TabPanels px={0} py={2}>
            {tabs.map((tab) => {
              return (
                <TabPanel key={tab.title} px={0}>
                  {tab.children()}
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Flex>
    </Drawer>
  );
};
