import { BundleMetadata, CollectionMetadata } from "@3rdweb/sdk";
import { Code, Image, Text } from "@chakra-ui/react";
import { RenderMedia } from "components/shared/RenderMedia";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import { BigNumber } from "ethers";
import React from "react";
import { Cell, Column } from "react-table";
import { ActionsCell } from "./actions/ActionsCell";

export function generateCollectionableColumns() {
  return [
    {
      Header: "ID",
      accessor: (row) => row.metadata.id,
    },
    {
      Header: "Image",
      accessor: (row) => row.metadata.image,
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
    { Header: "Name", accessor: (row) => row.metadata.name },
    {
      Header: "Description",
      accessor: (row) => row.metadata.description,
    },
    {
      Header: "Properties",
      accessor: (row) => row.metadata.properties,
      Cell: ({ cell }: { cell: any }) => (
        <Code whiteSpace="pre">{JSON.stringify(cell.value, null, 2)}</Code>
      ),
    },
    {
      Header: "Creator",
      accessor: (row) => row.creator,
      Cell: ({ cell }: { cell: Cell<CollectionMetadata, string> }) => (
        <AddressCopyButton variant="outline" address={cell.value} />
      ),
    },
    {
      Header: "You own",
      accessor: (row) => row.ownedByAddress,
      Cell: ({ cell }: { cell: Cell<CollectionMetadata, number> }) => (
        <Text fontWeight={600}>{BigNumber.from(cell.value).toString()}</Text>
      ),
    },
    {
      Header: "Media File",
      accessor: (row) => ({
        animationUrl: (row.metadata as any).animation_url,
        externalUrl: (row.metadata as any).external_url,
      }),
      Cell: ({ cell }: { cell: any }) => <RenderMedia {...cell.value} />,
    },
    {
      Header: "Actions",
      id: "actions",
      Cell: ActionsCell || null,
    },
  ] as Column<BundleMetadata>[];
}
