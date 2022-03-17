import { PackMetadata } from "@3rdweb/sdk";
import { Image } from "@chakra-ui/react";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import React from "react";
import { Cell, Column } from "react-table";
import { ActionsCell } from "./actions/ActionsCell";

export function generatePackColumns() {
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
    {
      Header: "Name",
      accessor: (row) => row.metadata.name,
    },
    {
      Header: "Description",
      accessor: (row) => row.metadata.description,
    },
    {
      Header: "Supply",
      accessor: (row) => {
        try {
          return row.currentSupply.toNumber();
        } catch {
          return "N/A";
        }
      },
    },
    {
      Header: "Created By",
      accessor: (row) => row.creator,
      Cell: ({ cell }: { cell: Cell<PackMetadata, string> }) => (
        <AddressCopyButton variant="outline" address={cell.value} />
      ),
    },
    {
      Header: "Actions",
      id: "actions",
      Cell: ActionsCell,
    },
  ] as Column<PackMetadata>[];
}
