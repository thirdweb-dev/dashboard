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
  console.log({ data });
  const contractAddress = useSingleQueryParam("catchAll");
  const { contract } = useContract(contractAddress);
  console.log(contract);
  const address = useAddress();

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
        <Card as={Flex} flexDir="column" gap={4}>
          <Heading size="title.md">Details</Heading>
          <Flex flexDir="column" gap={3}>
            <Text size="label.md">Token ID: {data.metadata.id.toString()}</Text>
            {data.type === "ERC721" && (
              <Text size="label.md">Owner: {data.owner}</Text>
            )}
            <Text size="label.md">Token Standard: {data.type}</Text>
            {data.type === "ERC1155" && (
              <Text size="label.md">Supply: {data.supply.toString()}</Text>
            )}
          </Flex>
        </Card>
        <Tabs>
          {data.owner === address && (
            <TabList>
              <Tab>Transfer</Tab>
            </TabList>
          )}

          <TabPanels>
            {data.owner === address && (
              <TabPanel>
                <TransferTab
                  contract={contract?.nft}
                  tokenId={data.metadata.id.toString()}
                />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Flex>
    </Drawer>
  );
};
