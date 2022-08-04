import { TransferTab } from "./transfer-tab";
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  chakra,
} from "@chakra-ui/react";
import {
  NFT,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useNFTBalance,
} from "@thirdweb-dev/react";
import { Erc721, Erc1155 } from "@thirdweb-dev/sdk";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { Card, Drawer, Heading, Text } from "tw-components";

interface NFTDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: NFT<Erc721<any> | Erc1155<any>> | null;
}

const ChakraThirdwebNftMedia = chakra(ThirdwebNftMedia);

export const NFTDrawer: React.FC<NFTDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const contractAddress = useSingleQueryParam("catchAll");
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  const balanceOf = useNFTBalance(
    contract?.edition,
    address,
    data?.metadata.id,
  );

  if (!data) {
    return null;
  }

  return (
    <Drawer
      allowPinchZoom
      preserveScrollBarGap
      size="lg"
      onClose={onClose}
      isOpen={isOpen}
      isFullHeight
    >
      <Flex py={6} px={2} flexDir="column" gap={6}>
        <Flex gap={6}>
          <ChakraThirdwebNftMedia
            metadata={data.metadata}
            requireInteraction
            flexShrink={0}
            boxSize={32}
            objectFit="contain"
          />
          <Flex flexDir="column" gap={2} w="70%">
            <Heading size="title.lg">{data.metadata.name}</Heading>
            <Text size="label.md" noOfLines={6}>
              {data.metadata.description}
            </Text>
          </Flex>
        </Flex>
        <Card as={Flex} flexDir="column" gap={2} p={0}>
          <Tabs isLazy lazyBehavior="keepMounted">
            <TabList
              px={0}
              borderBottomColor="borderColor"
              borderBottomWidth="1px"
              overflowX={{ base: "auto", md: "inherit" }}
            >
              <Tab gap={2}>Details</Tab>
              <Tab
                gap={2}
                isDisabled={
                  (data.type === "ERC721" && data.owner !== address) ||
                  (data.type === "ERC1155" && balanceOf.data?.lt(1))
                }
              >
                Transfer
              </Tab>
              <Tab gap={2} isDisabled>
                Burn
              </Tab>
              {data.type === "ERC1155" && (
                <Tab gap={2} isDisabled>
                  Transfer Batch
                </Tab>
              )}
              {data.type === "ERC1155" && (
                <Tab gap={2} isDisabled>
                  Claim Phases
                </Tab>
              )}
            </TabList>

            <TabPanels px={{ base: 4, md: 6 }} py={2}>
              <TabPanel px={0}>
                <Flex flexDir="column" gap={3}>
                  <Text size="label.md">
                    Token ID: {data.metadata.id.toString()}
                  </Text>
                  {data.type === "ERC721" && (
                    <Text size="label.md">Owner: {data.owner}</Text>
                  )}
                  <Text size="label.md">Token Standard: {data.type}</Text>
                  {data.type === "ERC1155" && (
                    <Text size="label.md">
                      Supply: {data.supply.toString()}
                    </Text>
                  )}
                </Flex>
              </TabPanel>

              <TabPanel px={0}>
                <TransferTab
                  contract={contract?.nft || contract?.edition}
                  tokenId={data.metadata.id.toString()}
                />
              </TabPanel>
              <TabPanel>Burn</TabPanel>
            </TabPanels>
          </Tabs>
        </Card>
      </Flex>
    </Drawer>
  );
};
