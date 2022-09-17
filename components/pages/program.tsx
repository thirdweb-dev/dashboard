import { useMutationWithInvalidate } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import {
  Center,
  Flex,
  Icon,
  IconButton,
  Select,
  Skeleton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { MintNFTParams, RequiredParam } from "@thirdweb-dev/react";
import { NFTCollection } from "@thirdweb-dev/solana";
import { NFTDrop } from "@thirdweb-dev/solana/dist/declarations/src/contracts/nft-drop";
import { NFTMetadataInput } from "@thirdweb-dev/solana/dist/declarations/src/types/nft";
import { useSOLSDK } from "components/app-layouts/solana-provider";
import { MediaCell } from "components/contract-pages/table/table-columns/cells/media-cell";
import { ProgramMetadata } from "components/custom-contract/contract-header/program-metadata";
import { NFTMintForm } from "contract-ui/tabs/nfts/components/mint-form";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { Column, usePagination, useTable } from "react-table";
import invariant from "tiny-invariant";
import { Button, Card, Drawer, Heading, Text } from "tw-components";
import { DashboardSolanaNetwork } from "utils/network";
import { shortenString } from "utils/usedapp-external";

export type ProgramPageProps = {
  address: string;
  network: DashboardSolanaNetwork;
};

export const ProgramPage: React.FC<ProgramPageProps> = ({
  address,
  network,
}) => {
  const { data: account } = useAccount(address, network);
  return (
    <Flex gap={4} direction="column">
      <ProgramMetadata address={address} network={network} />
      {account?.accountType === "nft-collection" ? (
        <NFTCollectionPanel account={account} />
      ) : null}
      {account?.accountType === "nft-drop" ? (
        <NFTDropPanel account={account} />
      ) : null}
    </Flex>
  );
};

// /// COMPONENTS ///

export const NFTCollectionPanel: React.FC<{
  account: NFTCollection;
}> = ({ account }) => {
  return (
    <Flex direction="column" gap={6}>
      <Flex direction="row" justify="space-between" align="center">
        <Heading size="title.sm">Program NFTs</Heading>
        <Flex gap={2} flexDir={{ base: "column", md: "row" }}>
          <NFTMintButton account={account} />
        </Flex>
      </Flex>
      <NFTList account={account} />
    </Flex>
  );
};

export const NFTDropPanel: React.FC<{
  account: NFTDrop;
}> = ({ account }) => {
  return (
    <Flex direction="column" gap={6}>
      <Flex direction="row" justify="space-between" align="center">
        <Heading size="title.sm">Program NFTs</Heading>
        <Flex gap={2} flexDir={{ base: "column", md: "row" }}>
          <NFTLazyMintButton account={account} />
        </Flex>
      </Flex>
      <NFTList account={account} />
    </Flex>
  );
};

export const NFTMintButton: React.FC<{ account: NFTCollection }> = ({
  account,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useSolMintNFT(account);
  return (
    <>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <NFTMintForm mintMutation={mutation} ecosystem={"solana"} />
      </Drawer>
      <Button
        colorScheme="primary"
        leftIcon={<Icon as={FiPlus} />}
        {...restButtonProps}
        onClick={onOpen}
      >
        Mint
      </Button>
    </>
  );
};

export const NFTLazyMintButton: React.FC<{ account: NFTDrop }> = ({
  account,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useSolLazyMintNFT(account);
  // TODO (sol) not cast as any here
  return (
    <>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <NFTMintForm lazyMintMutation={mutation as any} ecosystem={"solana"} />
      </Drawer>
      <Button
        colorScheme="primary"
        leftIcon={<Icon as={FiPlus} />}
        {...restButtonProps}
        onClick={onOpen}
      >
        Single Upload
      </Button>
    </>
  );
};

export const NFTList: React.FC<{
  account: NFTCollection | NFTDrop;
}> = ({ account }) => {
  const tableColumns = useMemo(() => {
    const cols: Column<NFTMetadataInput>[] = [
      {
        Header: "Address",
        accessor: (row) => shortenString(row.id?.toString() || "", true),
      },
      {
        Header: "Media",
        accessor: (row) => row,
        Cell: (cell: any) => <MediaCell cell={cell} />,
      },
      {
        Header: "Name",
        accessor: (row) => row.name,
      },
      {
        Header: "Description",
        accessor: (row) => row.description,
      },
    ];
    return cols;
  }, []);

  const [queryParams, setQueryParams] = useState({ count: 50, start: 0 });

  const getAllQueryResult = useSolNFTs(account);
  const totalCount = getAllQueryResult.data ? getAllQueryResult.data.length : 0;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: tableColumns,
      data: getAllQueryResult.data || [],
      initialState: {
        pageSize: queryParams.count,
        pageIndex: 0,
      },
      manualPagination: true,
      pageCount: Math.max(
        Math.ceil(BigNumber.from(totalCount).toNumber() / queryParams.count),
        1,
      ),
    },
    usePagination,
  );

  useEffect(() => {
    setQueryParams({ start: pageIndex * pageSize, count: pageSize });
  }, [pageIndex, pageSize]);

  // TODO (SOL) NFTDrawer
  const [, setTokenRow] = useState<NFTMetadataInput | null>(null);

  return (
    <Flex gap={4} direction="column">
      <Card maxW="100%" overflowX="auto" position="relative" px={0} py={0}>
        {getAllQueryResult.isFetching && (
          <Spinner
            color="primary"
            size="xs"
            position="absolute"
            top={2}
            right={4}
          />
        )}
        {/* <NFTDrawer
          contract={contract}
          data={tokenRow}
          isOpen={!!tokenRow}
          onClose={() => setTokenRow(null)}
        /> */}
        <Table {...getTableProps()}>
          <Thead bg="blackAlpha.50" _dark={{ bg: "whiteAlpha.50" }}>
            {headerGroups.map((headerGroup) => (
              // eslint-disable-next-line react/jsx-key
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <Th {...column.getHeaderProps()} py={5}>
                    <Text as="label" size="label.md">
                      {column.render("Header")}
                    </Text>
                  </Th>
                ))}
                {/* // Need to add an empty header for the drawer button */}
                <Th />
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()} position="relative">
            {page.map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <Tr
                  {...row.getRowProps()}
                  role="group"
                  _hover={{ bg: "blackAlpha.50" }}
                  _dark={{
                    _hover: {
                      bg: "whiteAlpha.50",
                    },
                  }}
                  // this is a hack to get around the fact that safari does not handle position: relative on table rows
                  style={{ cursor: "pointer" }}
                  onClick={() => setTokenRow(row.original)}
                  // end hack
                  borderBottomWidth={1}
                  _last={{ borderBottomWidth: 0 }}
                >
                  {row.cells.map((cell) => (
                    // eslint-disable-next-line react/jsx-key
                    <Td {...cell.getCellProps()} borderBottomWidth="inherit">
                      {cell.render("Cell")}
                    </Td>
                  ))}
                  <Td borderBottomWidth="inherit">
                    <Icon as={FiArrowRight} />
                  </Td>
                </Tr>
              );
            })}
            {getAllQueryResult.isPreviousData && (
              <Flex
                zIndex="above"
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                backdropFilter="blur(5px)"
                bg="blackAlpha.100"
                _dark={{ bg: "whiteAlpha.50" }}
                borderRadius="md"
                align="flex-end"
                justify="center"
                p={8}
              >
                <Flex align="center" gap={4}>
                  <Spinner size="sm" />
                  <Heading size="label.lg">Fetching new page</Heading>
                </Flex>
              </Flex>
            )}
          </Tbody>
        </Table>
      </Card>
      <Center w="100%">
        <Flex gap={2} direction="row" align="center">
          <IconButton
            isDisabled={!canPreviousPage || getAllQueryResult.isLoading}
            aria-label="first page"
            icon={<Icon as={MdFirstPage} />}
            onClick={() => gotoPage(0)}
          />
          <IconButton
            isDisabled={!canPreviousPage || getAllQueryResult.isLoading}
            aria-label="previous page"
            icon={<Icon as={MdNavigateBefore} />}
            onClick={() => previousPage()}
          />
          <Text whiteSpace="nowrap">
            Page <strong>{pageIndex + 1}</strong> of{" "}
            <Skeleton
              as="span"
              display="inline"
              isLoaded={getAllQueryResult.isSuccess}
            >
              <strong>{pageCount}</strong>
            </Skeleton>
          </Text>
          <IconButton
            isDisabled={!canNextPage || getAllQueryResult.isLoading}
            aria-label="next page"
            icon={<Icon as={MdNavigateNext} />}
            onClick={() => nextPage()}
          />
          <IconButton
            isDisabled={!canNextPage || getAllQueryResult.isLoading}
            aria-label="last page"
            icon={<Icon as={MdLastPage} />}
            onClick={() => gotoPage(pageCount - 1)}
          />

          <Select
            onChange={(e) => {
              setPageSize(parseInt(e.target.value as string, 10));
            }}
            value={pageSize}
            isDisabled={getAllQueryResult.isLoading}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
          </Select>
        </Flex>
      </Center>
    </Flex>
  );
};

