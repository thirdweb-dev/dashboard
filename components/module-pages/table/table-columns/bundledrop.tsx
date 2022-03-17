import { BundleDropMetadata } from "@3rdweb/sdk";
import { Code, Image } from "@chakra-ui/react";
import { RenderMedia } from "components/shared/RenderMedia";
import { BigNumber } from "ethers";
import React from "react";
import { Cell, Column } from "react-table";
import { AdminMintConditionCell } from "./actions/AdminMintConditionCell";

export function generateBundleDropTableColumns() {
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
      Header: "Media File",
      accessor: (row) => ({
        animationUrl: (row.metadata as any).animation_url,
        externalUrl: (row.metadata as any).external_url,
      }),
      Cell: ({ cell }: { cell: any }) => <RenderMedia {...cell.value} />,
    },
    {
      Header: "Claimed Supply",
      accessor: (row) => row.supply,
      Cell: ({ cell }: { cell: Cell<BundleDropMetadata, string> }) =>
        BigNumber.from(cell.value || 0).toString(),
    },
    {
      Header: "Actions",
      id: "actions",
      Cell: AdminMintConditionCell || null,
    },
  ] as Column<BundleDropMetadata>[];
}
