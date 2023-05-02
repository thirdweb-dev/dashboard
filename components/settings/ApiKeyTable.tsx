import { ApiKeyInfo, useRevokeApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useTxNotifications } from "hooks/useTxNotifications";
import React, { memo, useMemo } from "react";
import { FiMoreVertical, FiX } from "react-icons/fi";
import { Column, Row, useTable } from "react-table";
import { Heading, MenuItem, Text, TrackedIconButton } from "tw-components";
import { AddressCopyButton } from "tw-components/AddressCopyButton";
import { ComponentWithChildren } from "types/component-with-children";

interface ApiKeyTableProps {
  keys: ApiKeyInfo[];
  isLoading: boolean;
}

export const ApiKeyTable: ComponentWithChildren<ApiKeyTableProps> = ({
  keys,
  isLoading,
  children,
}) => {
  const columns: Column<ApiKeyInfo>[] = useMemo(
    () => [
      {
        Header: "API Key",
        accessor: (row) => row.key,
        Cell: (cell: any) => {
          return (
            <AddressCopyButton
              size="xs"
              address={cell.row.original.key}
              shortenAddress={false}
            />
          );
        },
      },
      {
        id: "actions",
        Cell: (cell: any) => {
          return (
            <Menu isLazy>
              <MenuButton
                as={TrackedIconButton}
                variant="gost"
                icon={<FiMoreVertical />}
                onClick={(e) => e.stopPropagation()}
              />
              <MenuList
                onClick={(e) => e.stopPropagation()}
                borderWidth={1}
                borderColor="borderColor"
                borderRadius="lg"
                overflow="hidden"
              >
                <RevokeApiKeyButton apiKey={cell.row.original.key} />
              </MenuList>
            </Menu>
          );
        },
      },
    ],
    [],
  );

  const { rows, prepareRow, getTableProps, getTableBodyProps, headerGroups } =
    useTable({
      columns,
      data: keys,
    });

  return (
    <Box
      borderTopRadius="lg"
      p={0}
      overflowX="auto"
      position="relative"
      overflowY="hidden"
    >
      {isLoading && (
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
            return <ApiKeyTableRow row={row} key={row.original.key} />;
          })}
        </Tbody>
      </Table>
      {children}
    </Box>
  );
};

const ApiKeyTableRow = memo(({ row }: { row: Row<ApiKeyInfo> }) => {
  return (
    <Tr
      {...row.getRowProps()}
      role="group"
      // this is a hack to get around the fact that safari does not handle position: relative on table rows
      style={{ cursor: "pointer" }}
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
});

ApiKeyTableRow.displayName = "ApiKeyTableRow";

interface RevokeApiKeyButtonProps {
  apiKey: string;
}

const RevokeApiKeyButton: React.FC<RevokeApiKeyButtonProps> = ({
  apiKey,
}: {
  apiKey: string;
}) => {
  const mutation = useRevokeApiKey();
  const { onSuccess, onError } = useTxNotifications(
    "API key revoked",
    "Failed to revoke API key",
  );

  return (
    <MenuItem
      borderWidth={0}
      onClick={(e) => {
        e.stopPropagation();
        mutation.mutate(apiKey, {
          onSuccess: () => {
            onSuccess();
          },
          onError: (err) => {
            onError(err);
          },
        });
      }}
      isDisabled={mutation.isLoading}
      closeOnSelect={false}
    >
      <Flex align="center" gap={2} w="full">
        {mutation.isLoading ? (
          <Spinner size="sm" />
        ) : (
          <Icon as={FiX} color="red.500" />
        )}
        <Heading as="span" size="label.md">
          Revoke key
        </Heading>
      </Flex>
    </MenuItem>
  );
};
