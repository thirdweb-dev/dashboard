import {
  useMarketplaceBuyMutation,
  useMarketplaceModule,
} from "@3rdweb-sdk/react/hooks/useMarketplace";
import { useWeb3 } from "@3rdweb/hooks";
import { AuctionListing, DirectListing, ListingType } from "@3rdweb/sdk";
import { Button, ButtonGroup, Icon, Stack, useToast } from "@chakra-ui/react";
import { useSingleQueryParam } from "hooks/useQueryParam";
import React from "react";
import { BsCashCoin } from "react-icons/bs";
import { Row } from "react-table";
import { parseErrorToMessage } from "utils/errorParser";

interface IMarketplaceBuyButtonProps {
  row: Row<DirectListing | AuctionListing>;
}

export const MarketplaceBuyButton: React.FC<IMarketplaceBuyButtonProps> = ({
  row,
}) => {
  const { address } = useWeb3();
  const isOwner =
    address?.toLowerCase() === row.original.sellerAddress.toLowerCase();

  const marketplaceModule = useMarketplaceModule(
    useSingleQueryParam("marketplace"),
  );
  const toast = useToast();

  const buy = useMarketplaceBuyMutation(marketplaceModule);

  const buyMutation = () => {
    buy.mutate(
      {
        listingId: row.original.id,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "It's yours",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
        onError: (err) => {
          toast({
            title: "Error",
            description: parseErrorToMessage(err),
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      },
    );
  };

  if (isOwner) {
    return null;
  }

  if (row.original.type === ListingType.Auction) {
    return null;
  }

  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <Button
        isLoading={buy.isLoading}
        isDisabled={!marketplaceModule}
        onClick={buyMutation}
        leftIcon={<Icon as={BsCashCoin} />}
      >
        Buy
      </Button>
    </Stack>
  );
};
