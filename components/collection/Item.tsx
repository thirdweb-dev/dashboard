import {
  Divider,
  Button,
  Input,
  AspectRatio,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  WrapItem,
  Flex,
  Box,
  HStack,
} from "@chakra-ui/react";
import { CollectionMetadata, NFTMetadata } from "@nftlabs/sdk";
import { Card } from "components/layout/Card";
import { useActiveCollectionModule } from "context/sdk/modules/collection-context";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { NFTTokenOutput } from "schema/tokens";

interface INFTItem {
  collection: CollectionMetadata & NFTTokenOutput;
  idx: number;
  onList?: (metadata: NFTMetadata) => void;
}
export const CollectionItem: React.FC<INFTItem> = ({
  collection,
  idx,
  onList,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      amount: "1",
    },
  });
  const { module, refresh } = useActiveCollectionModule((c) => c);

  const onMint = useCallback(
    async (data) => {
      if (!collection || !collection.metadata) {
        return;
      }
      try {
        setLoading(true);
        await module?.mint({
          tokenId: collection.metadata?.id,
          amount: data.amount,
        });
        await refresh();
      } finally {
        setLoading(false);
      }
    },
    [collection, module, refresh],
  );

  return (
    <WrapItem as={Card} maxW="xs">
      <Stack spacing={4}>
        <Heading size="md">#{collection.metadata?.id}</Heading>
        <Card _hover={{ boxShadow: "md" }}>
          <Stack spacing={2}>
            <AspectRatio w="250px">
              <Center borderRadius="md" overflow="hidden">
                {collection.metadata?.image && (
                  <Image
                    objectFit="contain"
                    w="100%"
                    h="100%"
                    src={collection.metadata?.image}
                  />
                )}
              </Center>
            </AspectRatio>
            <Heading size="sm">{collection.metadata?.name}</Heading>
            <Text>Supply: {collection.supply.toString()}</Text>
            <Text>{collection.metadata?.description}</Text>

            <Divider />
            <Box>
              <Text>Amount:</Text>
              <form onSubmit={handleSubmit(onMint)}>
                <HStack spacing={2}>
                  <Input
                    type="number"
                    pattern="[0-9]"
                    step="1"
                    {...register("amount")}
                  />
                  <Button type="submit">Mint More</Button>
                </HStack>
              </form>
            </Box>

            {onList ? (
              <>
                <Divider />
                <Button
                  onClick={() => onList(collection.metadata as NFTMetadata)}
                >
                  List on Marketplace
                </Button>
              </>
            ) : null}
          </Stack>
        </Card>
      </Stack>
    </WrapItem>
  );
};
