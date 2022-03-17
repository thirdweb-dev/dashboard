import {
  useUnwrapNFTMutation,
  useUnwrapTokenMutation,
} from "@3rdweb-sdk/react";
import { BundleMetadata } from "@3rdweb/sdk";
import { Button, Icon, useToast } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { FiPackage } from "react-icons/fi";
import { Row } from "react-table";
import { parseErrorToMessage } from "utils/errorParser";

interface IBundleActionsProps {
  row: Row<BundleMetadata>;
}

export const BundleActions: React.FC<IBundleActionsProps> = ({ row }) => {
  const toast = useToast();
  const bundleAddress = useSingleQueryParam("bundle");
  const { mutate: unwrapNFT, isLoading: isUnwrapNFTLoading } =
    useUnwrapNFTMutation(bundleAddress);
  const { mutate: unwrapToken, isLoading: isUnwrapTokenLoading } =
    useUnwrapTokenMutation(bundleAddress);

  const unwrap = () => {
    if (row.original.underlyingType === 1) {
      unwrapToken(
        {
          tokenId: row.original.metadata.id,
          amount: row.original.ownedByAddress,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Succesfully unwrapped NFT",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          },
          onError: (error) => {
            toast({
              title: "Error opening pack",
              description: parseErrorToMessage(error),
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          },
        },
      );
    } else if (row.original.underlyingType === 2) {
      unwrapNFT(row.original.metadata.id, {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Succesfully unwrapped NFT",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
        onError: (error) => {
          toast({
            title: "Error opening pack",
            description: parseErrorToMessage(error),
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      });
    }
  };

  //
  const displayUnwrap =
    BigNumber.from(row.original.ownedByAddress || 0).gt(0) &&
    (row.original.underlyingType === 2 || row.original.underlyingType === 1);

  return (
    <>
      {displayUnwrap && (
        <Button
          onClick={unwrap}
          leftIcon={<Icon as={FiPackage} />}
          isLoading={isUnwrapNFTLoading || isUnwrapTokenLoading}
        >
          Unwrap
        </Button>
      )}
    </>
  );
};
