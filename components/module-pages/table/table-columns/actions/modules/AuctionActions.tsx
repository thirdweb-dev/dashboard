import {
  useAuctionCloseMutation,
  useMarketplaceModule,
} from "@3rdweb-sdk/react/hooks/useMarketplace";
import { AuctionListing } from "@3rdweb/sdk";
import { Button, Icon, useToast } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useMemo } from "react";
import { FiXCircle } from "react-icons/fi";
import { Row } from "react-table";
import { parseErrorToMessage } from "utils/errorParser";

interface IAuctionActions {
  row: Row<AuctionListing>;
}

export const AuctionActions: React.FC<IAuctionActions> = ({ row }) => {
  const toast = useToast();
  const marketplaceModule = useMarketplaceModule(
    useSingleQueryParam("marketplace"),
  );
  const close = useAuctionCloseMutation(marketplaceModule);

  const closeMutation = () => {
    close.mutate(row.original.id, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Auction closed",
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
    });
  };

  const isAuctionEnded = useMemo(() => {
    const endTime = BigNumber.from(row.original.endTimeInEpochSeconds);
    const currentTime = BigNumber.from(Math.floor(Date.now() / 1000));

    return endTime.sub(currentTime).lte(0);
  }, [row.original.endTimeInEpochSeconds]);

  if (isAuctionEnded) {
    return (
      <Button
        isLoading={close.isLoading}
        isDisabled={!marketplaceModule}
        onClick={closeMutation}
        leftIcon={<Icon as={FiXCircle} />}
      >
        Close Auction
      </Button>
    );
  }

  return null;
};
