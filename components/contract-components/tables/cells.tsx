import { Skeleton } from "@chakra-ui/react";
import { memo } from "react";
import { ChakraNextLink, Text } from "tw-components";
import { useChainSlug } from "hooks/chains/chainSlug";
import { shortenIfAddress } from "utils/usedapp-external";
import { usePublishedContractsFromDeploy } from "../hooks";
import { getContract, defineChain } from "thirdweb";
import { thirdwebClient } from "lib/thirdweb-client";
import { BasicContract } from "contract-ui/types/types";
import { useContractMetadataAndName } from "dashboard-extensions/hooks/useContractMetadataAndName";

interface AsyncContractNameCellProps {
  cell: BasicContract;
}

export const AsyncContractNameCell = memo(
  ({ cell }: AsyncContractNameCellProps) => {
    const chainSlug = useChainSlug(cell.chainId);

    const contract = getContract({
      client: thirdwebClient,
      address: cell.address,
      chain: defineChain(cell.chainId),
    });

    const contractMetadataAndName = useContractMetadataAndName(contract);

    return (
      <Skeleton isLoaded={!contractMetadataAndName.isFetching}>
        <ChakraNextLink href={`/${chainSlug}/${cell.address}`} passHref>
          <Text
            color="blue.500"
            _dark={{ color: "blue.400" }}
            size="label.md"
            _groupHover={{ textDecor: "underline" }}
          >
            {contractMetadataAndName.data?.name ||
              shortenIfAddress(cell.address)}
          </Text>
        </ChakraNextLink>
      </Skeleton>
    );
  },
);

AsyncContractNameCell.displayName = "AsyncContractNameCell";

interface AsyncContractTypeCellProps {
  cell: BasicContract;
}

export const AsyncContractTypeCell = memo(
  ({ cell }: AsyncContractTypeCellProps) => {
    const publishedContractsFromDeployQuery = usePublishedContractsFromDeploy(
      cell.address,
      cell.chainId,
    );

    const contractType =
      publishedContractsFromDeployQuery.data?.[0]?.displayName ||
      publishedContractsFromDeployQuery.data?.[0]?.name;

    return (
      <Skeleton
        isLoaded={
          !publishedContractsFromDeployQuery.isInitialLoading ||
          publishedContractsFromDeployQuery.isLoadingError
        }
      >
        {contractType ? (
          <Text noOfLines={1} maxWidth={200} isTruncated>
            {contractType}
          </Text>
        ) : (
          <Text fontStyle="italic" opacity={0.5}>
            Custom
          </Text>
        )}
      </Skeleton>
    );
  },
);

AsyncContractTypeCell.displayName = "AsyncContractTypeCell";
