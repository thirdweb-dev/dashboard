import {
  Divider,
  Button,
  AspectRatio,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { NFTMetadata } from "@nftlabs/sdk";
import { Card } from "components/layout/Card";
import { useActiveMarketModule } from "context/sdk/modules/market-context";
import React from "react";
import { NFTTokenOutput } from "schema/tokens";

interface IListingItem {
  listing: any;
  onBuy?: (metadata: NFTMetadata & NFTTokenOutput) => void;
}
export const MarketItem: React.FC<IListingItem> = ({ listing, onBuy }) => {
  // const bgColor = useSafeColorHex(nft.background_color || "000");
  const { module, refresh } = useActiveMarketModule((c) => c);
  console.log("market item", listing);

  async function unlist(listingId: string) {
    await module?.unlistAll(listingId);
    await refresh();
  }

  const nft = listing?.tokenMetadata;
  return (
    <WrapItem as={Card}>
      <Stack spacing={4}>
        <Heading size="md">#{listing.id}</Heading>
        <Card _hover={{ boxShadow: "md", cursor: "pointer" }}>
          <Stack spacing={2}>
            <AspectRatio w="250px">
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
            <Divider />
            <Text>Quantity: {listing?.quantity.toString()}</Text>
            {listing?.currencyMetadata?.displayValue === "0" ? (
              <Text>Price: Free</Text>
            ) : (
              <Text>
                Price: {listing?.currencyMetadata?.displayValue}{" "}
                {listing?.currencyMetadata?.symbol}
              </Text>
            )}
            <Divider />
            <HStack spacing={4}>
              <Button onClick={() => unlist(listing.id)}>Unlist</Button>
            </HStack>
          </Stack>
        </Card>
      </Stack>
    </WrapItem>
  );
};
