import { AuctionListing, DirectListing, ListingMetadata } from "@3rdweb/sdk";
import { Code, Image, Text } from "@chakra-ui/react";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import React from "react";
import { Cell, Column } from "react-table";
import { MarketplaceActionsCell } from "./actions/MarketplaceActionsCell";

export function generateMarketplaceTableColumns() {
  return [
    {
      Header: "ID",
      accessor: (row) => row.id,
    },
    {
      Header: "Image",
      accessor: (row) =>
        row.asset?.image?.replace(
          "ipfs://",
          "https://cloudflare-ipfs.com/ipfs/",
        ),
      Cell: ({ cell: { value } }: { cell: { value?: string } }) =>
        value ? (
          <Image
            flexShrink={0}
            boxSize={24}
            objectFit="contain"
            src={value}
            alt=""
          />
        ) : null,
    },
    { Header: "Name", accessor: (row) => row.asset?.name },
    {
      Header: "Description",
      accessor: (row) => row.asset?.description,
    },
    {
      Header: "Properties",
      accessor: (row) => row.asset?.properties,
      Cell: ({ cell }: { cell: any }) => (
        <Code whiteSpace="pre">{JSON.stringify(cell.value, null, 2)}</Code>
      ),
    },
    {
      Header: "Seller",
      accessor: (row) => row.sellerAddress,
      Cell: ({ cell }: { cell: Cell<ListingMetadata, string> }) => (
        <AddressCopyButton variant="outline" address={cell.value} />
      ),
    },
    {
      Header: "Price",
      accessor: (row) => row.buyoutCurrencyValuePerToken,
      Cell: ({ cell }: { cell: Cell<ListingMetadata, any> }) => {
        return (
          <Text size="label.md" whiteSpace="nowrap">
            {cell.value.displayValue} {cell.value.symbol}
          </Text>
        );
      },
    },
    {
      Header: "Actions",
      id: "actions",
      Cell: MarketplaceActionsCell || null,
    },
  ] as Column<DirectListing | AuctionListing>[];
}
