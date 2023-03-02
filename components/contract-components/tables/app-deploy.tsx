import { useContractMetadataWithAddress, useWeb3 } from "@3rdweb-sdk/react";
import {
  Box,
  Flex,
  Skeleton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ContractWithMetadata } from "@thirdweb-dev/sdk/evm";
import { ChainIcon } from "components/icons/ChainIcon";
import { useChainSlug } from "hooks/chains/chainSlug";
import { useConfiguredChains } from "hooks/chains/configureChains";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Column, Row, useTable } from "react-table";
import { Badge, ChakraNextLink, Text } from "tw-components";
import { AddressCopyButton } from "tw-components/AddressCopyButton";
import { ComponentWithChildren } from "types/component-with-children";
import { shortenIfAddress } from "utils/usedapp-external";

interface AppDeployTableProps {
  combinedList: ContractWithMetadata[];
  onSelect?: (row: ContractWithMetadata) => void;
  isFetching?: boolean;
}

export const AppDeployTable: ComponentWithChildren<AppDeployTableProps> = ({
  combinedList,
  children,
  isFetching,
  onSelect,
}) => {
  const { getNetworkMetadata } = useWeb3();
  const configuredChains = useConfiguredChains();

  const columns: Column<(typeof combinedList)[number]>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: (row) => row.metadata,
        Cell: (cell: any) => {
          return <AsyncContractNameCell cell={cell.row.original} />;
        },
      },
      {
        Header: "Network",
        accessor: (row) => row.chainId,
        Cell: (cell: any) => {
          const data = getNetworkMetadata(cell.row.original.chainId);
          return (
            <Flex align="center" gap={2}>
              <ChainIcon size={24} ipfsSrc={data.icon} sizes={data.iconSizes} />
              <Text size="label.md">{data.chainName}</Text>
              {data.isTestnet !== "unknown" && data.isTestnet && (
                <Badge colorScheme="gray" textTransform="capitalize">
                  Testnet
                </Badge>
              )}
            </Flex>
          );
        },
      },
      {
        Header: "Contract Address",
        accessor: (row) => row.address,
        Cell: (cell: any) => {
          return <AddressCopyButton address={cell.row.original.address} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [configuredChains],
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: "",
    }),
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: combinedList,
      defaultColumn,
    });

  return (
    <Box
      borderTopRadius="lg"
      p={0}
      overflowX="auto"
      position="relative"
      overflowY="auto"
      maxHeight="400px"
    >
      {isFetching && (
        <Spinner
          color="primary"
          size="xs"
          position="absolute"
          top={2}
          right={4}
        />
      )}
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <Th {...column.getHeaderProps()} border="none">
                  <Text as="label" size="label.sm" color="faded">
                    {column.render("Header")}
                  </Text>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <AppDeployTableRow
                row={row}
                key={row.original.address + row.original.chainId}
                onSelect={onSelect}
              />
            );
          })}
        </Tbody>
      </Table>
      {children}
    </Box>
  );
};

const AppDeployTableRow: React.FC<{
  row: Row<ContractWithMetadata>;
  onSelect?: (row: ContractWithMetadata) => void;
}> = ({ row, onSelect }) => {
  const router = useRouter();
  const uri = useSingleQueryParam("uri");
  const chainSlug = useChainSlug(row.original.chainId);
  return (
    <Tr
      {...row.getRowProps()}
      role="group"
      cursor="pointer"
      // this is a hack to get around the fact that safari does not handle position: relative on table rows
      style={{ cursor: "pointer" }}
      onClick={() => {
        // router.push(`/${chainSlug}/${row.original.address}/appuri?uri=${uri}`);
        if (onSelect) {
          onSelect(row.original);
        }
      }}
      // end hack
      borderBottomWidth={1}
      _last={{ borderBottomWidth: 0 }}
    >
      {row.cells.map((cell) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <Td
            borderBottomWidth="inherit"
            borderBottomColor="borderColor"
            {...cell.getCellProps()}
          >
            {cell.render("Cell")}
          </Td>
        );
      })}
    </Tr>
  );
};

interface AsyncContractNameCellProps {
  cell: ContractWithMetadata;
}

const AsyncContractNameCell: React.FC<AsyncContractNameCellProps> = ({
  cell,
}) => {
  const uri = useSingleQueryParam("uri");
  const chainSlug = useChainSlug(cell.chainId);
  const metadataQuery = useContractMetadataWithAddress(
    cell.address,
    cell.metadata,
    cell.chainId,
  );

  return (
    <Skeleton isLoaded={!metadataQuery.isLoading}>
      <Text
        color="blue.500"
        _dark={{ color: "blue.400" }}
        size="label.md"
        _groupHover={{ textDecor: "underline" }}
      >
        {metadataQuery.data?.name || shortenIfAddress(cell.address)}
      </Text>
    </Skeleton>
  );
};
