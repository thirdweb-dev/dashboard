import { NFTMetadataOwner } from "@3rdweb/sdk";
import { Code, Image } from "@chakra-ui/react";
import { RenderMedia } from "components/shared/RenderMedia";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import React from "react";
import { Cell, Column } from "react-table";
import { ActionsCell } from "./actions/ActionsCell";

export function generateNFTableColumns() {
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
      Header: "Owned By",
      accessor: (row) => row.owner,
      Cell: ({ cell }: { cell: Cell<NFTMetadataOwner, string> }) => (
        <AddressCopyButton variant="outline" address={cell.value} />
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
  ] as Column<NFTMetadataOwner>[];
}
