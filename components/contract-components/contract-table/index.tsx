import { ContractAbiCell } from "./cells/abi";
import { ContractBytecodeCell } from "./cells/bytecode";
import { ContractDeployActionCell } from "./cells/deploy-action";
import { ContractImageCell } from "./cells/image";
import { ContractNameCell } from "./cells/name";
import { ContractId } from "./types";
import { Checkbox, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Cell, Column, useTable } from "react-table";

interface DeployableContractTableProps {
  contractIds: ContractId[];
  selectable?: {
    selected: ContractId[];
    onChange: (contractIds: ContractId[]) => void;
  };
}

export const DeployableContractTable: React.VFC<
  DeployableContractTableProps
> = ({ contractIds, selectable }) => {
  const tableColumns = useMemo(() => {
    const cols: Column<{ contractId: ContractId }>[] = [
      {
        Header: "Icon",
        accessor: (row) => row.contractId,
        Cell: ContractImageCell,
      },
      {
        Header: "Name",
        accessor: (row) => row.contractId,
        Cell: ContractNameCell,
      },
      {
        Header: "ABI",
        accessor: (row) => row.contractId,
        Cell: ContractAbiCell,
      },
      {
        Header: "Bytecode",
        accessor: (row) => row.contractId,
        Cell: ContractBytecodeCell,
      },
      {
        id: "deploy-action",
        accessor: (row) => row.contractId,
        Cell: ContractDeployActionCell,
      },
    ];

    if (selectable) {
      const selectedContractIds = selectable.selected;
      return [
        {
          id: "selection",
          accessor: (row) => row.contractId,
          Header: () => {
            const isChecked = selectedContractIds.length === contractIds.length;
            const isIndeterminate =
              selectedContractIds.length > 0 &&
              selectedContractIds.length !== contractIds.length;
            return (
              <Checkbox
                isChecked={isChecked}
                isIndeterminate={isIndeterminate}
                onChange={() => {
                  // this makes no sense but it works
                  if (isChecked) {
                    selectable.onChange([]);
                  } else {
                    selectable.onChange(contractIds);
                  }
                }}
              />
            );
          },

          Cell: ({ value }: Cell<{ ContractId: ContractId }>) => {
            const isChecked = selectedContractIds.includes(value);
            return (
              <Checkbox
                onChange={() => {
                  if (isChecked) {
                    selectable.onChange(
                      selectedContractIds.filter((id) => id !== value),
                    );
                  } else {
                    selectable.onChange([...selectedContractIds, value]);
                  }
                }}
                isChecked={isChecked}
              />
            );
          },
        },
        ...cols,
      ] as Column<{ contractId: ContractId }>[];
    }

    return cols;
  }, [contractIds, selectable]);

  const tableInstance = useTable(
    {
      columns: tableColumns,
      data: contractIds.map((contractId) => ({ contractId })),
    },
    // useRowSelect,
  );
  return (
    <Table {...tableInstance.getTableProps()}>
      <Thead>
        {tableInstance.headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...tableInstance.getTableBodyProps()} position="relative">
        {tableInstance.rows.map((row) => {
          tableInstance.prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-key
            <Tr
              borderBottomWidth={1}
              _last={{ borderBottomWidth: 0 }}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => (
                // eslint-disable-next-line react/jsx-key
                <Td
                  {...cell.getCellProps()}
                  borderBottomWidth="inherit"
                  _last={{ textAlign: "end" }}
                >
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