// /// HOOKS ///

// TODO move this somewhere else
// TODO this could be typed better
export function useAccount(address?: string, network?: DashboardSolanaNetwork) {
  const sdk = useSOLSDK();
  return useQuery(
    [network, address, "account", "contract-instance"],
    async () => {
      invariant(sdk, "sdk is required");
      invariant(address, "Address is required");
      const type = await sdk?.registry.getAccountType(address);
      switch (type) {
        case "nft-collection":
          return await sdk?.getNFTCollection(address);
        case "nft-drop":
          return await sdk?.getNFTDrop(address);
        case "token":
          return await sdk?.getToken(address);
        default:
          throw new Error("Unknown account type");
      }
    },
    {
      enabled: !!network && !!address && !!sdk,
    },
  );
}

export function useAccountMetadata(
  account: ReturnType<typeof useAccount>["data"],
) {
  return useQuery(
    [account?.publicKey.toBase58(), "account-metadata"],
    async () => {
      invariant(account, "Account is required");
      return await account.getMetadata();
    },
    {
      enabled: !!account,
    },
  );
}

export function useSolNFTs(account: NFTCollection | NFTDrop) {
  return useQuery(
    [account?.publicKey.toBase58(), "account-nfts"],
    async () => {
      invariant(account, "Account is required");
      return await account.getAll();
    },
    {
      enabled: !!account,
    },
  );
}

export function useSolMintNFT(account: RequiredParam<NFTCollection>) {
  return useMutationWithInvalidate(
    async (data: MintNFTParams) => {
      console.log({
        account,
        data,
      });
      invariant(account, "account not provided");
      invariant(typeof data.metadata === "object");
      // TODO consolidate NFT types between EVM/SOL
      return await account.mintTo(data.to, data.metadata as NFTMetadataInput);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        // eslint-disable-next-line line-comment-position
        return invalidate([]); // TODO (SOL) invalidation
      },
    },
  );
}

export function useSolLazyMintNFT(account: RequiredParam<NFTDrop>) {
  return useMutationWithInvalidate(
    async (data: { metadatas: NFTMetadataInput[] }) => {
      console.log({
        account,
        data,
      });
      invariant(account, "account not provided");
      invariant(data.metadatas.length > 0, "No NFTs to lazy mint");
      // TODO (SOL) consolidate NFT types between EVM/SOL
      return await account.lazyMint(data.metadatas);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        // eslint-disable-next-line line-comment-position
        return invalidate([]); // TODO (SOL) invalidation
      },
    },
  );
}
