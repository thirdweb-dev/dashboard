import {
  Divider,
  Button,
  AspectRatio,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  WrapItem,
  Box,
} from "@chakra-ui/react";
import { NFTMetadata } from "@nftlabs/sdk";
import { Card } from "components/layout/Card";
import React from "react";
import { NFTTokenOutput } from "schema/tokens";

interface INFTItem {
  nft: NFTMetadata & NFTTokenOutput;
  idx: number;
  onList?: (metadata: NFTMetadata & NFTTokenOutput) => void;
  onTransfer?: (metadata: NFTMetadata & NFTTokenOutput) => void;
}
export const NFTItem: React.FC<INFTItem> = ({ nft, onList, onTransfer }) => {
  return (
    <WrapItem as={Card} w="xs">
      <Stack spacing={4}>
        <Heading size="md">#{nft.id}</Heading>
        <Card _hover={{ boxShadow: "md", cursor: "pointer" }}>
          <Stack spacing={2}>
            <AspectRatio w="200px">
              <Center borderRadius="md" overflow="hidden">
                {nft.image && (
                  <Image
                    objectFit="contain"
                    w="100%"
                    h="100%"
                    src={nft.image}
                  />
                )}
              </Center>
            </AspectRatio>
            <Heading size="sm">{nft?.name}</Heading>
            <Text>{nft?.description}</Text>
            {nft.properties ? (
              <Text>Properties = {JSON.stringify(nft.properties)}</Text>
            ) : (
              ""
            )}
            {onList ? (
              <>
                <Divider />
                <Button onClick={() => onList(nft)}>List on Marketplace</Button>
              </>
            ) : null}

            {onTransfer ? (
              <>
                <Divider />
                <Button onClick={() => onTransfer(nft)}>Transfer</Button>
              </>
            ) : null}
          </Stack>
        </Card>
      </Stack>
    </WrapItem>
  );
};
