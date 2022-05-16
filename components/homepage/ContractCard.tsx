import { AspectRatio, Box, Flex, Stack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import React from "react";
import { Heading, Text } from "tw-components";

export const contractMap = {
  nft: {
    title: "NFTs and Tokens",
    description:
      "Create social tokens, NFT collections, or customized unique tokens.",
  },
  drop: {
    title: "Drops",
    description: "Let users mint your token or NFT while you set the rules.",
  },
  marketplace: {
    title: "Marketplace",
    description: "Your own marketplace to let users buy and sell any tokens.",
  },
  governance: {
    title: "Governance",
    description: "Your on-chain treasury for sharing revenue trustlessly.",
  },
} as const;

type ContractCardType = keyof typeof contractMap;

export const ContractCard: React.FC<{ type: ContractCardType }> = ({
  type,
}) => {
  const { title, description } = contractMap[type];
  return (
    <Flex
      border="1px solid"
      borderColor="#ffffff26"
      p={8}
      borderRadius="lg"
      backgroundColor="#0000004d"
      flexDir="column"
      justifyContent="space-between"
    >
      <AspectRatio ratio={1} w="100px">
        <Box>
          <ChakraNextImage
            src={require(`/public/assets/add-contract/${type}.png`)}
            alt=""
            w="100%"
          />
        </Box>
      </AspectRatio>

      <Stack spacing={3} mt={4}>
        <Heading as="h4" size="title.sm" fontWeight="600" color="gray.50">
          {title}
        </Heading>
        <Text size="body.lg">{description}</Text>
      </Stack>
    </Flex>
  );
};
