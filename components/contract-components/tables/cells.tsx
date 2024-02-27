
import { Skeleton } from "@chakra-ui/react";
import { memo } from "react";
import { ChakraNextLink, Text } from "tw-components";
import { useQueryWithAddressAndChainId } from "@3rdweb-sdk/react";
import { useChainSlug } from "hooks/chains/chainSlug";
import { shortenIfAddress } from "utils/usedapp-external";
import { usePublishedContractsFromDeploy } from "../hooks";

interface AsyncContractNameCellProps {
  cell: {
    address: string;
    chainId: number;
    metadata: () => Promise<{ name: string; }>;
  };
}

export const AsyncContractNameCell = memo(
  ({ cell }: AsyncContractNameCellProps) => {
    const chainSlug = useChainSlug(cell.chainId);
    const metadataQuery = useQueryWithAddressAndChainId(
      "contract-metadata",
      cell.address,
      cell.metadata,
      cell.chainId,
    );

    return (
      <Skeleton isLoaded={!metadataQuery.isLoading}>
        <ChakraNextLink href={`/${chainSlug}/${cell.address}`} passHref>
          <Text
            color="blue.500"
            _dark={{ color: "blue.400" }}
            size="label.md"
            _groupHover={{ textDecor: "underline" }}
          >
            {metadataQuery.data?.name || shortenIfAddress(cell.address)}
          </Text>
        </ChakraNextLink>
      </Skeleton>
    );
  },
);

AsyncContractNameCell.displayName = "AsyncContractNameCell";

interface AsyncContractTypeCellProps {
  cell: {
    address: string;
    chainId: number;
    metadata: () => Promise<{ name: string; }>;
  };
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
