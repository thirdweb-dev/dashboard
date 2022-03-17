import { NFTMetadata } from "@3rdweb/sdk";
import { Flex, Image, Text } from "@chakra-ui/react";

interface INFT {
  selected: boolean;
  metadata: NFTMetadata;
  onClick: () => void;
}

export const NFT: React.FC<INFT> = ({ selected, metadata, onClick }) => {
  return (
    <Flex
      margin="4px"
      direction="column"
      padding="12px"
      align="center"
      onClick={onClick}
      cursor="pointer"
      bg={selected ? "gray.50" : "transparent"}
      borderRadius="md"
      _hover={{
        bg: "gray.100",
      }}
    >
      <Image
        alt=""
        w="160px"
        borderRadius="md"
        src={metadata?.image as string}
      />
      <Text size="label.lg" mt="4px">
        {metadata?.name}
      </Text>
    </Flex>
  );
};
