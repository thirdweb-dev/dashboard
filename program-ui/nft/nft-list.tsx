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
} from "@chakra-ui/react";
import { useNFTs } from "@thirdweb-dev/react/solana";
import { NFTMetadataInput } from "@thirdweb-dev/sdk";
import type { NFTCollection, NFTDrop } from "@thirdweb-dev/sdk/solana";
import { MediaCell } from "components/contract-pages/table/table-columns/cells/media-cell";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { Column, usePagination, useTable } from "react-table";
import { AddressCopyButton, Card, Heading, Text } from "tw-components";

export const NFTList: React.FC<{
  program: NFTCollection | NFTDrop;
}> = ({ program }) => {
  const tableColumns = useMemo(() => {
    const cols: Column<NFTMetadataInput>[] = [
      {
        Header: "Address",
        accessor: (row) =>
          row.id ? (
            <AddressCopyButton size="xs" address={row.id?.toString() || ""} />
          ) : (
            "-"
          ),
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

  const getAllQueryResult = useNFTs(program);
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
