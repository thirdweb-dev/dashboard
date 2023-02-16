import { MediaCell } from "../../../../components/contract-pages/table/table-columns/cells/media-cell";
import { ListingCards } from "../../listings/components/listings-cards";
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useActiveListings, useContract } from "@thirdweb-dev/react";
import { AuctionListing, DirectListing } from "@thirdweb-dev/sdk/evm";
import { useTabHref } from "contract-ui/utils";
import React, { useMemo } from "react";
import { Cell, CellProps, Column, useTable } from "react-table";
import { Card, Heading, Text, TrackedLinkProps } from "tw-components";
import { AddressCopyButton } from "tw-components/AddressCopyButton";

interface MarketplaceTableProps {
  contractAddress: string;
  trackingCategory: TrackedLinkProps["category"];
}

type Listing = AuctionListing | DirectListing;

export const MarketplaceTable: React.FC<MarketplaceTableProps> = ({
  contractAddress,
  trackingCategory,
}) => {
  const contract = useContract(contractAddress, "marketplace");
  const listingsHref = useTabHref("listings");
  const listingsQuery = useActiveListings(contract?.contract);
  const listingsToShow = useMemo(
    () => listingsQuery.data?.slice(0, 5) || [],
    [listingsQuery.data],
  );

  const tableColumns: Column<Listing>[] = [
    {
      Header: "ID",
      accessor: (row) => row.id,
      Cell: (cell: CellProps<Listing, string>) => (
        <Text size="body.md" fontFamily="mono">
          {cell.value}
        </Text>
      ),
    },
    {
      Header: "Media",
      accessor: (row) => row.asset,
      Cell: (cell: CellProps<Listing, Listing["asset"]>) => (
        <MediaCell cell={cell} />
      ),
    },
    {
      Header: "Name",
      accessor: (row) => row.asset.name,
      Cell: (cell: CellProps<Listing, string>) => (
        <Text size="label.md">{cell.value}</Text>
      ),
    },
    {
      Header: "Seller",
      accessor: (row) => row.buyoutPrice,
      Cell: (cell: CellProps<Listing, string>) => (
        <AddressCopyButton variant="outline" address={cell.value} />
      ),
    },
    {
      Header: "Price",
      accessor: (row) => row.buyoutCurrencyValuePerToken,
      Cell: ({ cell }: { cell: Cell<Listing, any> }) => {
        return (
          <Text size="label.md" whiteSpace="nowrap">
            {cell.value.displayValue} {cell.value.symbol}
          </Text>
        );
      },
    },
    {
      Header: "Type",
      accessor: (row) => (row.type === 0 ? "Direct Listing" : "Auction"),
    },
  ];

  const tableInstance = useTable({
    columns: tableColumns,
    data: listingsToShow,
  });

  return (
    <Flex gap={6} flexDirection="column">
      <Flex align="center" justify="space-between" w="full">
        <Heading flexShrink={0} size="title.sm">
          Listings
        </Heading>
      </Flex>
      <ListingCards contract={contract?.contract} />
      {contract && (
        <Card p={0} overflow="hidden">
          <Table {...tableInstance.getTableProps()}>
            <Thead>
              {tableInstance.headerGroups.map((headerGroup) => (
                // eslint-disable-next-line react/jsx-key
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    // eslint-disable-next-line react/jsx-key
                    <Th
                      {...column.getHeaderProps()}
                      py={5}
                      borderBottomColor="borderColor"
                    >
                      <Text as="label" size="label.md">
                        {column.render("Header")}
                      </Text>
                    </Th>
                  ))}
                  <Th borderBottomColor="borderColor" />
                </Tr>
              ))}
            </Thead>
            <Tbody {...tableInstance.getTableBodyProps()} position="relative">
              {tableInstance.rows.map((row) => (
                // eslint-disable-next-line react/jsx-key
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      key={cell.getCellProps().key}
                      borderBottomWidth="inherit"
                      borderBottomColor="borderColor"
                      _last={{ textAlign: "end" }}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Card>
      )}
    </Flex>
  );
};
