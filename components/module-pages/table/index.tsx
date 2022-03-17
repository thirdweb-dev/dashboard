import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import {
  Center,
  CloseButton,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import React, { PropsWithChildren } from "react";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { Row, usePagination, useTable } from "react-table";
import { useExpandedRow } from "./expansions/useExpandedRow";
import { useTableColumns } from "./table-columns/useTableColumns";
import { TableProvider, useTableContext } from "./table-context";
import { TTableType } from "./types";

interface IRawModuleItemsTable<TModuleType extends EitherBaseModuleType> {
  items: TTableType<TModuleType>[];
  module?: TModuleType;
}

const RawModuleItemsTable = <TModuleType extends EitherBaseModuleType>({
  items,

  module,
}: PropsWithChildren<IRawModuleItemsTable<TModuleType>>) => {
  const columns = useTableColumns<TModuleType>(module);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: items,
      initialState: {
        pageSize: 50,
        pageIndex: 0,
      },
    },
    usePagination,
  );
  const { closeAllRows } = useTableContext();
  const { renderExpandedRow, title } = useExpandedRow(module);

  return (
    <Stack spacing={4}>
      <Card maxW="100%" as={Card} overflowX="auto">
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              // eslint-disable-next-line react/jsx-key
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row: Row<TTableType<TModuleType>>) => {
              prepareRow(row);
              const isLastRow = row.index === page.length - 1;
              const expandedRow = renderExpandedRow(row.id);
              return (
                <React.Fragment key={`row_${row.id}`}>
                  <Tr
                    shadow={expandedRow ? "md" : "none"}
                    bg={expandedRow ? "blue.50" : "white"}
                    transition="all 0.1s"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => (
                      // eslint-disable-next-line react/jsx-key
                      <Td
                        {...cell.getCellProps()}
                        borderBottom={isLastRow ? "none" : undefined}
                      >
                        {cell.render("Cell")}
                      </Td>
                    ))}
                  </Tr>
                  {expandedRow && (
                    <Tr
                      bg="white"
                      key={`${row.id}_expansion`}
                      position="relative"
                      shadow="sm"
                    >
                      <Td
                        colSpan={visibleColumns.length}
                        borderBottom="none"
                        borderBottomRadius="md"
                      >
                        <Stack w="100%">
                          <Flex justify="space-between" align="center">
                            <Heading size="label.xl" textTransform="uppercase">
                              {title}
                            </Heading>
                            <CloseButton onClick={closeAllRows} />
                          </Flex>
                          <Divider />
                          {expandedRow}
                        </Stack>
                      </Td>
                    </Tr>
                  )}
                </React.Fragment>
              );
            })}
          </Tbody>
        </Table>
      </Card>
      <Center w="100%">
        <HStack>
          <IconButton
            isDisabled={!canPreviousPage}
            aria-label="first page"
            icon={<Icon as={MdFirstPage} />}
            onClick={() => gotoPage(0)}
          />
          <IconButton
            isDisabled={!canPreviousPage}
            aria-label="previous page"
            icon={<Icon as={MdNavigateBefore} />}
            onClick={() => previousPage()}
          />
          <Text whiteSpace="nowrap">
            Page <strong>{pageIndex + 1}</strong> of{" "}
            <strong>{pageOptions.length}</strong>
          </Text>
          <IconButton
            isDisabled={!canNextPage}
            aria-label="next page"
            icon={<Icon as={MdNavigateNext} />}
            onClick={() => nextPage()}
          />
          <IconButton
            isDisabled={!canNextPage}
            aria-label="last page"
            icon={<Icon as={MdLastPage} />}
            onClick={() => gotoPage(pageCount - 1)}
          />

          <Select
            onChange={(e) => {
              setPageSize(parseInt(e.target.value as string, 10));
            }}
            value={pageSize}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
          </Select>
        </HStack>
      </Center>
    </Stack>
  );
};
interface IModuleItemsTableProps<TModuleType extends EitherBaseModuleType> {
  module?: TModuleType;
  items: TTableType<TModuleType>[];
}

export const ModuleItemsTable = <TModuleType extends EitherBaseModuleType>({
  module,
  items,
}: IModuleItemsTableProps<TModuleType>) => {
  return (
    <TableProvider>
      <RawModuleItemsTable module={module} items={items} />
    </TableProvider>
  );
};
