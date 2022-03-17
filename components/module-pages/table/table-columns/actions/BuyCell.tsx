import { useMarketBuyMutation, useMarketModule } from "@3rdweb-sdk/react";
import { useWeb3 } from "@3rdweb/hooks";
import { ListingMetadata } from "@3rdweb/sdk";
import { Button, ButtonGroup, Icon, Stack, useToast } from "@chakra-ui/react";
import { useSingleQueryParam } from "hooks/useQueryParam";
import React from "react";
import { BsCashCoin } from "react-icons/bs";
import { Row } from "react-table";
import { parseErrorToMessage } from "utils/errorParser";

interface IOwnerUnlistCellProps {
  row: Row<ListingMetadata>;
}

export const BuyButton: React.FC<IOwnerUnlistCellProps> = ({ row }) => {
  const { address } = useWeb3();
  const isOwner = address === row.original.seller;
  const marketModule = useMarketModule(useSingleQueryParam("market"));
  const toast = useToast();

  const buy = useMarketBuyMutation(marketModule);

  if (isOwner) {
    return null;
  }

  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <Button
        isLoading={buy.isLoading}
        isDisabled={!marketModule}
        onClick={() => {
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
        }}
        leftIcon={<Icon as={BsCashCoin} />}
      >
        Buy
      </Button>
    </Stack>
  );
};
