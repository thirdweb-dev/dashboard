import {
  useMarketplaceModule,
  useMarketplaceUnlistMutation,
} from "@3rdweb-sdk/react/hooks/useMarketplace";
import { useWeb3 } from "@3rdweb/hooks";
import { AuctionListing, DirectListing, ListingType } from "@3rdweb/sdk";
import { Button, ButtonGroup } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { useSingleQueryParam } from "hooks/useQueryParam";
import React from "react";
import { FiXCircle } from "react-icons/fi";
import { Row } from "react-table";
import { parseErrorToMessage } from "utils/errorParser";
import { MarketplaceBuyButton } from "./MarketplaceBuyButton";
import { AuctionActions } from "./modules/AuctionActions";

interface IMarketplaceActionsCellProps {
  row: Row<DirectListing | AuctionListing>;
}

export const MarketplaceActionsCell: React.FC<IMarketplaceActionsCellProps> = ({
  row,
}) => {
  const { address } = useWeb3();

  const isOwner =
    address?.toLowerCase() === row.original.sellerAddress.toLowerCase();

  const marketplaceModule = useMarketplaceModule(
    useSingleQueryParam("marketplace"),
  );
  const unlist = useMarketplaceUnlistMutation(marketplaceModule);
  const toast = useToast();

  const unlistMutation = () => {
    unlist.mutate(
      {
        listingId: row.original.id,
        listingType: row.original.type,
        tokenContract: row.original.currencyContractAddress,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Listing unlisted",
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

  if (!isOwner) {
    return <MarketplaceBuyButton row={row} />;
  }

  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      {row.original.type === ListingType.Auction && (
        <AuctionActions row={row as Row<AuctionListing>} />
      )}
      <Button
        isLoading={unlist.isLoading}
        isDisabled={!marketplaceModule}
        onClick={unlistMutation}
        leftIcon={<Icon as={FiXCircle} />}
      >
        Unlist
      </Button>
    </Stack>
  );
};
