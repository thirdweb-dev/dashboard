import { useMarketModule, useMarketUnlistMutation } from "@3rdweb-sdk/react";
import { useWeb3 } from "@3rdweb/hooks";
import { ListingMetadata } from "@3rdweb/sdk";
import { Button, ButtonGroup } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { useSingleQueryParam } from "hooks/useQueryParam";
import React from "react";
import { FiXCircle } from "react-icons/fi";
import { Row } from "react-table";
import { parseErrorToMessage } from "utils/errorParser";
import { BuyButton } from "./BuyCell";

interface IOwnerUnlistCellProps {
  row: Row<ListingMetadata>;
}

export const OwnerUnlistCell: React.FC<IOwnerUnlistCellProps> = ({ row }) => {
  const { address } = useWeb3();

  const isOwner = address === row.original.seller;

  const marketModule = useMarketModule(useSingleQueryParam("market"));
  const unlist = useMarketUnlistMutation(marketModule);
  const toast = useToast();

  const unlistMutation = () => {
    unlist.mutate(
      {
        listingId: row.original.id,
        amount: row.original.quantity,
        tokenContract: row.original.tokenContract,
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
    return <BuyButton row={row} />;
  }

  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <Button
        isLoading={unlist.isLoading}
        isDisabled={!marketModule}
        onClick={unlistMutation}
        leftIcon={<Icon as={FiXCircle} />}
      >
        Unlist
      </Button>
    </Stack>
  );
};
