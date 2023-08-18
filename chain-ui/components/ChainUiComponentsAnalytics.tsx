import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { colors } from "theme/colors";
import { Text } from "tw-components";

interface IChainUiComponentsAnalyticsTable {
  data: Record<string, string | number>[];
}
export const ChainUiComponentsAnalyticsTable: React.FC<
  IChainUiComponentsAnalyticsTable
> = ({ data }) => {
  const headers = Object.keys(data[0] ?? {});

  return (
    <Box maxH="400px" overflowY="scroll">
      <Table variant="simple">
        <Thead
          bg={colors.backgroundDark}
          color="white"
          position="sticky"
          top="0"
        >
          <Tr>
            {headers.map((header, index) => (
              <Th key={index} p="6">
                <Text letterSpacing="1px" opacity={0.8}>
                  {header}
                </Text>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody bg="rgba(0,0,0,0)">
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {Object.keys(row).map((header, index) => {
                return (
                  <Td key={index} py="3" width="50%">
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
