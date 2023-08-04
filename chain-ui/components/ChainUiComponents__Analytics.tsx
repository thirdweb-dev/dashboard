import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

interface IChainUiComponents__AnalyticsTable {
  data: Record<string, string | number>[];
}
export const ChainUiComponents__AnalyticsTable: React.FC<
  IChainUiComponents__AnalyticsTable
> = ({ data }) => {
  const headers = Object.keys(data[0] ?? {}).map((head) =>
    head
      .split("_")
      .map((v) => v[0].toUpperCase() + v.slice(1).toLowerCase())
      .join(" "),
  );

  return (
    <Box maxH="400px" overflowY="scroll">
      <Table variant="simple">
        <Thead bg="gray.800" color="white" position="sticky" top="0">
          <Tr>
            {headers.map((header, index) => (
              <Th key={index} p="6" fontSize="xl">
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {Object.keys(row).map((header, index) => {
                return (
                  <Td key={index} py="3">
                    {row[header]}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
