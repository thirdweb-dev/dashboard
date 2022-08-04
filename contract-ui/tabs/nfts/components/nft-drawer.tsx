import { Box, Flex, chakra } from "@chakra-ui/react";
import { NFT, ThirdwebNftMedia } from "@thirdweb-dev/react";
import { Erc721, Erc1155 } from "@thirdweb-dev/sdk";
import { Card, Drawer, Heading, Text } from "tw-components";

interface NFTDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: NFT<Erc721<any> | Erc1155<any>>;
}

const ChakraThirdwebNftMedia = chakra(ThirdwebNftMedia);

export const NFTDrawer: React.FC<NFTDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  console.log({ data });

  return (
    <Drawer
      allowPinchZoom
      preserveScrollBarGap
      size="lg"
      onClose={onClose}
      isOpen={isOpen}
    >
      <Flex py={4} px={2} flexDir="column" gap={6}>
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
            <Text size="label.md">Owner: {data.owner}</Text>
            <Text size="label.md">Token Standard: {data.type}</Text>
            {data.type === "ERC1155" && (
              <Text size="label.md">Supply: {data.supply}</Text>
            )}
          </Flex>
        </Card>
      </Flex>
    </Drawer>
  );
};
